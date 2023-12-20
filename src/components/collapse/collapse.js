(function () {
    function Collapse() {}

    Collapse.prototype = {
        constructor: Collapse,

        handleTransition(target) {
            target.addEventListener(
                "transitionend",
                (e) => {
                    e.currentTarget.classList.replace("collapsing", "collapse");
                    e.currentTarget.style = "";
                },
                { once: true }
            );
        },

        showTarget(target, toggle) {
            target.classList.add("show");
            target.classList.replace("collapse", "collapsing");
            setTimeout(() => (target.style = `height: ${target.scrollHeight + "px"}`), 0);
            this.handleTransition(target);
            toggle.classList.remove("collapsed");
        },
        hideTarget(target, toggle) {
            target.style = `height: ${target.scrollHeight + "px"}`;
            setTimeout(() => {
                target.classList.remove("show");
                target.classList.replace("collapse", "collapsing");
                target.style = "";
                this.handleTransition(target);
            }, 0);
            toggle.classList.add("collapsed");
        },
        setActiveItem(toggle) {
            const target = document.querySelector(toggle.dataset.target);
            const parent = document.querySelector(target.dataset.parent);
            const isCollapsing = parent?.querySelector(".collapsing");
            if (isCollapsing) return;
            const previousTarget = parent?.querySelector(".collapse.show");
            const previousToggle = previousTarget && document.querySelector(`[data-target="#${previousTarget.id}"]`);
            if (parent && previousTarget && previousTarget !== target)
                this.hideTarget(previousTarget, previousToggle || toggle);

            const isTargetShown = target.classList.contains("show");
            isTargetShown ? this.hideTarget(target, previousToggle || toggle) : this.showTarget(target, toggle);
        },
        setEvents() {
            document.addEventListener("click", (e) => {
                const toggle = e.target.closest("[data-toggle='collapse']");
                if (toggle) this.setActiveItem(toggle);
            });
        },
    };

    const collapse = new Collapse();
    collapse.setEvents();
})();
