// Fonction qui réccupère l'id du produit affiché 

function getCurrentIdProduct() {
  let idProduct;
  const getIdProduct = window.location.search;
  const urlSearchParams = new URLSearchParams(getIdProduct);
  if (urlSearchParams.has("id")) {
    idProduct = urlSearchParams.get("id");
    return idProduct;
  }
}

let cart = [];

// Fonction pour afficher le produit et son détail

function displayDetailsProduct(product) {
  document.title = product.name;
  document.querySelector('#title').innerHTML = product.name;
  let img = `<img src="${product.imageUrl}" alt="${product.altTxt}"/>`
  document.querySelector('.item__img').innerHTML = img;
  document.querySelector('#price').innerHTML = product.price;
  document.querySelector('#description').innerHTML = product.description;
  let colors = product.colors
  let options = document.getElementById('colors')
  for (var i = 0; i < colors.length; i++) {
    let option = document.createElement('option')
    option.value = colors[i]
    option.innerHTML = colors[i]
    options.appendChild(option)
  }
}

// Fonction qui crée le panier 

function saveProductDetailsForCart(product) {
  let userChoiceArray = {
    id: getCurrentIdProduct(),
    color: document.getElementById("colors").value,
    quantity: Number(document.getElementById("quantity").value),
  }
  if (userChoiceArray.quantity < 1) {
    alert("Veuillez indiquer une quantité");
    return;
  }
  else if (userChoiceArray.quantity > 100) {
    alert("Veuillez indiquer une quantité inférieur à 100");
    return;
  }
  if (userChoiceArray.color == "") {
    alert("Veuillez choisir une couleur");
    return;
  }
  return userChoiceArray;
}

// Fonction pour ajouter au panier

function addToCartOnClick() {
  const currentProduct = saveProductDetailsForCart();
  const currentCart = localStorage.getItem("cart");
  let cart = [];
  if (currentCart) {
    cart = JSON.parse(currentCart);

    let test = cart.findIndex(el => el.id == currentProduct.id && el.color == currentProduct.color);
    console.log("La position de cet élément est ", test);
    if (test >= 0) {
      const newQuantity = cart[test].quantity += currentProduct.quantity;
      console.log("Votre canapé de couleur ", currentProduct.color, " a maintenant une quantité de ", newQuantity);
    } else {
      console.log("Vous avez ajouté un nouveau canapé dans votre panier");
      cart.push(currentProduct);
    }


  } else {
    cart.push(currentProduct);
  }
  setCart(cart);
}

// Quand l'user clique sur le bouton, la fonction addToCartOnCLick s'exécute 

const button = document.querySelector("#addToCart");
button.addEventListener("click", addToCartOnClick)

fetch("http://localhost:3000/api/products/" + getCurrentIdProduct())
  .then((response) => {
    if (response.ok) return response.json();
  })
  .then(function (product) {
    displayDetailsProduct(product);
    return product;
  })
  .catch(function (e) {
    console.error(e.message);
  })