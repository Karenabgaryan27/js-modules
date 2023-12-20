(function () {
    const scrollIntoView = (activeItem) => {
        activeItem?.scrollIntoView({
            // behavior: 'smooth',
            block: "nearest",
            inline: "nearest",
        });
    };

    const initSelect = (e) => {
        const select = document.querySelector(".select.active");
        const selectButton = e.target.closest("[data-toggle='select']");
        const selectItem = e.target.closest(".select-item");
        const selectItems = e.target.closest(".select")?.querySelectorAll(".select-item");

        const openMenu = () => {
            selectButton.closest(".select").classList.add("active");

            setActiveOption();
        };

        const closeMenu = () => {
            select.classList.remove("active");
        };

        const setActiveItem = () => {
            const wrapper = selectItem.closest(".select").querySelector(".btn > .wrapper");
            wrapper.innerHTML = selectItem.innerHTML;
            const title = wrapper.querySelector(".select-item-title");
            if (title) title.classList.replace("select-item-title", "select-toggle-title");
            if (wrapper.classList.contains("placeholder")) wrapper.classList.remove("placeholder");

            setActiveIndex();
        };

        const setActiveIndex = () => {
            const index = [...selectItems].findIndex((item) => item === selectItem);
            select.setAttribute("data-active-index", index);
        };

        const setActiveOption = () => {
            const tempSelect = selectButton.closest(".select");
            const activeItem = tempSelect.querySelector(".select-item.active");
            if (activeItem) activeItem.classList.remove("active");

            const activeIndex = tempSelect.dataset.activeIndex;
            if (activeIndex) {
                selectItems[activeIndex].classList.add("active");
                setTimeout(() => scrollIntoView(selectItems[activeIndex]), 100);
            }
        };

        if (selectButton) openMenu();
        if (select) closeMenu();
        if (selectItem) setActiveItem();
    };

    document.addEventListener("click", initSelect);

    // KEYBOARD
    const KEYS = ["ArrowUp", "ArrowDown", "Enter"];

    const initSelectKeyOptions = (e) => {
        const select = e.target.closest(".select");

        const selectItems = select.querySelectorAll(".select-item");
        let globalIndex = -1;

        globalIndex = [...selectItems].findIndex((item) => item.classList.contains("active"));

        const setActiveItem = () => {
            const prevActiveItem = select.querySelector(".select-item.active");
            if (prevActiveItem) prevActiveItem.classList.remove("active");
            const activeItem = selectItems[globalIndex];
            activeItem?.classList.add("active");
            scrollIntoView(activeItem);
        };
        if (e.key === "ArrowUp") {
            if (globalIndex <= 0) return;
            globalIndex--;
            setActiveItem();
        }

        if (e.key === "ArrowDown") {
            if (globalIndex >= selectItems.length - 1) return;
            globalIndex++;
            setActiveItem();
        }

        if (e.key === "Enter") {
            selectItems[globalIndex]?.click();
        }
    };

    const branchOperator = (e) => {
        if (['ArrowUp','ArrowDown'].includes(e.key)) e.preventDefault(); // to prevent page scrolling when pressed ArrowUp or ArrowDown
        const select = e.target.closest(".select");
        const isPrevSelect = select?.classList.contains("active");

        if (select && isPrevSelect && e.key === "Tab") {
            select.classList.remove("active");
        }

        if (select && !isPrevSelect && e.key !== "Tab") {
            initSelect(e);
        }

        if (select && isPrevSelect && KEYS.includes(e.key)) {
            initSelectKeyOptions(e);
        }
    };

    document.addEventListener("keydown", branchOperator);
})();
