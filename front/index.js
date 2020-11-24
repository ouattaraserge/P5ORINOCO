/*const Camera = require("./models/Camera");

const choixCameras = document.getElementById("cameras");
Camera.getAllCamera().then(data => {
    for(let i in data) {
        const sectionCamera = document.createElement("section");
        sectionCamera.setAttribute('id', data[i].id);
        choixCameras.appendChild(sectionCamera);
        const createLink.setAttribute = document.createElement('a');
        createLink.setAttribute('href', "produit.html?id=" + data[i].id);
        sectionCamera.appendChild(createLink);
        createLink.innerHTML += ('<img src' + data[i].image + '> <p>' + data[i].prix + 'EUROS<p> <li>' + data[i].nom + '</li> <br> <hr>');

    }
});*/
/*
send request
GET http://localhost:3000/api/cameras
###
send request
GET http://localhost:3000/api/cameras/5be1ed3f1c9d44000030b061



const { connection } = require("mongoose");*/

/*fetch("http://localhost:3000/api/cameras")
.then(response => response.json()) 
.then(cameras => {
     //console.log(cameras);
    let contentElt = document.getElementById("content");
    cameras.forEach(camera => {
       console.log(camera);
       let div = document.createElement("div");
       
        let imgElt = document.createElement("img");
        imgElt.src = camera.imageUrl;

        contentElt.appendChild(imgElt); 
        let nameElt = document.createElement('p');
        nameElt.textContent = camera.name;
        contentElt.appendChild(nameElt)   
    });
});*/

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
