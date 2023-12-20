(function () {
    function Tabs({ allTabs }) {
        this.allTabs = allTabs;
        this.id = "";
        this.isTimeout = false;
        this.paneTransition = 300 + 50;
    }

    Tabs.prototype = {
        constructor: Tabs,

        uuidv4() {
            return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
                (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
            );
        },
        setActiveTab(toggle) {
            if (this.isTimeout) return;
            this.isTimeout = true;
            setTimeout(() => (this.isTimeout = false), this.paneTransition);

            const wrapper = toggle.closest(".tabs");
            
            const previousToggle = wrapper.querySelector(`.nav-link.active`);
            if (previousToggle) previousToggle.classList.remove("active");
            toggle.classList.add("active");
            
            const indicator = wrapper.querySelector(".indicator");
            if (indicator) {
                indicator.style.width = toggle.offsetWidth + "px";
                indicator.style.left = toggle.offsetLeft + "px";
            }
            
            const previousPane = wrapper.querySelector(`.tab-pane.active`);
            const pane = wrapper.querySelector(toggle.dataset.target);
            if (previousPane) {
                previousPane.classList.remove("show");
                previousPane.addEventListener(
                    "transitionend",
                    () => {
                        previousPane.classList.remove("active");
                        if (!pane) return;
                        pane.classList.add("active");
                        setTimeout(() => pane.classList.add("show"), 0);
                    },
                    { once: true }
                );
            } else {
                pane.classList.add("active");
                setTimeout(() => pane.classList.add("show"), 0);
            }
        },

        // addUinqueIds() {
        //     if (!this.allTabs || !this.allTabs.length) return;
        //     this.allTabs.forEach((tabs) => {
        //         this.id = this.uuidv4();
        //         const itemsWithId = tabs.querySelectorAll("[id]");
        //         if (!itemsWithId || !itemsWithId.length) return;
        //         itemsWithId.forEach((itemWithId) => {
        //             itemWithId.id = itemWithId.id + "-" + this.id;
        //             const itemWithTarget = itemWithId.dataset.target;
        //             if (!itemWithTarget) return;
        //             itemWithId.setAttribute("data-target", itemWithTarget + "-" + this.id);
        //         });
        //     });
        // },

        setDefaultTabs() {
            this.allTabs.forEach((tabs) => {
                this.isTimeout = false;
                const toggle = tabs.querySelector(".nav-link.active");
                this.setActiveTab(toggle);
            });
        },

        setEvents() {
            document.addEventListener("click", (e) => {
                const toggle = e.target.closest('[data-toggle="tab"]');
                if (toggle && !toggle.classList.contains('active')) this.setActiveTab(toggle);
            });
        },
    };

    const state = {
        allTabs: document.querySelectorAll(".tabs"),
    };

    const tabs = new Tabs(state);
    // tabs.addUinqueIds();
    tabs.setEvents();
    setTimeout(() => {
        tabs.setDefaultTabs();
    }, 100);
})();
