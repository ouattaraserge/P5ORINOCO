const productDescription = document.getElementById("description");
const url = "http://localhost:3000/api/cameras/";
const parsedUrl = new URL(window.location.href);
const ProductUrl = parsedUrl.searchParams.get("id");
async function getCameraProducts() {
  try {
    const response = await fetch(url + ProductUrl);

    //Si la réponse est différente 
    if (!response.ok) {
      throw new Error(response.status);
    } else {
      const camera = await response.json();
      return camera;
    }
  } catch (error) {
    console.error(error);
  }
}
getCameraProducts().then((camera) => {
  productDescription.innerHTML += `<div class="cameraDetail">
            <img class="imageProduit" width= "600" src="${
              camera.imageUrl
            }" alt="photo du produit">
              <h3 class="cameraNameProduct">Modèle: ${camera.name}</h3>
              <div class="prix"><p><strong>Prix: ${
                camera.price / 100
              }€</strong></p></div>
              <div class="description"><p>Description: ${
                camera.description
              }</p></div>             
              <div class="choixOptions"></div>
              <div class="choixNbProduits">
                <label for="nbProduits">Quantité de caméra(s)</label>
                <input type="number" id="nbProduits" name="nbProduits"
                min="1" max="5">   
              </div>
        </div>`;

        //choix de lentilles 
  const select = document.getElementById("choix-objectifs");
  
  for (let i = 0; i < camera.lenses.length; i++) {
    let opt = camera.lenses[i];
    select.innerHTML += '<option value="' + opt + '">' + opt + "</option>";
  }
  const ajouterProduit = document.getElementById("boutonAjouter");
  ajouterProduit.addEventListener("click", function () {

    //Récupération de la valeur rentrée 
    const quantity = document.getElementById("nbProduits").value;

    //Vérification nombre de caméras entre 1 et 5
    if (quantity > 0 && quantity <= 5) {

      //On crée l'objet cameraProduit
      const cameraProduct = {
        id: camera._id,
        nom: camera.name,
        image: camera.imageUrl,
        prix: camera.price / 100,
        description: camera.description,
        lenses: camera.lenses,
        quantite: quantity,
      };

      //Détection du support de localStorage
      if (typeof localStorage != "undefined") {

        //Récupération des données du localStorage
        const cameraPack = localStorage.getItem("produit");
        let product;
        let panier = JSON.parse(localStorage.getItem("panier")) || [];
        console.log(panier);
        panier.push(cameraProduct) 
        localStorage.setItem("panier", JSON.stringify(panier));

        //On vérifie si on a des donées dans le localStorage
        if (cameraPack != null) {
          window.alert("Produit ajouté au panier");

          //renvoie sous forme d'objet
          product = JSON.parse(cameraPack);
        } else {
          window.alert("Premier ajout au panier");

          //On initialise sous forme de tableau
          product = [];
        }
        product.push(cameraProduct);

        //on transforme en chaine de texte et on stock dans localStorage
        localStorage.setItem("produit", JSON.stringify(product));
      } else {
        window.alert("localStorage n'est pas supporté");
      }
    } else {
      window.alert("Choisissez une valeur entre 1 et 5");
    }
  });
});