const urlProduct = new URL(window.location.href);
console.log(urlProduct);

const apiUrlIdProduct = apiUrl + '/' + urlProduct.searchParams.get("id");
console.log(apiUrlIdProduct);
console.log(urlProduct.searchParams.get("id"));

async function getApiIdProduct() {
    const apiProduct = await getApi(apiUrlIdProduct);
    productExposed(apiProduct)
    console.log(apiProduct);
}

getApiIdProduct();

function addElement () {
    // create a new div element
    const newDiv = document.createElement("div");
  
    // and give it some content
    const newContent = document.createTextNode("Hi there and greetings!");
  
    // add the text node to the newly created div
    newDiv.appendChild(newContent);
  
    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("div1");
    document.body.insertBefore(newDiv, currentDiv);
  }