<?php
// Report only serious errors to avoid leaking info to users
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $conn = new mysqli("localhost", "root", "", "bd_compilines_2");
    $conn->set_charset("utf8mb4"); // 'utf8mb4' is the modern standard for emojis/special chars
    echo "Conexión echa por el wasasin de Adair"; 
} catch (mysqli_sql_exception $e) {
    error_log($e->getMessage()); 
    exit("Error: " . $e->getMessage()); 
}
?>
