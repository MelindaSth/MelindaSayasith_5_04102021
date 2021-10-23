// Je définie l'url du 'product'
const urlProduct = new URL(window.location.href);
console.log(urlProduct);

// Je réccupère dans l'url l'id du produit
const getIdProduct = window.location.search;
console.log(getIdProduct);

// Je crée et renvoie le nouvel url
const urlSearchParams = new URLSearchParams(getIdProduct);
console.log(urlSearchParams);

// Méthode get de URLSearchParams, renvoie la valeur recherchée
const idProduct = urlSearchParams.get("id");
console.log(idProduct);

// Je  définie l'url de l'API Produit 
const apiUrlProduct = "http://localhost:3000/api/products" + "/" + idProduct;  
console.log(apiUrlProduct);

fetch("http://localhost:3000/api/products/" + idProduct)
  .then((response) => {
    if (response.ok) return response.json();
  })
  .then(function(product) {
    console.log(product);
    displayDetailsProduct(product);
  })
  .catch(function(e) {
    console.error(e.message);
  })
  
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
    console.log(colors);
    let options = document.getElementById('colors')
    for (var i = 0; i < colors.length; i++) {
      let option = document.createElement('option')
      option.value = colors[i]
      option.innerHTML = colors[i]
      options.appendChild(option)
    }
  }