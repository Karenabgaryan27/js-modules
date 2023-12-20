const CounterOnScroll = (function () {
    const counterAnim = (start = 0, end, duration = 1000, progress) => {
        const count = document.querySelector(progress.dataset.target);

        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            if (count) count.innerText = current;
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    };

    const init = (progress) => {
            const end = progress.dataset.percentage;
            const duration = end * 10;
            counterAnim(0, end, duration, progress);
    };
    return { init };
})()


function CounterOnScrollCallback (target) {
    CounterOnScroll.init(target)
}