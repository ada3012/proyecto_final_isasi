<?php
require "config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $correo = $_POST["correo"];
    $contrasena = $_POST["contrasena"];

    if ($correo == "" || $contrasena == "") {
        echo json_encode([
            "status" => "error",
            "mensaje" => "Campos vacíos"
        ]);
        exit();
    }

    $sql = "SELECT * FROM clientes WHERE correo = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $correo);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $usuario = $result->fetch_assoc();

        if (password_verify($contrasena, $usuario["contrasena"])) {
            echo json_encode(["status" => "ok"]);
        } else {
            echo json_encode([
                "status" => "error",
                "mensaje" => "Contraseña incorrecta"
            ]);
        }
    } else {
        echo json_encode([
            "status" => "error",
            "mensaje" => "Usuario no encontrado"
        ]);
    }

    $stmt->close();
    $conn->close();
}
?>
