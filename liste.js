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

fetch("http://localhost:3000/api/cameras")
.then(response => response.json()) 
.then(cameras => {
     //console.log(cameras);
    let contentElt = document.getElementById("content");
    cameras.forEach(camera => {
        console.log(camera.imageUrl);
        let imgElt = document.createElement("img");
        imgElt.src = camera.imageUrl;
        contentElt.appendChild(imgElt);     
    });
});