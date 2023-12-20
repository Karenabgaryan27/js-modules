
(function () {
    // JOI
    function Joi() {
        this.field = null;
        this.schema = {};
        this.validationResult = { value: {}, error: { details: [] } };
    }

    Joi.prototype = {
        constructor: Joi,
        required() {
            if (!this.field.value.trim()) {
                this.validationResult.error.details.push({
                    message: `"${this.field.name}" is not allowed to be empty`,
                    pathname: [this.field.name],
                });
            }

            this.validationResult.value[this.field.name] = this.field.value;
            return this;
        },
        max(num) {
            if (this.field.value.length > num) {
                this.validationResult.error.details.push({
                    message: `"${this.field.name}" length must be less than or equal to ${num} characters long`,
                    pathname: [this.field.name],
                });
            }

            this.validationResult.value[this.field.name] = this.field.value;
            return this;
        },
        min(num) {
            if (this.field.value.length < num) {
                this.validationResult.error.details.push({
                    message: `"${this.field.name}" length must be at least ${num} characters long`,
                    pathname: [this.field.name],
                });
            }

            this.validationResult.value[this.field.name] = this.field.value;
            return this;
        },
        email() {
            const validEmail = this.field.value
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
            if (!validEmail) {
                this.validationResult.error.details.push({
                    message: `"${this.field.name}" must be a valid email`,
                    pathname: [this.field.name],
                });
            }
        },
        object(obj) {
            this.schema = obj;
            return this;
        },
        validate(fields) {
            this.validationResult = { value: {}, error: { details: [] } };

            for (field in fields) {
                if (this.schema[field]) {
                    this.field = { name: field, value: fields[field] };

                    this.field.value ? this.schema[field]() : this.required();
                }
            }
            if (!this.validationResult.error.details.length) delete this.validationResult.error;
            return this.validationResult;
        },
    };

    const contactJoi = new Joi();
    const validateContact = (obj) => {
        const contactSchema = contactJoi.object({
            name: () => contactJoi.min(3).max(6),
            email: () => contactJoi.min(3).email(),
        });
        return contactSchema.validate(obj);
    };

    // VALIDATION

    function Validation({ form, inputs, fieldBtns }) {
        this.form = form;
        this.inputs = inputs;
        this.fieldBtns = fieldBtns;
    }
    Validation.prototype = {
        constructor: Validation,
        setFeedback(result, input) {
            const invalidInput = result.error ? result.error.details.find((err) => input.id === err.pathname[0]) : null;
            // const invalidFeedback = input.parentElement.querySelector(".invalid-feedback");
            const invalidFeedback = input.closest('.input-group').querySelector(".invalid-feedback");
            const statusTag = input.closest('.btn') || input
            if (invalidInput) {
                statusTag.classList.remove("is-valid");
                statusTag.classList.add("is-invalid");
                invalidFeedback.innerText = invalidInput.message;
            } else {
                statusTag.classList.remove("is-invalid");
                statusTag.classList.add("is-valid");
            }
        },
        validateInputs() {
            const decodedForm = {};
            this.inputs.forEach((input) => (decodedForm[input.name] = input.value));
            const result = validateContact(decodedForm);
            if (!result.error) return;
            this.form.classList.add("was-submitted");
            this.inputs.forEach((input) => this.setFeedback(result, input));
        },
        validateInput(input) {
            if (!this.form.classList.contains("was-submitted")) return;
            const decodedInput = { [input.name]: input.value };
            const result = validateContact(decodedInput);
            this.setFeedback(result, input);
        },

        setEvents() {
            this.inputs.forEach((input) => {
                input.addEventListener("input", (e) => this.validateInput(input));
            });
            this.form.addEventListener("submit", (e) => {
                e.preventDefault();
                this.validateInputs();
            });
            if (this.fieldBtns) {
                this.fieldBtns.forEach((btn) => btn.addEventListener("click", (e) => e.preventDefault()));
            }
        },
    };

    const contactState = {
        form: document.querySelector(".detailed-contact-form"),
        inputs: document.querySelectorAll(".detailed-contact-form input"),
        fieldBtns: document.querySelectorAll(".detailed-contact-form .field-btn .btn"),
    };

    const contactValidation = new Validation(contactState);
    contactValidation.setEvents();

    // 
    const btnFieldState = {
        form: document.querySelector(".btn-field-form"),
        inputs: document.querySelectorAll(".btn-field-form input"),
        fieldBtns: document.querySelectorAll(".btn-field-form .field-btn .btn"),
    };

    const btnFieldValidation = new Validation(btnFieldState);
    btnFieldValidation.setEvents();
})();
