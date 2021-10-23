// Définition de l'évènement au click pour l'ajout dans le panier 
const button = document.getElementById("addToCart");
button.addEventListener("click", addToCart);

// Fonction pour ajouter le produit dans le panier en cliquant sur le bouton
function addToCart(event) {
    // Je définie 'cart' par la fonction 'getStorageToCart'
    // 'cart' correspond à la data dans le localStorage
    const cart = getStorageToCart();
    // Je crée un objet qui contient l'id, la couleur et la quantité
    const productAddToCart = {
        // Ici y'a un bug pcq je n'ai pas l'id qui s'affiche 
        id: getApiIdProduct(),
        color: document.getElementById("colors").value,
        quantity: Number(document.getElementById("quantity").value),
    };
    // La console affiche l'id, la couleur et la quantité
    // au 'click' sur le bouton en éxécutant la fonction getStorageCart
    console.log(productAddToCart);
}

// Fonction qui crée le panier 
function fillLocalStorageCart() {
    localStorage.setItem('_id', "")
}

// Fonction qui réccupère les données dans le localStorage 
function getStorageToCart() {
    // Je lui demande de réccupérer la donnée 'cart' 
    dataFromLocalStorage = localStorage.getItem("cart");
}