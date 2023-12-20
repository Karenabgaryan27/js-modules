(function () {
    const scrollIntoView = (activeItem) => {
        activeItem?.scrollIntoView({
            // behavior: 'smooth',
            block: "nearest",
            inline: "nearest",
        });
    };

    const initAutocomplete = (e) => {
        const autocomplete = document.querySelector(".autocomplete.active");
        const autocompleteButton = e.target.closest("[data-toggle='autocomplete']");
        const autocompleteItem = e.target.closest(".autocomplete-item");
        const autocompleteItems = e.target
            .closest(".autocomplete")
            ?.querySelectorAll(".autocomplete-item:not(.disabled)");
        const noResultItem = e.target.closest(".autocomplete")?.querySelector(".autocomplete-item.disabled");
        const autocompleteField = e.target.closest(".autocomplete-field");

        const openMenu = () => {
            if (autocompleteItems.length) noResultItem.style.display = "none";
            autocompleteItems.forEach((item) => (item.style.display = "flex"));
            autocompleteButton.closest(".autocomplete").classList.add("active");

            setActiveOption();
        };

        const closeMenu = () => {
            const localField = autocomplete.querySelector(".autocomplete-field");
            if (localField === autocompleteField) return;
            localField.value = "";
            const wrapper = autocomplete.querySelector(".btn > .wrapper");
            wrapper.style.opacity = "";
            autocomplete.classList.remove("active");
        };

        const setActiveItem = () => {
            const wrapper = autocompleteItem.closest(".autocomplete").querySelector(".btn > .wrapper");
            wrapper.innerHTML = autocompleteItem.innerHTML;
            const title = wrapper.querySelector(".autocomplete-item-title");
            if (title) title.classList.replace("autocomplete-item-title", "autocomplete-toggle-title");
            if (wrapper.classList.contains("placeholder")) wrapper.classList.remove("placeholder");

            setActiveIndex();
        };

        const handleFieldOptions = () => {
            const wrapper = autocompleteField.closest(".autocomplete").querySelector(".btn > .wrapper");
            if (!autocompleteField.value) wrapper.style.opacity = "0.4";
            autocompleteField.oninput = () => {
                wrapper.style.opacity = !autocompleteField.value ? "0.4" : "0";
                onChange();
            };
        };

        const onChange = () => {
            let count = 0;
            noResultItem.style.display = "none";

            autocompleteItems.forEach((item, index) => {
                item.style.display = "none";
                if (item.innerText.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1) {
                    item.style.display = "flex";
                    count += 1;
                }
            });

            if (count === 0) noResultItem.style.display = "block";
        };

        const setActiveIndex = () => {
            const index = [...autocompleteItems].findIndex((item) => item === autocompleteItem);
            autocomplete.setAttribute("data-active-index", index);
        };

        const setActiveOption = () => {
            const tempAutocomplete = autocompleteButton.closest(".autocomplete");
            const activeItem = tempAutocomplete.querySelector(".autocomplete-item.active");
            if (activeItem) activeItem.classList.remove("active");

            const activeIndex = tempAutocomplete.dataset.activeIndex;
            if (activeIndex) {
                autocompleteItems[activeIndex]?.classList.add("active");
                setTimeout(() => scrollIntoView(autocompleteItems[activeIndex]), 100);
            }
        };

        if (autocompleteButton) openMenu();
        if (autocomplete) closeMenu();
        if (autocompleteItem) setActiveItem();
        if (autocompleteField) handleFieldOptions();
    };

    document.addEventListener("click", initAutocomplete);

    // KEYBOARD
    const KEYS = ["ArrowUp", "ArrowDown", "Enter"];

    const initAutocompleteKeyOptions = (e) => {
        const autocomplete = e.target.closest(".autocomplete");

        const filteredAutocompleteItems = autocomplete.querySelectorAll(
            '.autocomplete-item:not([style*="display: none"]'
        );

        let globalIndex = -1;

        globalIndex = [...filteredAutocompleteItems].findIndex((item) => item.classList.contains("active"));

        const setActiveItem = () => {
            const prevActiveItem = autocomplete.querySelector(".autocomplete-item.active");
            if (prevActiveItem) prevActiveItem.classList.remove("active");
            const activeItem = filteredAutocompleteItems[globalIndex];
            activeItem?.classList.add("active");
            scrollIntoView(activeItem);
        };

        if (e.key === "ArrowUp") {
            if (globalIndex <= 0) return;
            globalIndex--;
            setActiveItem();
        }

        if (e.key === "ArrowDown") {
            if (globalIndex >= filteredAutocompleteItems.length - 1) return;
            globalIndex++;
            setActiveItem();
        }

        if (e.key === "Enter") {
            filteredAutocompleteItems[globalIndex]?.click();
        }
    };

    const branchOperator = (e) => {
        const autocomplete = e.target.closest(".autocomplete");
        const isPrevAutocomplete = autocomplete?.classList.contains("active");

        if (autocomplete && isPrevAutocomplete && e.key === "Tab") {
            autocomplete.classList.remove("active");
            autocomplete.querySelector(".autocomplete-field").value = "";
            const wrapper = autocomplete.querySelector(".btn > .wrapper");
            wrapper.style.opacity = "";
        }

        if (autocomplete && !isPrevAutocomplete && e.key !== "Tab") {
            initAutocomplete(e);
        }

        if (autocomplete && isPrevAutocomplete && KEYS.includes(e.key)) {
            if (["ArrowUp", "ArrowDown"].includes(e.key)) e.preventDefault(); // to prevent autocompleteField default behaviour when pressed ArrowUp or ArrowDown
            initAutocompleteKeyOptions(e);
        }
    };

    document.addEventListener("keydown", branchOperator);
})();
