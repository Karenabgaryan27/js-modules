(function () {
    function Bar({ progresses }) {
        this.progresses = progresses;
        // this.toggle = null;
        this.progress = null;
        this.progressBar = null;
        this.count = null;
        this.percentage = null;
    }

    Bar.prototype = {
        constructor: Bar,
        process(progressBar,percentage) {
            const type = progressBar.dataset.type;
            if (type !== "multicolor") return;
            progressBar.classList.remove("bg-secondary", "bg-danger", "bg-warning", "bg-success");
            let color = "bg-secondary";
            if (percentage >= 90) {
                color = "bg-success";
            } else if (percentage >= 50) {
                color = "bg-warning";
            } else if (percentage >= 20) {
                color = "bg-danger";
            }

            progressBar.classList.add(color);
        },
        increase() {
            this.percentage += 10;
            if (this.percentage > 100) return;
            this.count.innerText = this.percentage + "%";
            this.progressBar.style.width = this.percentage + "%";
            
        },
        decrease() {
            this.percentage -= 10;
            if (this.percentage < 0) return;
            this.count.innerText = this.percentage + "%";
            this.progressBar.style.width = this.percentage + "%";
            
        },

        counterAnim(start = 0, end, duration = 1000, progress) {
            const progressBar = progress.querySelector(".progress-bar");
            const count = progress.querySelector(".count");

            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const current = Math.floor(progress * (end - start) + start);
                if (count) count.innerText = current + "%";
                if (progressBar) {
                    progressBar.style.width = current + "%";
                    this.process(progressBar,current);
                }
                if (progress < 1) window.requestAnimationFrame(step);
            };
            window.requestAnimationFrame(step);
        },

        init() {
            this.progresses.forEach((progress) => {
                const end = progress.dataset.percentage;
                const duration = end * 10;
                this.counterAnim(0, end, duration, progress);
            });

        },
        // setProperties() {
        //     this.progress = document.querySelector(this.toggle.dataset.target);
        //     this.progressBar = this.progress.querySelector(".progress-bar");
        //     this.count = this.progress.querySelector(".count");
        //     this.percentage = parseInt(this.count.innerText);
        // },
        // setEvents() {
        //     document.addEventListener("click", (e) => {
        //         this.toggle = e.target.closest("[data-toggle=progress]");
        //         if (!this.toggle) return;
        //         this.setProperties();
        //         this[this.toggle.dataset.process]();
        //         this.process(this.progressBar,this.percentage);
        //         this.progressBar.style.transition = 'width .3s ease'

        //         // this.percentage = this.percentage + (this.toggle.dataset.process === "increase" ? 10 : -10);
        //         // if(this.percentage < 0 || this.percentage > 100) return
        //         // this.count.innerText = this.percentage + "%";
        //         // this.progressBar.style.width = this.percentage + "%";
        //     });
        // },
    };

    const state = {
        progresses: document.querySelectorAll(".progress"),
    };

    const bar = new Bar(state);
    // bar.setEvents();
    setTimeout(()=>{

        bar.init()
    },1000)
})();
