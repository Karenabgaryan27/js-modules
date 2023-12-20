(function () {
    const { lockScroll, unlockScroll } = Lock || {};
    function Modal() {
        this.reset();
    }

    Modal.prototype = {
        constructor: Modal,
        reset() {
            this.modal = null;
        },
        showModal(toggle) {
            this.modal = document.querySelector(toggle.dataset.target);
            this.modal.style.display = "block";
            setTimeout(() => this.modal.classList.add("show"), 100);
            if (lockScroll) lockScroll();
        },
        hideModal() {
            this.modal.classList.remove("show");
            this.modal.addEventListener(
                "transitionend",
                (e) => {
                    e.currentTarget.style.display = "none";
                    if (!document.querySelector(".modal.show")) if (unlockScroll) unlockScroll();
                },
                {
                    once: true,
                }
            );
        },
        setEvents() {
            document.addEventListener("click", (e) => {
                const toggle = e.target.closest("[data-toggle='modal']");
                const dismiss = e.target.closest('[data-dismiss="modal"]');
                const modalContent = e.target.closest(".modal-content");
                const closestModal = e.target.closest(".modal");
                if (dismiss) this.hideModal();
                if (toggle) this.showModal(toggle);
                if (closestModal && !modalContent) this.hideModal();
            });
        },
    };

    const modalState = {};

    const modal = new Modal(modalState);
    modal.setEvents();
})();
