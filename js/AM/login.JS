function iniciarSesion() {

    let correo = document.getElementById("correo").value;
    let contrasena = document.getElementById("contrasena").value;

    fetch("../../php/login.php", {

        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `correo=${encodeURIComponent(correo)}&contrasena=${encodeURIComponent(contrasena)}`
    })
    .then(res => res.json())
    .then(data => {

        if (data.status === "ok") {
            window.location.href = "./M5S2.html";
        } else {
            alert(data.mensaje);
        }

    });
}

function abrirModal() {
    document.getElementById("modalLogin").style.display = "block";
}

function cerrarModal() {
    document.getElementById("modalLogin").style.display = "none";
}

// cerrar si se da click afuera
window.onclick = function(event) {
    let modal = document.getElementById("modalLogin");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

