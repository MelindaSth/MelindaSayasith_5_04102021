document.addEventListener('DOMContentLoaded', async () => {
    itemCardExposed(await getApi(apiUrl));
})

console.log(getApi);
console.log(apiUrl);


/** @function itemCardExposed */

function itemCardExposed(products) {
    let itemCard = "";
    let html;
    if(Array.isArray(products)) {
        for (var i = 0; i < products.length; i++) {
            html = `<a href="./product.html?id=${products[i]._id}">
            <article>
            <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
            <h3 class="productName">${products[i].name}</h3>
            <p class="productDescription">${products[i].description}</p>
            </article>
        </a>`
        itemCard += html;
        }
    }
    let element = document.getElementById('items');
    element.innerHTML = itemCard;
}