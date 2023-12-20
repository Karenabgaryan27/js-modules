const Products = (function () {
    const productsWrapper = document.querySelector(".products-page .wrapper");
    let products = "";

    const { getProducts } = Fetch;

    getProducts((error, data) => {
        if (!data) return;
        data.forEach((product) => {
            const {title,thumbnailUrl,id} = product
            products += `
            <a href="/src/pages/product/product.html?productId=${id}" class="">
               <img src="${thumbnailUrl}" alt="${title}" />
            </a>
            `;
        });
        productsWrapper.innerHTML = products
    });
})();

