// J'ajoute un écouteur d'évènement 
// Quand le contenu du DOM est chargé en même temps tu executes...
// ...la fonction 'itemCardExposed'...
// ...qui attend que la fonction 'getApi' s'execute 
document.addEventListener('DOMContentLoaded', async () => {
    itemCardExposed(await getApi(apiUrl));
})

// console.log(getApi);
// console.log(apiUrl);

// Fonction pour afficher les 'products' sur l'index 
function itemCardExposed(products) {
    // Je définie 'itemCard'
    let itemCard = "";
    // Je définie html
    let html;
    // Méthode qui détermine si l'objet passé en argument est un objet 'Array'
    if(Array.isArray(products)) {
        // (boucle) Pour i = 0, vérifie que i est strictement inférieur à la 'lenght' de l'objet 'products' 
        // et tu executes les deux instructions qui suivent dans la boucle 
        // et tu incrémentes i de 1
        for (var i = 0; i < products.length; i++) {
            // Je définie 'html' entre `` 
            html = `<a href="./product.html?id=${products[i]._id}">
            <article>
            <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
            <h3 class="productName">${products[i].name}</h3>
            <p class="productDescription">${products[i].description}</p>
            </article>
            </a>`
        // Addition de itemCard + html 
        itemCard += html;
        }
    }
    // Je défini 'element' qui dans le DOM sont les éléments avec l'id 'items'
    let element = document.getElementById('items');
    // 'element" est remplacer par 'itemCard' 
    element.innerHTML = itemCard;
}