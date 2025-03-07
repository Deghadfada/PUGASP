<?php
require_once 'includes/functions.php';
ensureSession();

// Check if already logged in
if (isLoggedIn()) {
    header("Location: dashboard.php");
    exit;
}

$error = "";
$success = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullName = $_POST["fullName"];
    $phone = $_POST["phone"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $confirmPassword = $_POST["confirmPassword"];
    
    if ($password !== $confirmPassword) {
        $error = "Passwords don't match";
    } else {
        try {
            // Check if user already exists
            $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$email]);
            
            if ($stmt->rowCount() > 0) {
                $error = "User with this email already exists";
            } else {
                // Generate OTP
                $otp = generateOTP();
                $expiresAt = date('Y-m-d H:i:s', strtotime('+10 minutes'));
                
                // Begin transaction
                $pdo->beginTransaction();
                
                // Insert OTP verification record
                $stmt = $pdo->prepare("INSERT INTO otp_verifications (email, otp, expires_at) VALUES (?, ?, ?)");
                $stmt->execute([$email, $otp, $expiresAt]);
                
                // Hash password
                $hashedPassword = hashPassword($password);
                
                // Insert user
                $stmt = $pdo->prepare("INSERT INTO users (full_name, email, phone, password) VALUES (?, ?, ?, ?)");
                $stmt->execute([$fullName, $email, $phone, $hashedPassword]);
                
                // Commit transaction
                $pdo->commit();
                
                // Send OTP email
                if (sendOTPEmail($email, $otp)) {
                    // Store email in session for OTP verification
                    $_SESSION["verify_email"] = $email;
                    
                    header("Location: verify-otp.php");
                    exit;
                } else {
                    $error = "Failed to send OTP email. Please try again.";
                }
            }
        } catch (PDOException $e) {
            $pdo->rollBack();
            $error = "An error occurred. Please try again.";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up - PUG Academic Services Portal</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body>
    <div class="container">
        <div class="form-container">
            <h2 class="form-title">Sign Up for PUGASP</h2>
            
            <?php if ($error): ?>
                <div class="error-message"><?php echo $error; ?></div>
            <?php endif; ?>
            
            <?php if ($success): ?>
                <div class="success-message"><?php echo $success; ?></div>
            <?php endif; ?>
            
            <form method="POST" action="signup.php">
                <div class="form-group">
                    <i class="fas fa-user"></i>
                    <input type="text" name="fullName" placeholder="Full Name" required>
                </div>
                <div class="form-group">
                    <i class="fas fa-phone"></i>
                    <input type="tel" name="phone" placeholder="Phone Number" required>
                </div>
                <div class="form-group">
                    <i class="fas fa-envelope"></i>
                    <input type="email" name="email" placeholder="Email" required>
                </div>
                <div class="form-group">
                    <i class="fas fa-lock"></i>
                    <input type="password" name="password" placeholder="Create Password" required>
                </div>
                <div class="form-group">
                    <i class="fas fa-lock"></i>
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" required>
                </div>
                <button type="submit" class="form-button">Sign Up</button>
            </form>
            
            <a href="login.php" class="form-link">Already have an account? Log in here</a>
        </div>
    </div>
</body>
</html>

