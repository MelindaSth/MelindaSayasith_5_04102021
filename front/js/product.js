// Fonction pour afficher le produit et son détail
function displayDetailsProduct(product) {
  document.title = `${product.name}`;
  document.querySelector('#title').innerHTML = `${product.name}`;
  let img = `<img src="${product.imageUrl}" alt="${product.altTxt}"/>`
  // document.querySelector('.item_img).innerHTML = img;
  document.getElementsByClassName('item__img')[0].innerHTML = img;
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

// Fonction pour ajouter au panier
function addToCartOnClick() {
  // Je définie l'objet dans lequel je retrouve l'id, la couleur et la quantité 
  const productToAddToCart = {
    id: idProduct,
    color: document.getElementById("colors").value,
    quantity: Number(document.getElementById("quantity").value),
  };
  // Je converti la valeur JS en chaîne JSON 
  const userChoiceStringify = JSON.stringify(productToAddToCart);
  localStorage.setItem("cart", userChoiceStringify);
  console.log(JSON.stringify(productToAddToCart));
  // J'analyse la chaîne de caractère JSON et construit la valeur en JS 
  console.log(JSON.parse(userChoiceStringify));
}

// Quand l'user clique sur le bouton, la fonction addToCartOnCLick s'exécute 
const button = document.querySelector("#addToCart");
button.addEventListener("click", addToCartOnClick)

  // Je réccupère dans l'url l'id du produit
const getIdProduct = window.location.search;
// Je crée et renvoie le nouvel url
const urlSearchParams = new URLSearchParams(getIdProduct);
// Méthode get de URLSearchParams, renvoie la valeur recherchée
const idProduct = urlSearchParams.get("id");

fetch("http://localhost:3000/api/products/" + idProduct)
  .then((response) => {
    if (response.ok) return response.json();
  })
  .then(function(product) {
    displayDetailsProduct(product);
  })
  .catch(function(e) {
    console.error(e.message);
  })