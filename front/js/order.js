// Fonction pour vérifier les chaînes de caractères 

function firstNameCheck() {
    let firstName = document.querySelector("#firstName");
    let firstNameValue = firstName.value;
    let firstNameRegex = /^[A-Za-záÁàÀâÂäÄãÃåÅæÆçÇéÉèÈêÊëËíÍìÌîÎïÏñÑóÓòÒôÔöÖõÕøØœŒßúÚùÙûÛüÜ -]+$/;
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

    if (firstNameValue == "") {
        firstNameErrorMsg.textContent = "Veuillez renseigner votre prénom";
    } else if (!firstNameRegex.test(firstNameValue)) {
        firstNameErrorMsg.textContent = "Votre prénom ne doit pas contenir de chiffre";
    } else {
        firstNameErrorMsg.textContent = "";
        return firstNameValue;
    }
}
firstName.addEventListener("input", firstNameCheck);

function lastNameCheck() {
    let lastName = document.querySelector("#lastName");
    let lastNameValue = lastName.value;
    let lastNameRegex = /^[A-Za-záÁàÀâÂäÄãÃåÅæÆçÇéÉèÈêÊëËíÍìÌîÎïÏñÑóÓòÒôÔöÖõÕøØœŒßúÚùÙûÛüÜ -]+$/;
    let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");

    if (lastNameValue == "") {
        lastNameErrorMsg.textContent = "Veuillez renseigner votre nom";
    } else if (!lastNameRegex.test(lastNameValue)) {
        lastNameErrorMsg.textContent = "Votre nom ne doit pas contenir de chiffre";
    } else {
        lastNameErrorMsg.textContent = "";
        return lastNameValue;
    }
}
lastName.addEventListener("input", lastNameCheck);

function addressCheck() {
    let address = document.querySelector("#address");
    let addressValue = address.value;
    let addressRegex = /^[A-Za-záÁàÀâÂäÄãÃåÅæÆçÇéÉèÈêÊëËíÍìÌîÎïÏñÑóÓòÒôÔöÖõÕøØœŒßúÚùÙûÛüÜ 0-9-,]+$/;
    let addressErrorMsg = document.querySelector("#addressErrorMsg");

    if (addressValue == "") {
        addressErrorMsg.textContent = "Adresse requise";
    } else if (!addressRegex.test(addressValue)) {
        addressErrorMsg.textContent = "Veuillez supprimer les caractères spéciaux";
    } else {
        addressErrorMsg.textContent = "";
        return addressValue;
    }
}
address.addEventListener("input", addressCheck);

function cityCheck() {
    let city = document.querySelector("#city");
    let cityValue = city.value;
    let cityRegex = /^[A-Za-záÁàÀâÂäÄãÃåÅæÆçÇéÉèÈêÊëËíÍìÌîÎïÏñÑóÓòÒôÔöÖõÕøØœŒßúÚùÙûÛüÜ -]+$/;
    let cityErrorMsg = document.querySelector("#cityErrorMsg");

    if (cityValue == "") {
        cityErrorMsg.textContent = "Ville requise";
    } else if (!cityRegex.test(cityValue)) {
        cityErrorMsg.textContent = "Veuillez supprimer les caractères spéciaux";
    } else {
        cityErrorMsg.textContent = "";
        return cityValue;
    }
}
city.addEventListener("input", cityCheck);

function emailCheck() {
    let email = document.querySelector("#email");
    let emailValue = email.value;
    let emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
    let emailErrorMsg = document.querySelector("#emailErrorMsg");

    if (emailValue == "") {
        emailErrorMsg.textContent = "Renseignez votre adresse mail";
    } else if (!emailRegex.test(emailValue)) {
        emailErrorMsg.textContent = "Adresse mail non valide";
    } else {
        emailErrorMsg.textContent = "";
        return emailValue;
    }
}
email.addEventListener("input", emailCheck);

function placeOrder() {
    const firstName = firstNameCheck();
    const lastName = lastNameCheck();
    const address = addressCheck();
    const city = cityCheck();
    const email = emailCheck();

    if (firstName && lastName && address && city && email) {

        let allIdProductInOrder = cart.map((cart) => {
            return cart.id;
        })

        const data = { contact: { firstName, lastName, address, city, email, }, products: allIdProductInOrder };

        saveOrder(data);

    } else {
        console.log("Le formulaire est incomplet");
    }
}

const submitBtn = document.querySelector("#order");
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    placeOrder();
});

// Fonction pour sauvegarder la commande 

function saveOrder(data) {
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (response.ok) return response.json();
        })
        .then((data) => {
            document.location.href = `confirmation.html?order=${data.orderId}`;
        })
        .catch(e => console.error(e.message));
}