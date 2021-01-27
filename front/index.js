//Récupération des données depuis le serveur

const objectFromWeb = document.getElementById("cameras");
const url = "http://localhost:3000/api/cameras";
async function getProducts() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.status);
    } else {
      const data = await response.json();
      return data;
    }
  }
  catch (error) {
    console.error(error);
  }
}

//Récupération des produits avec leurs caractéristiques

getProducts()
  .then((data) => {
    console.log(data);
    data.forEach((camera) => {
      objectFromWeb.innerHTML += `<article class="produitCamera">
          <a href="produit.html?id=${camera._id}">
            <img class="imageCamera" width= "400"  src="${camera.imageUrl}
            " alt="photo de la caméra" >
            <div class="reference">
                <h2>Modèle: ${camera.name}</h2>
                <p>Prix: ${camera.price / 100}€</p>
            </div>
          </a>
      </article>`;
    });
  })

  .catch((error) => {
    console.error(error);
  });

