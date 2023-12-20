(function () {
    function Pagination({ withItems,buttons, wrapper, pagination, paginationWrapper, page, count, prev, next }) {
        this.wrapper = wrapper;
        this.withItems = withItems;
        this.items = null;
        this.currentPageItems = null;
        this.itemPerPage = 10;
        //
        this.buttons = buttons
        this.pagination = pagination;
        this.paginationWrapper = paginationWrapper;
        this.prev = prev;
        this.next = next;
        this.count = count;
        this.currentPage = page;
        this.activeButton = null;
        this.prevDots = null;
        this.nextDots = null;
        this.init();
    }

    Pagination.prototype = {
        constructor: Pagination,
        setActiveItem() {
            this.currentPage = parseInt(this.activeButton.dataset.index);
            const currentActiveButton = this.pagination.querySelector(".active");
            if (currentActiveButton) currentActiveButton.classList.remove("active");
            const newActiveButton = this.pagination.querySelector(`[data-index="${this.currentPage}"]`);
            newActiveButton.classList.add("active");
        },
        seActiveChevron() {
            const prev = this.pagination.querySelector(".prev");
            const next = this.pagination.querySelector(".next");

            prev.classList.remove("disabled");
            next.classList.remove("disabled");
            if (this.currentPage === 1) {
                prev.classList.add("disabled");
            } else if (this.currentPage === this.count) {
                next.classList.add("disabled");
            }
        },

        handleClick(button) {
            this.activeButton = button;
            this.setActiveItem();
            this.seActiveChevron();
            this.updateButtons();
            if (!this.withItems) return;
            this.currentPageItems = this.getCurrentPageItems();

            this.wrapper.classList.add("hidden");
            this.wrapper.ontransitionend = () => {
                this.wrapper.ontransitionend = "";
                this.setItems();
                this.wrapper.classList.remove("hidden");
                // setTimeout(()=>this.wrapper.classList.remove('hidden'),100)
            };
        },
        // items
        createItem({ title, id, url }) {
            return `<div class="card photo-card" >
                        <div class="card-id">${id}</div>
                        <img src='${url}' alt="" />
                        <div class="card-title">${title}</div>
                    </div>`;
        },
        getCurrentPageItems() {
            const indexOfLastItem = this.currentPage * this.itemPerPage;
            const indexOfFirstItem = indexOfLastItem - this.itemPerPage;
            const currentPageItems = this.items.slice(indexOfFirstItem, indexOfLastItem);
            return currentPageItems;
        },
        async getItems() {
            const { getPhotos } = Fetch;
            this.wrapper.innerHTML = "loading...";
            const data = await getPhotos();
            if (!data) return;
            this.items = data;
            this.count = Math.ceil(data.length / this.itemPerPage);
            this.currentPageItems = this.getCurrentPageItems();
            this.setItems();
        },
        setItems() {
            let photos = "";
            this.currentPageItems.forEach((photo) => (photos += this.createItem(photo)));
            this.wrapper.innerHTML = photos;
        },
        //
        createButton(index,isButtonShown) {
            return `<li class="pagination-item" >
                        <button class="pagination-link button ${
                            this.currentPage === index ? "active" : ""

                        } ${!isButtonShown ? 'hidden': ''}" data-index="${index}">${index}</button>
                    </li>`;
        },
        createDots(isHidden) {
            return `<li class="pagination-item" >
                        <button class="pagination-link dots disabled ${isHidden ? "hidden" : ""}">...</button>
                    </li>`;
        },
        updateButtons() {
            let items = "";
            let isCenterActive = false;
            Array(this.count)
            .fill("")
            .forEach((item, index) => {
                    let isButtonShown = true
                    if (index === 1) {
                        isCenterActive = true;
                        items += this.createDots(this.currentPage < 4);
                    }
                    if (index === this.count - 1) {
                        isCenterActive = true;
                        items += this.createDots(this.currentPage > this.count - 3);
                    }
                    if (
                        (isCenterActive && index < this.count - 4 && index < this.currentPage - 2) ||
                        (isCenterActive && index > 3 && index !== this.count - 1 && index > this.currentPage)
                        )
                        isButtonShown = false

                    items += this.createButton(index + 1,isButtonShown);
                });
            this.paginationWrapper.innerHTML = items;
        },
        async init() {
            if (this.withItems) await this.getItems();
            this.prevDots = this.pagination.querySelectorAll(".dots")[0];
            this.nextDots = this.pagination.querySelectorAll(".dots")[1];
            this.updateButtons();
            this.setEvents();
        },

        setEvents() {
            this.buttons = this.pagination.querySelectorAll(".button");
            this.pagination.addEventListener("click", (e) => {
                const button = e.target.closest(".pagination-link.button");
                const prevButton = e.target.closest(".pagination-link.prev");
                const nextButton = e.target.closest(".pagination-link.next");
                if (button) this.handleClick(button);
                if (prevButton)   this.handleClick(this.buttons[this.currentPage - 2]);
                if (nextButton)   this.handleClick(this.buttons[this.currentPage ]);
            });

        },
    };

    const paginationOptions1 = {
        pagination: document.querySelector(".pagination-1"),
        paginationWrapper: document.querySelector(".pagination-1 .wrapper"),
        prev: document.querySelector(".pagination-1 .prev"),
        next: document.querySelector(".pagination-1 .next"),
        page: 2,
        count: 5,
    };
    const paginationOptions2 = {
        pagination: document.querySelector(".pagination-2"),
        paginationWrapper: document.querySelector(".pagination-2 .wrapper"),
        prev: document.querySelector(".pagination-2 .prev"),
        next: document.querySelector(".pagination-2 .next"),
        page: 3,
        count: 8,
    };
    const photoPaginationOptions = {
        wrapper: document.querySelector(".photo-card-group"),
        buttons: document.querySelectorAll(".photo-pagination .pagination-link.button"),
        pagination: document.querySelector(".photo-pagination"),
        paginationWrapper: document.querySelector(".photo-pagination .wrapper"),
        prev: document.querySelector(".photo-pagination .prev"),
        next: document.querySelector(".photo-pagination .next"),
        page: 3,
        count: 8,
        withItems: true,
    };

    const pagination1 = new Pagination(paginationOptions1);
    const pagination2 = new Pagination(paginationOptions2);
    const photoPagination = new Pagination(photoPaginationOptions);
})();

