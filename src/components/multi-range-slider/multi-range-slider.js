(function () {
    function MultiRangeSlider({ multiRangeSliders }) {
        this.multiRange = null;
        this.inputLeft = null;
        this.inputRight = null;
        this.multiRangeSliders = multiRangeSliders;
    }
    MultiRangeSlider.prototype = {
        constructor: MultiRangeSlider,

        getPercent(primaryInput, secondaryInput, isLeftInput) {
            const [min, max] = [parseInt(primaryInput.min), parseInt(primaryInput.max)];
            primaryInput.value = Math[isLeftInput ? "min" : "max"](
                parseInt(primaryInput.value),
                parseInt(secondaryInput.value) - (isLeftInput ? +10 : -10)
            );
            const percent = ((primaryInput.value - min) / (max - min)) * 100;
            return percent;
        },
        setLeftValue() {
            const percent = this.getPercent(this.inputLeft, this.inputRight, true);
            this.thumbLeft.style.left = percent + "%";
            this.range.style.left = percent + "%";
            this.leftCount.innerText = Math.round(percent);
        },

        setRightValue() {
            const percent = this.getPercent(this.inputRight, this.inputLeft, false);
            this.thumbRight.style.right = 100 - percent + "%";
            this.range.style.right = 100 - percent + "%";
            this.rightCount.innerText = Math.round(percent);
        },
        setProperties(e, multiRange) {
            this.multiRange = multiRange || e.target.closest(".multi-range-slider");
            if (!this.multiRange) return;
            this.inputLeft = this.multiRange.querySelector(".input-left");
            this.inputRight = this.multiRange.querySelector(".input-right");
            this.thumbLeft = this.multiRange.querySelector(".thumb.left");
            this.thumbRight = this.multiRange.querySelector(".thumb.right");
            this.range = this.multiRange.querySelector(".range");
            this.leftCount = this.multiRange.querySelector(".left-count");
            this.rightCount = this.multiRange.querySelector(".right-count");

            const _inputLeft = multiRange ? this.inputLeft : e.target.closest(".input-left");
            const _inputRight = multiRange ? this.inputLeft : e.target.closest(".input-right");
            if (_inputLeft) this.setLeftValue();
            if (_inputRight) this.setRightValue();
        },
        setDefaultValues() {
            this.multiRangeSliders.forEach((multiRange) => {
                this.setProperties(false, multiRange);
            });
        },
        setEvents() {
            document.addEventListener("input", (e) => this.setProperties(e));
        },
    };

    const state = {
        multiRangeSliders: document.querySelectorAll(".multi-range-slider"),
    };

    const multiRangeSlider = new MultiRangeSlider(state);
    multiRangeSlider.setEvents();
    multiRangeSlider.setDefaultValues();
})();
