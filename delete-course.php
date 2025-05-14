<?php
require_once 'includes/functions.php';
ensureSession();
requireLogin();

$userId = $_SESSION["user_id"];
$courseId = isset($_GET["id"]) ? (int)$_GET["id"] : 0;

try {
    $stmt = $pdo->prepare("DELETE FROM courses WHERE id = ? AND user_id = ?");
    $stmt->execute([$courseId, $userId]);
    
    $_SESSION["message"] = "Course deleted successfully!";
} catch (PDOException $e) {
    $_SESSION["message"] = "Failed to delete course. Please try again.";
}

header("Location: dashboard.php");
exit;
?>
