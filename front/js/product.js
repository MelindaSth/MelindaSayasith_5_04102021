// Je définie l'url du 'product'
const urlProduct = new URL(window.location.href);
// console.log(urlProduct);

// Je définie l'url de l'API du 'product' qui est 'apiUrl' + / + l'id dans l'url de 'urlProduct'
const apiUrlIdProduct = apiUrl + '/' + urlProduct.searchParams.get("id");
// console.log(apiUrlIdProduct);
// console.log(urlProduct.searchParams.get("id"));

// Fonction pour réccupérer le bon url de l'API 'product'
async function getApiIdProduct() {
    // Je définie 'apiProduct' qui attend la fin de l'éxécution de la fonction 'getApi'
    const apiProduct = await getApi(apiUrlIdProduct);
    // Tu exécutes la fonction 'productExposed'
    productExposed(apiProduct)
    // console.log(apiProduct);
}

// Tu éxécutes la fonction getApiProduct
getApiIdProduct();

// Fonction pour afficher le produit et ses détails 
function productExposed(apiProduct) {
    // Je définie le titre de la page = 'name' dans 'apiProduct'
    document.title = apiProduct.name

    // Je crée l'img à afficher 
    const imageProduct = document.createElement("img");
    // Je définie la 'src' de l'image 
    imageProduct.src = apiProduct.imageUrl
    // Je définie 'alt' de l'image
    imageProduct.alt =  apiProduct.altTxt

    // Je défini le bloc imageProductElement qui correspond dans la page à l'élément avec une 'class name' "item__img" ciblée
    const imageProductElement = document.getElementsByClassName("item__img")[0];
    // console.log(imageProductElement)
    // 'imageProductElement' est l'enfant de 'imageProduct' 
    imageProductElement.appendChild(imageProduct);

    // Je définie le 'title' du 'product' 
    const titleProduct = document.getElementById("title");
    titleProduct.textContent = apiProduct.name
    // console.log(titleProduct.textContent)

    // Je définie le 'price' du 'product' 
    const priceProduct = document.getElementById("price");
    priceProduct.textContent = apiProduct.price
    // console.log(priceProduct.textContent)

    // Je définie la description du 'product' 
    const descriptionProduct = document.getElementById("description");
    descriptionProduct.textContent = apiProduct.description
    // console.log(descriptionProduct.textContent)

    // Je définie les couleurs du 'product' 
    const selectColor = document.getElementById("colors");
    // Pour (color de apiProduct.colors) 
    for (color of apiProduct.colors) {
        // Je crée une 'option' 
        const option = document.createElement("option");
        option.textContent = color;
        // console.log(option.textContent)
        // selectColor est l'enfant de 'option' 
        selectColor.appendChild(option);
    }
}