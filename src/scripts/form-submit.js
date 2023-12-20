const formSubmit = (function () {
    const public_key = "KkCk5FtOVSLP_RCoX"
    emailjs.init(public_key);

    const createFormSubmit = ({ id, service, template }) => {
        document.getElementById(id).addEventListener("submit", function (event) {
            event.preventDefault();
            emailjs.sendForm(service, template, this).then(
                function () {
                    alert("SUCCESS!");
                },
                function (error) {
                    alert("FAILED...", error);
                }
            );
        });
    };

    // receive message
    createFormSubmit({ id: "contact-form", service: "service_af8zoih", template: "template_mtf61lg" });

    // send message
    createFormSubmit({ id: "contact-form-2", service: "service_af8zoih", template: "template_4y0cegk" });
})();
