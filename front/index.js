

fetch("http://localhost:3000/api/cameras")
.then(response => response.json()) 
.then(cameras => {
    // console.log(cameras);
    let contentElt = document.getElementById("content");
    cameras.forEach(camera => {
        console.log(camera.imageUrl);
        let imgElt = document.createElement("img");
        imgElt.src = camera.imageUrl;
        contentElt.appendChild(imgElt);     
    });
});