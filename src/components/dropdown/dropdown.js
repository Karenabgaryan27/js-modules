// version without key logic
// document.addEventListener("click", (e) => {
//     const dropdown = document.querySelector(".dropdown.active");
//     const dropdownButton = e.target.closest("[data-toggle='dropdown']");
//     const dropdownMenu = e.target.closest(".dropdown-menu")

//     if (dropdownButton) dropdownButton.closest(".dropdown").classList.add("active");
//     if (dropdown && !dropdownMenu) dropdown.classList.remove("active")
// });

(function () {
    const scrollIntoView = (activeItem) => {
        activeItem?.scrollIntoView({
            // behavior: 'smooth',
            block: "nearest",
            inline: "nearest",
        });
    };

    const initDropdown = (e) => {
        const dropdown = document.querySelector(".dropdown.active");
        const dropdownButton = e.target.closest("[data-toggle='dropdown']");
        const dropdownMenu = e.target.closest(".dropdown-menu");
        const dropdownItem = e.target.closest(".dropdown-item");
        const dropdownItems = e.target.closest(".dropdown")?.querySelectorAll(".dropdown-item");

        const openMenu = () => {
            dropdownButton.closest(".dropdown").classList.add("active");

            setActiveOption(dropdownButton);
        };

        const closeMenu = () => {
            dropdown.classList.remove("active");

            // removeActiveOption();      //add if need to reset options each time when opening menu
        };

        // const removeActiveOption = () => {   //add if need to reset options each time when opening menu
        //     dropdown.removeAttribute('data-active-index')
        // };

        const setActiveItem = () => {
            setActiveIndex();
            setActiveOption(dropdownItem);
            
        };

        const setActiveIndex = () => {
            const index = [...dropdownItems].findIndex((item) => item === dropdownItem);
            dropdown.setAttribute("data-active-index", index);
        };

        const setActiveOption = (element) => {
            const tempDropdown = element.closest(".dropdown");
            const activeItem = tempDropdown.querySelector(".dropdown-item.active");
            if (activeItem) activeItem.classList.remove("active");

            const activeIndex = tempDropdown.dataset.activeIndex;
            if (activeIndex) {
                dropdownItems[activeIndex].classList.add("active");
                setTimeout(() => scrollIntoView(dropdownItems[activeIndex]), 100);
            }
        };

        if (dropdownButton) openMenu();
        if (dropdown && !dropdownMenu) closeMenu(); // remove "&& !dropdownMenu" to allow menu close when clicking options
        if (dropdownItem) setActiveItem();
    };

    document.addEventListener("click", initDropdown);

    // KEYBOARD
    const KEYS = ["ArrowUp", "ArrowDown", "Enter"];

    const initDropdownKeyOptions = (e) => {
        const dropdown = e.target.closest(".dropdown");

        const dropdownItems = dropdown.querySelectorAll(".dropdown-item");
        let globalIndex = -1;

        globalIndex = [...dropdownItems].findIndex((item) => item.classList.contains("active"));

        const setActiveItem = () => {
            const prevActiveItem = dropdown.querySelector(".dropdown-item.active");
            if (prevActiveItem) prevActiveItem.classList.remove("active");
            const activeItem = dropdownItems[globalIndex];
            activeItem?.classList.add("active");

            scrollIntoView(activeItem);
        };
        if (e.key === "ArrowUp") {
            if (globalIndex <= 0) return;
            globalIndex--;
            setActiveItem();
        }

        if (e.key === "ArrowDown") {
            if (globalIndex >= dropdownItems.length - 1) return;
            globalIndex++;
            setActiveItem();
        }

        if (e.key === "Enter") {
            e.preventDefault();
            dropdownItems[globalIndex]?.click();
        }
    };

    const branchOperator = (e)=>{
        if (['ArrowUp','ArrowDown'].includes(e.key)) e.preventDefault(); // to prevent page scrolling when pressed ArrowUp or ArrowDown
        const dropdown = e.target.closest(".dropdown");
        const isPrevSelect = dropdown?.classList.contains("active");

        if (dropdown && isPrevSelect && e.key === "Tab") {
            dropdown.classList.remove("active");
        }

        if (dropdown && !isPrevSelect && e.key !== "Tab") {
            initDropdown(e);
        }

        if (dropdown && isPrevSelect && KEYS.includes(e.key)) {
            initDropdownKeyOptions(e);
        }
    }

    document.addEventListener("keydown", branchOperator);
})();
