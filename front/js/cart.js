function displayCartProduct(cartContent, product) {
  document.title = 'Panier';

  let itemCardToDisplay = document.querySelector("#cart__items");
  itemCardToDisplay.innerHTML += `<article class="cart__item" data-id="${cartContent.id}" data-color="${cartContent.color}" data-price="${product.price}"/>
                                  <div class="cart__item__img">
                                  <img src="${product.imageUrl}" alt="${product.altTxt}">
                                  </div>
                                  <div class="cart__item__content">
                                  <div class="cart__item__content__titlePrice">
                                  <h2>${product.name}</h2>
                                  <p class="item__price">${product.price} €</p>
                                  </div>
                                  <div class="cart__item__content__settings">
                                  <div class="cart__item__content__settings__quantity">
                                  <p>Qté : </p>
                                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartContent.quantity}">
                                  </div>
                                  <div class="cart__item__content__settings__delete">
                                  <p class="deleteItem">Supprimer</p>
                                  </div>
                                  </div>
                                  </div>
                                  </article>`

  // Je fais une boucle pour appliqué l'évènement sur l'ensemble des boutons 'supprimer'
  let btnDelete = document.querySelectorAll(".deleteItem");
  for (let i = 0; i < btnDelete.length; i++) {
    btnDelete[i].addEventListener('click', deleteContentCart);
  }

  // Supprimer un élément au 'click'

  function deleteContentCart(event) {
    // event.target se réfère à l'élément 'article' cliqué
    // closest() renvoie l'ancêtre le + proche de l'élément "article"
    const articleToDelete = event.target.closest("article");
    // Je définie id & color en allant chercher les infos dans l'html 
    const id = articleToDelete.getAttribute("data-id");
    const color = articleToDelete.getAttribute("data-color");

    // Je réccupère mon 'cart'
    getCart();

    // cart = filtre 'cart' et renvoie un nouveau tableau, il faut que le contenu (id + couleur) soient différent que l'élément ciblé 
    cart = cart.filter((cartContent) => !(cartContent.id === id && cartContent.color === color));
    const sectionCartItems = document.getElementById("cart__items");
    // J'efface au click l'élément ciblé 
    sectionCartItems.removeChild(articleToDelete);

    // MAJ du localStorage
    setCart(cart);
    // MAJ des calcules prix et quantité
    calculateTotalPriceQuantity();
  }

  // Je fais une boucle pour appliqué l'évènement sur l'ensemble des boutons des 'input'
  let inputQuantity = document.querySelectorAll(".itemQuantity");
  for (let i = 0; i < inputQuantity.length; i++) {
    // 'change' est déclenché pour les input, lors d'un changement de valeur est réalisé par l'user
    inputQuantity[i].addEventListener('change', changeQuantityCart);
  }

    // Changement de Quantité

  function changeQuantityCart(event) {
    // event.target se réfère à l'élément 'article' cliqué
    // closest() renvoie l'ancêtre le + proche de l'élément "article"
    // Je définie id & color en allant chercher les infos dans l'html 
    const id = event.target.closest("article").getAttribute("data-id");
    const color = event.target.closest("article").getAttribute("data-color");

    // Je réccupère mon 'cart'
    getCart();

    for (const cartContent of cart) {
      // Si l'id + color de cartContent sont === à l'id + color de html
      if (cartContent.id === id && cartContent.color === color) {
        // Alors la quantité de cartContent === la valeur de l'input ciblé lors de l'évènement 
        cartContent.quantity = event.target.value;
      }
    }
    // MAJ du localStorage
    setCart(cart);
    // MAJ des calcules prix et quantité
    calculateTotalPriceQuantity();
  }
}

// Je calcule les quantités au total et les prix 

function calculateTotalPriceQuantity() {
  // Je définie en 'nombre' ce que je souhaite afficher
  let totalQuantityProduct = 0;
  let totalAmountPrice = 0;

  // children = renvoie tout les enfants de l'élément
  const sectionItems = document.getElementById("cart__items").children;

  for (const article of sectionItems) { 
    // Number(valeur) ici value de l'input ayant pour className "itemQuantity" 
    const quantity = Number(article.querySelector(".itemQuantity").value); 
    // console.log(quantity);
    
    totalQuantityProduct = totalQuantityProduct + quantity;
    // console.log(totalQuantityProduct);

    // Number(valeur) ici l'attribut data-price de l'article
    const priceProduct = Number(article.getAttribute("data-price"));
    // console.log(priceProduct);

    // Je réccupère l'élément dans html
    const priceContent = article.querySelector(".item__price");
    // console.log(priceContent);

    // textContent de priceContent devient quantity * priceProduct + " € EUR" // 2 x 10 = 20 € EUR
    priceContent.textContent = quantity * priceProduct + " € EUR";
    // console.log(priceContent.textContent);
    
    totalAmountPrice = totalAmountPrice + quantity * priceProduct;
    // console.log(totalAmountPrice);
  }
  // textContent de #totalQuantity et #totalPrice = résultats
  document.querySelector("#totalQuantity").textContent = totalQuantityProduct;
  document.querySelector("#totalPrice").textContent = totalAmountPrice;
}


let cart = localStorage.getItem("cart");
if (cart) {
  cart = JSON.parse(cart);
} else {
  console.log("le cart est vide")
  alert('Votre panier est vide, retour à la page d\'accueil pour faire votre choix');
  document.location.href = `index.html`;
}

async function forEachContent() {
  cart.forEach(cartContent => { 
    fetch("http://localhost:3000/api/products/" + cartContent.id)
    .then((response) => {
    if (response.ok) return response.json();
    })
    .then(function(product) {
    // console.log(product);
    displayCartProduct(cartContent, product);
    calculateTotalPriceQuantity();
    })
    .catch(function(e) {
    console.error(e.message);
    })
  });
}

async function loadPage() {
  await forEachContent();
  calculateTotalPriceQuantity();
}

loadPage();