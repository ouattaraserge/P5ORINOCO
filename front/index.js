const objectApi = document.getElementById("cameras");
const url = "http://localhost:3000/api/cameras";
async function getProduits() {
  try {
    const response = await fetch(url);
    //Si la réponse est différente de ok, on génére une exception
    if (!response.ok) {
      throw new Error(response.status);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}
getProduits()
  .then((data) => {
    console.log(data);
    data.forEach((camera) => {
      objectApi.innerHTML += `<article class="produitCamera">
              <a href="produit.html?id=${camera._id}">
               <img class="imageCamera" width= "400"  src="${
                 camera.imageUrl
               }" alt="photo de la caméra" >
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
