<?php
require "config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nombre = $_POST["nombre"];
    $correo = $_POST["correo"];
    $telefono = $_POST["telefono"];
    $direccion = $_POST["direccion"];
    $contrasena_input = $_POST["contrasena"];

    // VALIDACIÓN
    if (
        $nombre == "" || 
        $correo == "" || 
        $telefono == "" || 
        $direccion == "" || 
        $contrasena_input == ""
    ) {
        echo json_encode([
            "status" => "error",
            "mensaje" => "Todos los campos son obligatorios"
        ]);
        exit();
    }
    
    $sql_check = "SELECT id FROM clientes WHERE correo = ?";
    $stmt_check = $conn->prepare($sql_check);
    $stmt_check->bind_param("s", $correo);
    $stmt_check->execute();
    $result = $stmt_check->get_result();

    if ($result->num_rows > 0) {
        echo json_encode([
            "status" => "error",
            "mensaje" => "El correo ya está registrado"
        ]);
        exit();
    }


    $contrasena = password_hash($contrasena_input, PASSWORD_DEFAULT);

    $sql = "INSERT INTO clientes (nombre, correo, telefono, direccion, contrasena) 
            VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssss", $nombre, $correo, $telefono, $direccion, $contrasena);

    if ($stmt->execute()) {
        echo json_encode(["status" => "ok"]);
    } else {
        echo json_encode([
            "status" => "error",
            "mensaje" => "Error al registrar"
        ]);
    }

    $stmt->close();
    $stmt_check->close();
    $conn->close();
}
?>
