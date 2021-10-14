/**
 * Download data from the specified URL.
 * @const apiUrl
 * @async
 * @function getApi
 * @param {string} url - The URL to download from.
 * @return {Promise<string>} The data from the URL.
 */

const apiUrl = "http://localhost:3000/api/products";

async function getApi(url) {
    const dataPromise = window.fetch(url)
    .then((response) => {
        if(response.ok) return response.json();
    })
    .then((data) => data)
    .catch(e => console.error(e.message));
    return dataPromise;
}

// fetch('http://localhost:3000/api/products')
//     .then(function (response) {
//         return response.json()
//     }).then(function (data) {
//         console.log(data)
//     })

// fetch('http://localhost:3000/api/products/')
//     .then(response => response.json()).then(console.log).then
