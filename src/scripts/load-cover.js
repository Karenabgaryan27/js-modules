const LoadCover = (function () {
    const blocks = document.querySelectorAll("[data-cover-src]");
    if(!blocks || !blocks.length) return
    blocks.forEach((block) => {
        const cover = new Image();
        cover.src = block.dataset.coverSrc;
        cover.addEventListener(
            "load",
            () => (block.style.backgroundImage = `url(${cover.src})`)
        );
    });
})();