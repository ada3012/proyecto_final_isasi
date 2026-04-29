document.getElementById("formRegistro").addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch("php/registro.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {

        const modal = document.getElementById("modal");
        const mensaje = document.getElementById("mensajeModal");
        const btnInicio = document.getElementById("btnInicio");

        modal.style.display = "block";

        if (data.status === "ok") {
            mensaje.textContent = "Registro exitoso 🎉";
            btnInicio.style.display = "inline-block";
        } else {
            mensaje.textContent = data.mensaje;
            btnInicio.style.display = "none";
        }
    })
    .catch(error => {
        console.error(error);
    });
});

// Botón cerrar
document.getElementById("btnCerrar").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
});

// Botón volver al inicio
document.getElementById("btnInicio").addEventListener("click", () => {
    window.location.href = "index.html";
});
