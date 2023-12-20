(function () {
    function Toast() {
        this.duration = 3000;
        this.toastWrapper = null;
        this.setEvents();
        this.init();
    }

    Toast.prototype = {
        constructor: Toast,
        createElement(tag, className = "", text = null) {
            const div = document.createElement(tag);
            div.className = className;
            div.innerText = text;
            return div;
        },
        createToast(toggle, { variant = "", message }) {
            const toast = this.createElement("div", "custom-toast " + variant);
            const toastInner = this.createElement("div", "custom-toast-inner", message);
            const close = this.createElement("div", "custom-toast-close");
            console.log(variant);
            close.setAttribute("data-target", "toast");
            toast.appendChild(toastInner);
            toastInner.appendChild(close);
            this.toastWrapper.appendChild(toast);
            toast.ontransitionend = () => toast.remove();
            toastInner.ontransitionend = (e) => e.stopPropagation();
            return toast;
        },
        showToast(toggle, options) {
            const toast = this.createToast(toggle, options);
            setTimeout(() => toast.classList.add("show"));
            const timeout = setTimeout(() => this.hideToast(toast), this.duration);

            //
            toast.onmouseenter = () => clearTimeout(timeout);
            toast.onmouseleave = () => {
                const timeout = setTimeout(() => this.hideToast(toast), this.duration);
                toast.onmouseenter = () => clearTimeout(timeout);
            };
        },
        hideToast(toast) {
            toast.classList.remove("show");
        },
        init() {
            this.toastWrapper =
                document.querySelector(".toast-wrapper") ||
                document.body.appendChild(this.createElement("div", "toast-wrapper"));
        },
        setEvents() {
            document.addEventListener("click", (e) => {
                const toggle = e.target.closest('[data-toggle="toast"]');
                const close = e.target.closest('[data-target="toast"]');
                if (toggle)
                    this.showToast(toggle, { variant: "", message: e.target.dataset.message || "success message" });
                if (close) this.hideToast(close.parentElement.parentElement);
            });
        },
    };

    const toastState = {};

    const toast = new Toast();
})();
