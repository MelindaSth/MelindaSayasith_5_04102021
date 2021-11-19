function getOrderId() {
    let orderId;
    // Je réccupère dans l'url l'id de la commande
    const getIdOrder = window.location.search;
    // Je crée et renvoie de nouvel url
    const urlSearchParams = new URLSearchParams(getIdOrder);
    // Méthode get de URLSearchParams, renvoie la valeur recherchée
    if (urlSearchParams.has("order")) {
    orderId = urlSearchParams.get("order");
    return orderId;
    }
}

const orderIdToDisplay = document.getElementById("orderId");
orderIdToDisplay.textContent = getOrderId();

// J'efface le localStorage
localStorage.clear();