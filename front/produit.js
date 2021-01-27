   
  
//Affichage de la page produit seul

const productDescription = document.getElementById("description");
const url = "http://localhost:3000/api/cameras/";
const parsedUrl = new URL(window.location.href);
const ProductUrl = parsedUrl.searchParams.get("id");
async function getCameraProducts() {
  try {
    const response = await fetch(url + ProductUrl);
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

//Affichage du produit et ses caracteristiques

getCameraProducts().then((camera) => {
  productDescription.innerHTML +=
   `<div class="cameraDetail">
            <img class="imageProduit" width= "600" src="${camera.imageUrl}  " alt="photo du produit">
              <h3 class="cameraNameProduct">Modèle: ${camera.name}</h3>
              <div class="prix"><p><strong>Prix: ${ camera.price / 100 }€</strong></p>
              </div>
              <div class="description"><p>Description: ${ camera.description}</p>
              </div>             
              <div class="choixOptions">
              </div>
              <div class="choixNbProduits">
                <label for="nbProduits">Quantité de caméra(s)</label>
                <input type="number" id="nbProduits" name="nbProduits"
                min="1" max="5">   
              </div>
    </div>`;
  

//Choix de lentilles 
  
  let select = document.getElementById("choix-objectifs");
  for (let i = 0; i < camera.lenses.length; i++) {
    let opt = camera.lenses[i];
    select.innerHTML += '<option value="' + opt + '">' + opt + "</option>";
  }

//Creation du bouton "Ajouter"
  
  const addProduct = document.getElementById("boutonAjouter");

  addProduct.addEventListener("click", function () {
    
    let quantity = parseInt(document.getElementById("nbProduits").value);
    
  
//Vérification nombre de caméras entre 1 et 5
    if (quantity > 0 && quantity <= 5) {

//On crée l'objet cameraProduit
      let cameraProduct = {
        id: camera._id,
        nom: camera.name,
        image: camera.imageUrl,
        prix: camera.price * quantity / 100,
        description: camera.description,
        lenses: camera.lenses,
        quantite:quantity,
      };

//Détection du support de localStorage
      if (typeof localStorage != "undefined") {

//Récupération des données du localStorage
        let cameraPack = localStorage.getItem("product");
        let product;
        let basket = JSON.parse(localStorage.getItem("panier")) || [];
        console.log(basket);
        basket.push(cameraProduct) 

        //localStorage.setItem("panier", JSON.stringify(basket));

//fonction ajouter produit
      

//On vérifie si on a des données dans le localStorage
        
        if (cameraPack != null) {

          window.alert("Produit ajouté au panier");

//Sinon ajout du produit dans le panier
          product = JSON.parse(cameraPack);

          for (let i = 0; i < product.length; i++) {
            if (product[i].id === cameraProduct.id) {
              product[i].quantite += cameraProduct.quantite;
                return 
            }
          }

          product.push(cameraProduct);
        

        } else {
          window.alert("Ajout au panier");

//On initialise ici dans un tableau
          product = [];

          product.push(cameraProduct);
        }


//On stock ici dans localStorage
        localStorage.setItem("product", JSON.stringify(product));
      
      } else {
        window.alert("localStorage n'est pas supporté");
      }
    } else {
      window.alert("Choisissez une valeur entre 1 et 5");
    }
  });
});