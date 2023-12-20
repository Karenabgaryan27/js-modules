(function () {
    function NestedModal() {
        this.reset();
    }

    NestedModal.prototype = {
        constructor: NestedModal,
        reset() {
            this.nestedModal = null;
        },
        showModal(toggle) {
            this.nestedModal = document.querySelector(toggle.dataset.target);
            this.nestedModal.style.display = "block";
            setTimeout(() => this.nestedModal.classList.add("show"), 100);
        },
        hideModal() {
            this.nestedModal.classList.remove("show");
            this.nestedModal.addEventListener(
                "transitionend",
                (e) => {
                    e.currentTarget.style.display = "none";
                },
                {
                    once: true,
                }
            );
        },
        setEvents() {
            document.addEventListener("click", (e) => {
                const toggle = e.target.closest("[data-toggle='nested-modal']"),
                    dismiss = e.target.closest('[data-dismiss="nested-modal"]'),
                    modalContent = e.target.closest(".nested-modal-content"),
                    closestModal = e.target.closest(".nested-modal");
                if (dismiss) this.hideModal();
                if (toggle) this.showModal(toggle);
                if (closestModal && !modalContent) this.hideModal();
            });
        },
    };

    const nestedModalState = {};

    const nestedModal = new NestedModal(nestedModalState);
    nestedModal.setEvents();
})();
