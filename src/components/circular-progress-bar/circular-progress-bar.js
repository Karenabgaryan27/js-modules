// // var percentageComplete = 0.8;
// // var strokeDashOffsetValue = 100 - (percentageComplete * 100);
// // var progressBar = document.querySelector(".js-progress-bar");
// // // progressBar.css("stroke-dashoffset", strokeDashOffsetValue);
// // progressBar.style.strokeDashoffset = strokeDashOffsetValue

// (function () {
//     function CircularProgressBar({ progresses }) {
//         this.progresses = progresses;
//     }
//     CircularProgressBar.prototype = {
//         constructor: CircularProgressBar,
//         // counter(qSelector, start, end, duration,progressBar) {
//         //     let target = document.querySelector(qSelector);
//         //     let current = start,
//         //         range = end - start,
//         //         increment = end > start ? 1 : -1,
//         //         step = Math.abs(Math.floor(duration / range)),
//         //         timer = setInterval(() => {
//         //             current += increment;
//         //             target.textContent = current + "%";
//         //             progressBar.style.strokeDashoffset = 100 - current;
//         //             if (current == end) {
//         //                 clearInterval(timer);
//         //             }
//         //         }, step);
//         // },
//         counterAnim(qSelector, start = 0, end, duration = 1000, progress) {
//             const progressBar = progress.querySelector(".circular-progress-bar");
//             const count = document.querySelector(qSelector);

//             let startTimestamp = null;
//             const step = (timestamp) => {
//                 if (!startTimestamp) startTimestamp = timestamp;
//                 const progress = Math.min((timestamp - startTimestamp) / duration, 1);
//                 const current = Math.floor(progress * (end - start) + start);
//                 if (count) count.innerText = current + "%";
//                 if (progressBar) progressBar.style.strokeDashoffset = 100 - current;
//                 if (progress < 1) window.requestAnimationFrame(step);
//             };
//             window.requestAnimationFrame(step);
//         },
//         init() {
//             this.progresses.forEach((progress) => {

//                 const percentageComplete = progress.dataset.percentage;
//                 // const strokeDashOffsetValue = 100 - percentageComplete * 100;
//                 // progressBar.style.strokeDashoffset = strokeDashOffsetValue;

//                 const qSelector = progress.dataset.target;
//                 const duration = percentageComplete * 1000;
//                 const end = percentageComplete * 100;

//                 // this.counter(qSelector, 0, end, 1000,progressBar);
//                 this.counterAnim(qSelector, 0, end, duration, progress);
//             });
//         },
//     };

//     const state = {
//         progresses: document.querySelectorAll(".circular-progress"),
//     };

//     const circularProgressBar = new CircularProgressBar(state);
//     setTimeout(() => {
//         circularProgressBar.init();
//     }, 1000);
// })();

// var percentageComplete = 0.8;
// var strokeDashOffsetValue = 100 - (percentageComplete * 100);
// var progressBar = document.querySelector(".js-progress-bar");
// // progressBar.css("stroke-dashoffset", strokeDashOffsetValue);
// progressBar.style.strokeDashoffset = strokeDashOffsetValue

(function () {
    function CircularProgressBar({ progresses }) {
        this.progresses = progresses;
    }
    CircularProgressBar.prototype = {
        constructor: CircularProgressBar,

        counterAnim(qSelector, start = 0, end, duration = 1000, element) {
            const progressBar = element.querySelector(".circular-progress-bar");
            const count = document.querySelector(qSelector);

            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const current = Math.floor(progress * (end - start) + start);
                if (count) count.innerText = current + "%";
                if (progressBar) progressBar.style.strokeDashoffset = 100 - current;
                if (progress < 1) window.requestAnimationFrame(step);
            };
            window.requestAnimationFrame(step);
        },
        init() {
            this.progresses.forEach((element) => {
                const progress = element.dataset.progress;

                const qSelector = element.dataset.target;
                const duration = (progress / 100) * 1000;
                const end = progress;

                this.counterAnim(qSelector, 0, end, duration, element);
            });
        },
    };

    const state = {
        progresses: document.querySelectorAll(".circular-progress"),
    };

    const circularProgressBar = new CircularProgressBar(state);
    setTimeout(() => {
        circularProgressBar.init();
    }, 1000);
})();
