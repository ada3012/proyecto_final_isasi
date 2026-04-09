function iniciarSesion() {

    let correo = document.getElementById("correo").value.trim();
    let contrasena = document.getElementById("contrasena").value.trim();

    if (correo === "" || contrasena === "") {
        alert("Por favor completa todos los campos");
        return;
    }

   fetch("/M5S2_pastelitos/proyecto_final_isasi/php/login.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `correo=${encodeURIComponent(correo)}&contrasena=${encodeURIComponent(contrasena)}`
})

.then(res => res.json())
.then(json => {
    console.log(json);

    if (json.status === "ok") {
        window.location.href = "./M5S2_PaginaPastelitos.html";
    } else {
        alert(json.mensaje);
    }
})
.catch(error => {
    console.error("Error:", error);
    alert("Error en la conexión o respuesta inválida");
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

