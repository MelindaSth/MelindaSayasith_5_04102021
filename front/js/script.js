// Je définie l'url de l'API
const apiUrl = "http://localhost:3000/api/products";

// Fontion pour réccupérer le bon url
async function getApi(url) {
    // Je définie une "promise" qui utilise la méthode fetch pour lire un url
    const dataPromise = fetch(url)
    // Puis quand tu as la "reponse" 
    .then((response) => {
        // Si "reponse" ok alors tu formates en Json et tu renvoies la donnée
        if(response.ok) return response.json();
    })
    // Si non ok tu attrapes la "reponse" et tu renvoies message d'erreur 
    .catch(e => console.error(e.message));
    // Tu mets fin à la fonction et tu renvoies la promise 
    return dataPromise;
}