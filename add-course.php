<?php
require_once 'includes/functions.php';
ensureSession();
requireLogin();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userId = $_SESSION["user_id"];
    $courseName = $_POST["courseName"];
    $schedule = $_POST["schedule"];
    $reminder = !empty($_POST["reminder"]) ? $_POST["reminder"] : null;
    
    try {
        $stmt = $pdo->prepare("INSERT INTO courses (user_id, course_name, schedule, reminder) VALUES (?, ?, ?, ?)");
        $stmt->execute([$userId, $courseName, $schedule, $reminder]);
        
        $_SESSION["message"] = "Course added successfully!";
    } catch (PDOException $e) {
        $_SESSION["message"] = "Failed to add course. Please try again.";
    }
}

header("Location: dashboard.php");
exit;
?>
