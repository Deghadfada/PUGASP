<?php
require_once 'includes/functions.php';
ensureSession();

// Check if email is set in session
if (!isset($_SESSION["verify_email"])) {
    header("Location: signup.php");
    exit;
}

$email = $_SESSION["verify_email"];
$error = "";
$success = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["verify"])) {
        // Verify OTP
        $submittedOTP = $_POST["digit1"] . $_POST["digit2"] . $_POST["digit3"] . 
                        $_POST["digit4"] . $_POST["digit5"] . $_POST["digit6"];
        
        try {
            $stmt = $pdo->prepare("SELECT * FROM otp_verifications WHERE email = ? ORDER BY created_at DESC LIMIT 1");
            $stmt->execute([$email]);
            $otpRecord = $stmt->fetch();
            
            if (!$otpRecord) {
                $error = "No OTP found for this email";
            } else if (strtotime($otpRecord["expires_at"]) < time()) {
                // OTP expired
                $stmt = $pdo->prepare("DELETE FROM otp_verifications WHERE id = ?");
                $stmt->execute([$otpRecord["id"]]);
                $error = "OTP has expired. Please request a new one.";
            } else if ($otpRecord["otp"] !== $submittedOTP) {
                $error = "Invalid OTP";
            } else {
                // OTP is correct
                $stmt = $pdo->prepare("DELETE FROM otp_verifications WHERE id = ?");
                $stmt->execute([$otpRecord["id"]]);
                
                $success = "OTP verified successfully! Redirecting to login...";
                
                // Clear session variable
                unset($_SESSION["verify_email"]);
                
                // Redirect after 2 seconds
                header("refresh:2;url=login.php");
            }
        } catch (PDOException $e) {
            $error = "An error occurred. Please try again.";
        }
    } else if (isset($_POST["resend"])) {
        // Resend OTP
        try {
            // Generate new OTP
            $newOTP = generateOTP();
            $expiresAt = date('Y-m-d H:i:s', strtotime('+10 minutes'));
            
            // Update or insert OTP record
            $stmt = $pdo->prepare("
                INSERT INTO otp_verifications (email, otp, expires_at) 
                VALUES (?, ?, ?) 
                ON CONFLICT (email) 
                DO UPDATE SET otp = EXCLUDED.otp, expires_at = EXCLUDED.expires_at
            ");
            $stmt->execute([$email, $newOTP, $expiresAt]);
            
            // Send OTP email
            if (sendOTPEmail($email, $newOTP)) {
                $success = "New OTP sent successfully";
            } else {
                $error = "Failed to send OTP email. Please try again.";
            }
        } catch (PDOException $e) {
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
    <title>Verify OTP - PUG Academic Services Portal</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div class="container">
        <div class="form-container">
            <h2 class="form-title">Verify Your Email</h2>
            <p style="text-align: center; margin-bottom: 20px;">
                We've sent a 6-digit code to your email. Please enter it below to verify your account.
            </p>
            
            <?php if ($error): ?>
                <div class="error-message"><?php echo $error; ?></div>
            <?php endif; ?>
            
            <?php if ($success): ?>
                <div class="success-message"><?php echo $success; ?></div>
            <?php endif; ?>
            
            <form method="POST" action="verify-otp.php">
                <div class="otp-container">
                    <input type="text" name="digit1" class="otp-input" maxlength="1" required>
                    <input type="text" name="digit2" class="otp-input" maxlength="1" required>
                    <input type="text" name="digit3" class="otp-input" maxlength="1" required>
                    <input type="text" name="digit4" class="otp-input" maxlength="1" required>
                    <input type="text" name="digit5" class="otp-input" maxlength="1" required>
                    <input type="text" name="digit6" class="otp-input" maxlength="1" required>
                </div>
                <button type="submit" name="verify" class="form-button">Verify OTP</button>
            </form>
            
            <form method="POST" action="verify-otp.php" style="margin-top: 20px;">
                <button type="submit" name="resend" class="form-link" style="background: none; border: none; cursor: pointer;">
                    Resend OTP
                </button>
            </form>
        </div>
    </div>
    
    <script>
        // Auto-focus and auto-tab for OTP inputs
        document.addEventListener('DOMContentLoaded', function() {
            const inputs = document.querySelectorAll('.otp-input');
            
            // Focus first input
            inputs[0].focus();
            
            inputs.forEach((input, index) => {
                input.addEventListener('input', function() {
                    if (this.value.length === 1 && index < inputs.length - 1) {
                        inputs[index + 1].focus();
                    }
                });
                
                input.addEventListener('keydown', function(e) {
                    if (e.key === 'Backspace' && !this.value && index > 0) {
                        inputs[index - 1].focus();
                    }
                });
            });
        });
    </script>
</body>
</html>
