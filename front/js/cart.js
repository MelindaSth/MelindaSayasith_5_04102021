function displayCartProduct(cartContent, product) {
  let itemCardToDisplay = document.querySelector("#cart__items");
  itemCardToDisplay.innerHTML += `<article class="cart__item" data-id="${cartContent.id}" data-color="${cartContent.color}"/>
                                  <div class="cart__item__img">
                                  <img src="${product.imageUrl}" alt="${product.altTxt}">
                                  </div>
                                  <div class="cart__item__content">
                                  <div class="cart__item__content__titlePrice">
                                  <h2>${product.name}</h2>
                                  <p>${product.price} €</p>
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
}

let cart = localStorage.getItem("cart");
if (cart) {
  cart = JSON.parse(cart);
  // console.log(cart);
}
cart.forEach(cartContent => {
  fetch("http://localhost:3000/api/products/" + cartContent.id)
  .then((response) => {
  if (response.ok) return response.json();
  })
  .then(function(product) {
  // console.log(product);
  displayCartProduct(cartContent, product);
  })
  .catch(function(e) {
  console.error(e.message);
  })
});