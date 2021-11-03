let cart = JSON.parse(localStorage.getItem("cart"));

for (currentCart of cart) {
  console.log(currentCart);
}

function displayProductInLocalStorage(currentCart, product) {
  document.title = 'Panier';
  
  let htmlCart = "";
  let html;
  const detailsCart = JSON.parse(localStorage.getItem("cart"));
  console.log(detailsCart);
  for (var i = 0; i < cart.length; i++) {
  html = `<article class="cart__item" data-id="${currentCart.id}" data-color="${currentCart.color}"/>
            <div class="cart__item__img">
              <img src="${product[i].imageUrl}" alt="${product[i].altTxt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__titlePrice">
                  <h2>${product[i].name}</h2>
                  <p>${product[i].price} €</p>
              </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${currentCart.quantity}">
                  </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>`
          htmlCart += html; 
  }
  let cartElement = document.querySelector("#cart__items");
  cartElement.innerHTML = htmlCart;

  let btnDelete = document.querySelector(".deleteItem");
  btnDelete.addEventListener("click", deleteItem);

  function deleteItem(event) {
    const article = event.target.closest("article");
    const id = article.getAttribute("data-id");
    const color = article.getAttribute("data-color");

    let cart = JSON.parse(localStorage.getItem("cart"));
    let testFind = cart.findIndex(el => el.id == id && el.color == color);
    console.log("La position de cet élément est ", testFind);
    if (testFind) {
      const sectionToFocus = document.getElementById('cart__items');
        sectionToFocus.removeChild(article);
    }
  }
}

fetch("http://localhost:3000/api/products/")
  .then((response) => {
    if (response.ok) return response.json();
  })
  .then(function(product) {
    displayProductInLocalStorage(currentCart, product);
    return product;
  })
  .catch(function(e) {
    console.error(e.message);
  })