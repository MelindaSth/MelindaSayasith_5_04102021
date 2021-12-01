// Fonction pour réccupérer l'API

const apiUrl = "http://localhost:3000/api/products";

async function getApi(url) {
    const dataPromise = fetch(url)
        .then((response) => {
            if (response.ok) return response.json();
        })
        .catch(e => console.error(e.message));
    return dataPromise;
}

document.addEventListener('DOMContentLoaded', async () => {
    itemCardExposed(await getApi(apiUrl));
})

// Fonction pour afficher les produits 

function itemCardExposed(products) {
    let itemCard = "";
    let html;
    if (Array.isArray(products)) {
        for (var i = 0; i < products.length; i++) {
            html = `<a href="./product.html?id=${products[i]._id}">
            <article>
            <img src="${products[i].imageUrl}" alt="${products[i].altTxt}"/>
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