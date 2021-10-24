// Je définie l'url de l'API
const apiUrl = "http://localhost:3000/api/products";

// Fontion pour réccupérer le bon url
async function getApi(url) {
    // Je définie une "promise" qui utilise la méthode fetch pour lire un url
    const dataPromise = fetch(url)
    // Puis quand tu as la "reponse" 
    .then((response) => {
        // Si "reponse" ok alors tu formates en Json et tu renvoies la donnée
        if(response.ok) return response.json();
    })
    // Si non ok tu attrapes la "reponse" et tu renvoies message d'erreur 
    .catch(e => console.error(e.message));
    // Tu mets fin à la fonction et tu renvoies la promise 
    return dataPromise;
}

// J'ajoute un écouteur d'évènement 
// Quand le contenu du DOM est chargé en même temps tu executes...
// ...la fonction 'itemCardExposed'...
// ...qui attend que la fonction 'getApi' s'execute 
document.addEventListener('DOMContentLoaded', async () => {
    itemCardExposed(await getApi(apiUrl));
})

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
            <img src="${products[i].imageUrl}" alt="${products[i].altTxt}"/>
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