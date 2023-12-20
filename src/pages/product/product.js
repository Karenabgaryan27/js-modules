const Product = (function () {
    const productWrapper = document.querySelector(".product-page .wrapper");
    let product = "";

    const { getProduct } = Fetch;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let productId = urlParams.get("productId");

    if (!productId) productId = new URL(window.location).pathname.match(/[^\/]+/g)[1]; // server side rendering
    
    getProduct((error, data) => {
        if (!data) return;
        const { title, url } = data;
        product = `<img src="${url}" alt="${title}" />`;
        productWrapper.innerHTML = product;
    }, productId);
})();
