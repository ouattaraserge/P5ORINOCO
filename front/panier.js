const basketContent = JSON.parse(localStorage.getItem("produit"));
const basketProduct = document.getElementById("contenu-donnees");
const finalCheck = document.getElementById("prix-total");
const formul = document.getElementById("formulaire");
if (basketContent) {
  for (const basket of basketContent) {
    basketProduct.innerHTML += `
      <article class="carteProduit">         
          <div class="libelle">
            <img class="imagePanier" src="${basket.image}"
            alt="photo de la caméra">
            <div class="libelle-nom">
              <div class="nomModele">
              <h2>Modèle:<br/> ${basket.nom}</h2>
              </div>
              <div class="lentillesModele">
              <p>Objectif(s): ${basket.lenses}</p>
              </div>             
              <div class="descriptionModele">
              <p>Description: ${basket.description}</p>
              </div>
              <div class="prixModele">
              <p><strong>Prix: ${basket.prix}€</strong></p>
              </div>
              <div class="quantiteModele">
              <p>Quantité: ${basket.quantite}</p>
              </div>
              <div class="prixTotal">
              <p><strong>Prix  modèle(s) par quantité: <br/>
              ${basket.prix * basket.quantite}€</strong></p>
              </div>
            </div>                            
          </div>          
      </article> `;
  }
} else {
  basketProduct.innerHTML = `<p>Votre panier est vide</p>`;
}

//Calcul du prix total avec un accumulateur
const reduced = basketContent.reduce(
  (accumulateur, value) => accumulateur + value.prix * value.quantite,0
);
finalCheck.innerHTML = `<p>Prix total :<br/> ${reduced}€</p>`;
formul.innerHTML = `
      <h3>Formulaire de contact</h3>
                <form id="formulaire-form">
                    <div class="prenom">
                        <label for="prenom">Prénom: </label>
                        <input name="prenom" id="prenom" type="text"
                        pattern="[A-Za-z-éè ]{2,25}"
                        title="Veuillez entrer uniquement des lettres" required>
                    </div>
                    <div class="nom">
                        <label for="nom">Nom: </label>
                        <input name="nom" id="nom" type="text"
                        pattern="[A-Za-z-éè ]{2,25}"
                        title="Veuillez entrer uniquement des lettres" required>
                    </div>
                    <div class="adresse">
                        <label for="adresse">Adresse: </label>
                        <input name="adresse" id="adresse" type="text"
                        pattern="[A-Za-z0-9- éè]{5,40}" required>
                    </div>
                    <div class="ville">
                        <label for="ville">Ville: </label>
                        <input name="ville" id="ville" type="text"
                        pattern="[A-Za-z-éè ]{1,25}"
                        title="Veuillez entrer uniquement des lettres" required>
                    </div>
                    <div class="email">
                        <label for="email">Entrez votre email: </label>
                        <input name="email" id="email" type="email" required>
                    </div><br/>
                    <div class="boutonValidation">
                        <input type="submit" value="Envoi commande">
                    </div>
                </form>  
                <button id="boutonInit">Vider panier</button>
                `;
//On récupère les données du formulaire lors du click sur le bouton
formul.addEventListener("submit", function (event) {
  //Pour eviter que le navigateur n'appelle l'événement par défaut
  event.preventDefault();
  const firstName = document.getElementById("prenom").value;
  const lastName = document.getElementById("nom").value;
  const address = document.getElementById("adresse").value;
  const city = document.getElementById("ville").value;
  const email = document.getElementById("email").value;
  const contact = {
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    email: email,
  };
  //On ajoute dans le tableau
  const products = basketContent.map((basket) => {
    return basket.id;
  });
  async function postContactProduct() {
    try {
      const response = await fetch("http://localhost:3000/api/cameras/order", {
        method: "POST",
        body: JSON.stringify({ contact, products }),
        headers: new Headers({ "Content-Type": "application/json" }),
      });
      if (response.ok) {
        const responseData = await response.json();
        return responseData;
      } else {
        console.error("Status: " + response.status);
      }
    } catch (error) {
      console.error(error);
    }
  }
  const form = document.getElementById("formulaire-form");
  postContactProduct().then((responseData) => {
    //On vérifie le formulaire
    if (!form.checkValidity()) {
      window.alert("Erreur de saisie");
    } else {
      const productOrderId = responseData.orderId;
      const productOrderTotalCoast = reduced;
      //vidage du panier
      localStorage.clear();
      const productOrderTotal = { productOrderId, productOrderTotalCoast };
      localStorage.setItem("orderFinal", JSON.stringify(productOrderTotal));
      const confirmation = localStorage.getItem("orderFinal");
      if (confirmation) {
        window.location = "confirmation.html";
        window.alert("Envoi vers la page de confirmation");
      } else {
        window.alert("Pas de confirmation possible");
      }
    }
  });
});
//Mise à zéro du panier
const init = document.getElementById("boutonInit");
init.addEventListener("click", function () {
  if (confirm("Voulez-vous vider votre panier ?")) {
    localStorage.clear();
    //Recharge la page
    location.reload();
  }
});