function ParallaxScroll(target, {} = {}) {
    this.targets = document.querySelectorAll(target)
    this.setEvents();
    this.init();
}

ParallaxScroll.prototype = {
    constructor: ParallaxScroll,
    init() {
        this.targets.forEach((target) => {
            const inView = target.getBoundingClientRect().top - window.innerHeight;
            if (inView > 0) return;
            const speed = target.dataset.parallaxSpeed || 0.1;
            const horizontal = target.dataset.parallaxHorizontal;
            const vertical = target.dataset.parallaxVertical;
            let posX = 0;
            let posY = 0;
            const top = (target.getBoundingClientRect().top - 400) * speed;
            if (vertical || !horizontal) posY = top;
            if (horizontal) posX = top;

            target.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
        });
    },
    setEvents() {
        window.addEventListener("scroll", ()=>this.init());
    },
};
