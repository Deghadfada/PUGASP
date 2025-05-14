<?php
$host = "localhost";
$dbname = "pugasp_db";
$user = "postgres";
$password = "your_password"; // Change this to your actual PostgreSQL password

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}
?>
