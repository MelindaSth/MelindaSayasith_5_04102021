// Fonction qui réccupère l'id du produit affiché 
function getCurrentIdProduct() {
  let idProduct;
  // Je réccupère dans l'url l'id du produit
  const getIdProduct = window.location.search;
  // Je crée et renvoie le nouvel url
  const urlSearchParams = new URLSearchParams(getIdProduct);
  // Méthode get de URLSearchParams, renvoie la valeur recherchée
  if (urlSearchParams.has("id")) {
    idProduct = urlSearchParams.get("id");
    return idProduct;
  }
}

let cart = []; 

// Fonction pour afficher le produit et son détail
function displayDetailsProduct(product) {
  document.title = `${product.name}`; // product.name
  document.querySelector('#title').innerHTML = `${product.name}`;
  let img = `<img src="${product.imageUrl}" alt="${product.altTxt}"/>`
  document.querySelector('.item__img').innerHTML = img;
  document.querySelector('#price').innerHTML = `${product.price}`;
  document.querySelector('#description').innerHTML = `${product.description}`;
  // let colors = `${product.colors}`
  let colors = product.colors
  let options = document.getElementById('colors')
   for (var i = 0; i < colors.length; i++) {
     let option = document.createElement('option')
    option.value = colors[i]
    option.innerHTML = colors[i]
    options.appendChild(option)
   }
  // Méthode for of 
    // for (const color of colors) {
    //   options.innerHTML += `<option value="${color}">${color}</option>`
    // }

  // Méthode forEach
    // colors.forEach(color => {
    //   options.innerHTML += `<option value="${color}">${color}</option>`
    // });
}

// Fonction qui crée le panier 
function saveProductDetailsForCart() {
  // Je définie l'objet dans lequel je retrouve l'id, la couleur et la quantité 
  let userChoiceArray = {
  id: getCurrentIdProduct(),
  color: document.getElementById("colors").value,
  quantity: Number(document.getElementById("quantity").value),
  }
  // Si la quantité est strictement inférieur à 1
  if (userChoiceArray.quantity < 1) {
    // Affiche un dialogue d'alerte contenant le texte spécifié
    alert("Veuillez indiquer une quantité");
    return;
  } 
  // Si la quantité est supérieur à 100
  else if (userChoiceArray.quantity > 100) {
    // Affiche un dialogue d'alerte contenant le texte spécifié 
    alert("Veuillez indiquer une quantité inférieur à 100");
    return;
  }
  // Si la couleur est égal à "" (rien)
  if (userChoiceArray.color == "") {
    // Affiche un dialogue d'alerte contenant le texte spécifié 
    alert("Veuillez choisir une couleur");
    return;
  }
  // const cart = [productToAddToCart];
  // console.log(cart);
  return userChoiceArray;
}

// Fonction localStorage setItem
function setCart(cart) {
localStorage.setItem("cart", JSON.stringify(cart));
alert("le produit a bien été ajouté au panier");
}

// Fonction pour ajouter au panier
function addToCartOnClick() {
  const currentProduct = saveProductDetailsForCart();
  const currentCart = localStorage.getItem("cart");
  let cart = [];
  // Si le currentCart existe
  if (currentCart) {
    // cart = à currentCart formaté en JS
    cart = JSON.parse(currentCart);
    // Je renvoie l'indice du 1er élément de mon objet [cart] avec une condition, ici id & couleur = exactement les mêmes 
    let test = cart.findIndex(el => el.id == currentProduct.id && el.color == currentProduct.color);
    console.log(test); // Renvoie l'indice / Si la fonction renvoie faux alors le résultat vaut -1
    // Si l'indice est supérieur ou égale à 0
    if (test >= 0) {
      // Je définie la nouvelle quantité // cart[test] est égale à cart[indice]
      const newQuantity = cart[test].quantity += currentProduct.quantity;
      // Console.log pour m'aider à visualiser
      console.log("Votre canapé de couleur ", currentProduct.color, " a une quantité de ", newQuantity);
    } else {
      // Sinon, si test = -1 alors tu pish dans 'cart' le 'currentProduct'
      cart.push(currentProduct);
    }
  } else {
  // 'cart' n'existe pas alors je push dans 'cart' 'currentProduct'
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
  .then(function(product) {
    displayDetailsProduct(product);
  })
  .catch(function(e) {
    console.error(e.message);
  })