const glareStyle = {
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    pointerEvents: "none",
    borderRadius: "inherit",
};

const glareInnerStyle = (width) => {
    return {
        position: "absolute",
        top: "50%",
        left: "50%",
        pointerEvents: "none",
        backgroundImage: "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%)",
        transform: "rotate(180deg) translate(-50%, -50%)",
        transformOrigin: "0% 0%",
        opacity: "0",
        width: width * 2 + "px", // "814px",
        height: width * 2 + "px" // "814px",
    };
};

function ParallaxEffect(
    target,
    {
        axisDepth = 10,
        reverse = false,
        glare = false,
        maxGlare = 1,
        imageReverse = false,
        speed = 100,
        imageSpeed = 600,
        imageRange = 1,
    } = {}
) {
    this.target = target
    this.axisDepth = axisDepth;
    this.reverse = reverse;
    this.glare = glare;
    this.maxGlare = maxGlare;
    this.imageReverse = imageReverse;
    this.speed = speed;
    this.imageSpeed = imageSpeed;
    this.imageRange = imageRange;
    this.reset();
    this.setEvents();
}

ParallaxEffect.prototype = {
    constructor: ParallaxEffect,
    reset() {
        this.glareElement?.remove();
        this.glareElement = null;
        this.glareInnerElement = null;
        this.angle = 0;
        this.images = null;
        this.element = null;
        this.halfHeight = 0;
        this.halfWidth = 0;
        this.width = 0;
        this.height = 0;
    },

    setProperties(e) {
        this.element = e.currentTarget.querySelector("[data-parallax-inner]") || e.currentTarget;
        this.images = e.currentTarget.querySelectorAll("[data-parallax-image]");
        this.halfHeight = this.element.offsetHeight / 2;
        this.halfWidth = this.element.offsetWidth / 2;
        this.width = this.element.offsetWidth;
        this.height = this.element.offsetHeight;
    },
    createGlare () {
        this.glareElement = document.createElement("div");
        this.glareElement.className = "glare";
        Object.assign(this.glareElement.style, glareStyle);

        this.glareInnerElement = document.createElement("div");
        Object.assign(this.glareInnerElement.style, glareInnerStyle(this.element.offsetWidth));
        this.glareInnerElement.className = "glare-inner";

        this.element.appendChild(this.glareElement);
        this.glareElement.appendChild(this.glareInnerElement);
    },
    start(e) {
        this.setProperties(e);
        if (this.glare || this.element.dataset.parallaxGlare) this.createGlare();
        this.element.style.transition = `transform ${this.speed}ms ease-out`;
        if (this.images) {
            this.images.forEach((image) => {
                const speed = image.dataset.parallaxSpeed || this.imageSpeed;
                image.style.transition = `transform ${speed}ms cubic-bezier(0.23, 1, 0.32, 1)`;
            });
        }
    },
    end() {
        this.element.style.transform = "";
        this.element.style.transition = "transform .6s ease";
        if (this.images) {
            this.images.forEach((image) => {
                image.style.transition = "transform 1s cubic-bezier(0.445, 0.05, 0.55, 0.95)";
                image.style.transform = "";
            });
        }
        this.reset();
    },
    move(e) {
        const top = e.currentTarget.getBoundingClientRect().top;
        const left = e.currentTarget.getBoundingClientRect().left;
        const y = e.clientY - top;
        const x = e.clientX - left;
        const posX = (x - this.halfWidth) / this.axisDepth;
        const posY = (y - this.halfHeight) / this.axisDepth;
        const style = this.reverse || this.element.dataset.parallaxReverse
            ? `perspective(600px) rotateX(${-posY}deg)  rotateY(${posX}deg)`
            : `perspective(600px) rotateX(${posY}deg)  rotateY(${-posX}deg)`;
        this.element.style.transform = style;
        // requestAnimationFrame(() => (cardItem.current.style.transform = `rotateX(${posY}deg)  rotateY(${posX}deg)`));

        if (this.images && this.imageReverse)
            this.images.forEach((image) => {
                const range = image.dataset.parallaxRange || this.imageRange;
                image.style.transform = `translateX(${posX * range}px) translateY(${posY * range}px)`;
            });
        if (this.images && !this.imageReverse)
            this.images.forEach((image) => {
                const range = image.dataset.parallaxRange || this.imageRange;
                image.style.transform = `translateX(${-posX * range}px) translateY(${-posY * range}px)`;
            });

        if (!this.glareElement) return;
        this.angle =
            Math.atan2(e.clientX - (left + this.width / 2), -(e.clientY - (top + this.height / 2))) * (180 / Math.PI);
        this.glareInnerElement.style.transform = `rotate(${this.angle}deg) translate(-50%, -50%)`;
        this.glareInnerElement.style.opacity = `${
            Math.min(Math.max((e.clientY - top) / this.height, 0), 1) * this.maxGlare
        }`;
    },

    setEvents() {
        // document.addEventListener("mouseover", (e)=>{
        //     const element = e.target.closest(this.target)
        //     if(element) this.init(element)
        // });
        const elements = document.querySelectorAll(this.target);
        elements.forEach((element) => {
            element.addEventListener("mouseenter", (e) => this.start(e));
            element.addEventListener("mouseleave", (e) => this.end(e));
            element.addEventListener("mousemove", (e) => this.move(e));
        });
    },
};
