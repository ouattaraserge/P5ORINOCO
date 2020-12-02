const descriptionProduit = document.getElementById("description");
const url = "http://localhost:3000/api/cameras/";
const parsedUrl = new URL(window.location.href);
const urlProduit = parsedUrl.searchParams.get("id");
async function getProduitsCamera() {
  try {
    const response = await fetch(url + urlProduit);

    //Si la réponse est différente 
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
getProduitsCamera().then((data) => {
  descriptionProduit.innerHTML += `<div class="cameraDetail">
            <img class="imageProduit" width= "600" src="${
              data.imageUrl
            }" alt="photo du produit">
              <h3 class="cameraNameProduit">Modèle: ${data.name}</h3>
              <div class="prix"><p><strong>Prix: ${
                data.price / 100
              }€</strong></p></div>
              <div class="description"><p>Description: ${
                data.description
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
  
  for (let i = 0; i < data.lenses.length; i++) {
    var opt = data.lenses[i];
    select.innerHTML += '<option value="' + opt + '">' + opt + "</option>";
  }
  const ajouterProduit = document.getElementById("boutonAjouter");
  ajouterProduit.addEventListener("click", function () {

    //Récupération de la valeur rentrée 

    const quantity = document.getElementById("nbProduits").value;

    //Vérification nombre de caméras entre 1 et 5
    if (quantity > 0 && quantity <= 5) {
      //On crée l'objet cameraProduit
      const cameraProduit = {
        id: data._id,
        nom: data.name,
        image: data.imageUrl,
        prix: data.price / 100,
        description: data.description,
        lentilles: data.lenses,
        quantite: quantity,
      };

      //Détection du support de localStorage
      if (typeof localStorage != "undefined") {
        //Récupération des données du localStorage
        const monobjet_json = localStorage.getItem("produit");
        let produit;
        //On vérifie si on a des donées dans le localStorage
        if (monobjet_json != null) {
          window.alert("Produit ajouté au panier");
          //renvoie sous forme d'objet
          produit = JSON.parse(monobjet_json);
        } else {
          window.alert("Premier ajout au panier");
          //On initialise sous forme de tableau
          produit = [];
        }
        produit.push(cameraProduit);

        //on transforme en chaine de texte et on stock dans localStorage
        localStorage.setItem("produit", JSON.stringify(produit));
      } else {
        window.alert("localStorage n'est pas supporté");
      }
    } else {
      window.alert("Choisissez une valeur entre 1 et 5");
    }
  });
});