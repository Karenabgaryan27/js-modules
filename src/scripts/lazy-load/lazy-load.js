const LazyLoad = (function () {
    let observer = null;
    let blocks = null;
    let options = {
        root: null,
        threshold: 0,
        rootMargin: window.innerWidth > 768 ? "-300px" : "0px",
    };

    const loadImages = (target) => {
        // target.querySelectorAll("img[data-src]").forEach((img) => (img.src = img.dataset.src));
        target.querySelectorAll("img[data-src]").forEach((img) => {
            const hiddenImage = document.createElement("img");
            hiddenImage.src = img.dataset.src;
            hiddenImage.addEventListener("load", () => (img.src = img.dataset.src), { once: true });
        });
    };

    const showLazyElements = (target) => {
        loadImages(target);
        if (target.matches("[data-lazy]")) target.classList.add("lazy-animate");

        target.querySelectorAll("[data-lazy]")?.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add("lazy-animate");
            }, element.dataset.lazyDelay || index * 200);
        });
    };
    const hideLazyElements = (target) => {
        const isTargetUnderScreen = window.innerHeight - target.getBoundingClientRect().top > 300;
        if (isTargetUnderScreen) return;
        if (target.matches("[data-lazy]")) target.classList.remove("lazy-animate");
        target.querySelectorAll("[data-lazy]")?.forEach((element, index) => {
            setTimeout(() => {
                element.classList.remove("lazy-animate");
            }, element.dataset.lazyDelay || index * 200);
        });
    };
    const handleCallback = (target) => {
        const callback = target.dataset.callback;
        if (callback) window[callback](target);
    };
    const createObserver = () => {
        observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    // hideLazyElements(entry.target); // or method under
                } else {
                    handleCallback(entry.target);
                    showLazyElements(entry.target);
                    observer.unobserve(entry.target); // or method above
                }
            });
        }, options);

        blocks = document.querySelectorAll("[data-lazy-block]");
        blocks.forEach((block) => observer.observe(block));
    };

    createObserver();

    return { createObserver };
})();
