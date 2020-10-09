
fetch("http://localhost:3000/api/cameras")
.then(response => response.json())
.then(cameras => {
    console.log(cameras);
});
