<?php
require_once 'db_connect.php';

// Generate a 6-digit OTP
function generateOTP() {
    return str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
}

// Hash password
function hashPassword($password) {
    return password_hash($password, PASSWORD_BCRYPT);
}

// Verify password
function verifyPassword($password, $hash) {
    return password_verify($password, $hash);
}

// Send OTP email
function sendOTPEmail($to, $otp) {
    $subject = "Your OTP for PUGASP Registration";
    $message = "Your OTP is: $otp. This code will expire in 10 minutes.";
    $headers = "From: noreply@pugasp.edu\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    // In a production environment, you would use a proper email service
    // For now, we'll use PHP's mail function
    return mail($to, $subject, $message, $headers);
}

// Start session if not already started
function ensureSession() {
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
}

// Check if user is logged in
function isLoggedIn() {
    ensureSession();
    return isset($_SESSION['user_id']);
}

// Redirect if not logged in
function requireLogin() {
    if (!isLoggedIn()) {
        header("Location: login.php");
        exit;
    }
}
?>
