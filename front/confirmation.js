const contentOrder = JSON.parse(localStorage.getItem("orderFinal"));
const textOrder = document.getElementById("resultatOrder");
textOrder.innerHTML += `<h2>Récapitulatif de commande</h2>
    <div class="recapitulatif">
        <div class="identifiant">
            <p><strong>Commande numéro:</strong><br/>
            ${contentOrder.productOrderId}</p>
        </div><br/>
        <div class="cout">
           <p><strong>Total de votre commande:</strong><br/>
           ${contentOrder.productOrderTotalCoast} €</p>
        </div>
    </div>
    <div class="remerciements">
        <p>Merci votre commande</p>
    </div>`;
