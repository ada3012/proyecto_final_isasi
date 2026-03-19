function iniciarSesion() {

    let correo = document.getElementById("correo").value;
    let contrasena = document.getElementById("contrasena").value;

    fetch("login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `correo=${encodeURIComponent(correo)}&contrasena=${encodeURIComponent(contrasena)}`
    })
    .then(res => res.json())
    .then(data => {

        if (data.status === "ok") {
            window.location.href = "index.html";
        } else {
            alert(data.mensaje);
        }

    });
}