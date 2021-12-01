// Fonction pour réccupérer le numéro de commande dans l'URL

function getOrderId() {
    let orderId;
    const getIdOrder = window.location.search;
    const urlSearchParams = new URLSearchParams(getIdOrder);
    if (urlSearchParams.has("order")) {
        orderId = urlSearchParams.get("order");
        return orderId;
    }
}

const orderIdToDisplay = document.getElementById("orderId");
orderIdToDisplay.textContent = getOrderId();

// Mise à jour du panier en l'effaçant

localStorage.clear();