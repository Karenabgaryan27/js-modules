const Lock = (function () {
    const handleLock = (lock) => {
        // const scrollbarWidth = window.innerWidth - document.body.offsetWidth + 'px'
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth + "px";
        document.body.style.overflow = lock ? "hidden" : "";
        document.body.style.paddingRight = lock ? scrollbarWidth : "";

        // const navbar = document.querySelector(".navbar");  // alternativly just set navbar 100vw
        // if (navbar) navbar.style.borderRight = lock ? `${scrollbarWidth} solid transparent` : ""; // alternativly just set navbar 100vw
    };

    const lockScroll = () => handleLock(true);
    const unlockScroll = () => handleLock(false);

    return { lockScroll, unlockScroll };
})();