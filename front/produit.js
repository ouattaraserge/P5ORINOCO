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
  productDescription.innerHTML += `<div class="cameraDetail">
            <img class="imageProduit" width= "600" src="${camera.imageUrl}  " alt="photo du produit">
              <h3 class="cameraNameProduct">Modèle: ${camera.name}</h3>
              <div class="prix"><p><strong>Prix: ${camera.price / 100}€</strong></p>
              </div>
              <div class="description"><p>Description: ${camera.description}</p>
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

  const addButton = document.getElementById("boutonAjouter");

  addButton.addEventListener("click", function () {
    let quantity = parseInt(document.getElementById("nbProduits").value);

    //Vérification nombre de caméras entre 1 et 5
    if (quantity > 0 && quantity <= 5) {
      //On crée l'objet cameraProduit
      let cameraProduct = {
        id: camera._id,
        nom: camera.name,
        image: camera.imageUrl,
        prix: (camera.price * quantity) / 100,
        description: camera.description,
        lenses: camera.lenses,
        quantite: quantity,
      };

      //Détection du support de localStorage
      if (typeof localStorage != "undefined") {
        //Récupération des données du localStorage

        addProduct(cameraProduct);

        window.alert("Produit ajouté au panier");
      } else {
        window.alert("localStorage n'est pas supporté");
      }
    } else {
      window.alert("Choisissez une valeur entre 1 et 5");
    }
  });
});

//Quantité dans le panier

function addProduct(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === product.id) {
      cart[i].quantite += product.quantite;
      localStorage.setItem("cart", JSON.stringify(cart));
      return;
    }
  }
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
}
