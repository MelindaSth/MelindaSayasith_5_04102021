// Fonction pour afficher les produits dans le panier

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

  let btnDelete = document.querySelectorAll(".deleteItem");
  for (let i = 0; i < btnDelete.length; i++) {
    btnDelete[i].addEventListener('click', deleteContentCart);
  }

  // Fonction pour le bouton supprimer

  function deleteContentCart(event) {
    const articleToDelete = event.target.closest("article");
    const id = articleToDelete.getAttribute("data-id");
    const color = articleToDelete.getAttribute("data-color");

    getCart();

    cart = cart.filter((cartContent) => !(cartContent.id === id && cartContent.color === color));
    const sectionCartItems = document.getElementById("cart__items");
    sectionCartItems.removeChild(articleToDelete);

    setCart(cart);
    calculateTotalPriceQuantity();
  }

  let inputQuantity = document.querySelectorAll(".itemQuantity");
  for (let i = 0; i < inputQuantity.length; i++) {
    inputQuantity[i].addEventListener('change', changeQuantityCart);
  }

  // Fonction pour le changement de quantité

  function changeQuantityCart(event) {
    const id = event.target.closest("article").getAttribute("data-id");
    const color = event.target.closest("article").getAttribute("data-color");

    getCart();

    for (const cartContent of cart) {
      if (cartContent.id === id && cartContent.color === color) {
        cartContent.quantity = event.target.value;
      }
    }
    setCart(cart);
    calculateTotalPriceQuantity();
  }
}

// Fonction pour calculer les quantités et les prix 

function calculateTotalPriceQuantity() {
  let totalQuantityProduct = 0;
  let totalAmountPrice = 0;

  const sectionItems = document.getElementById("cart__items").children;

  for (const article of sectionItems) {
    const quantity = Number(article.querySelector(".itemQuantity").value);

    totalQuantityProduct = totalQuantityProduct + quantity;

    const priceProduct = Number(article.getAttribute("data-price"));
    const priceContent = article.querySelector(".item__price");

    priceContent.textContent = quantity * priceProduct + " € EUR";

    totalAmountPrice = totalAmountPrice + quantity * priceProduct;
  }
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
      .then(function (product) {
        displayCartProduct(cartContent, product);
        calculateTotalPriceQuantity();
      })
      .catch(function (e) {
        console.error(e.message);
      })
  });
}

async function loadPage() {
  await forEachContent();
  calculateTotalPriceQuantity();
}

loadPage();