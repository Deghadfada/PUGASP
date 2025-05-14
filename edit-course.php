<?php
require_once 'includes/functions.php';
ensureSession();
requireLogin();  type="code"
<?php
require_once 'includes/functions.php';
ensureSession();
requireLogin();

$userId = $_SESSION["user_id"];
$courseId = isset($_GET["id"]) ? (int)$_GET["id"] : 0;

$error = "";
$course = null;

// Fetch course details
try {
    $stmt = $pdo->prepare("SELECT * FROM courses WHERE id = ? AND user_id = ?");
    $stmt->execute([$courseId, $userId]);
    $course = $stmt->fetch();
    
    if (!$course) {
        $_SESSION["message"] = "Course not found.";
        header("Location: dashboard.php");
        exit;
    }
} catch (PDOException $e) {
    $error = "An error occurred. Please try again.";
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $courseName = $_POST["courseName"];
    $schedule = $_POST["schedule"];
    $reminder = !empty($_POST["reminder"]) ? $_POST["reminder"] : null;
    
    try {
        $stmt = $pdo->prepare("UPDATE courses SET course_name = ?, schedule = ?, reminder = ? WHERE id = ? AND user_id = ?");
        $stmt->execute([$courseName, $schedule, $reminder, $courseId, $userId]);
        
        $_SESSION["message"] = "Course updated successfully!";
        header("Location: dashboard.php");
        exit;
    } catch (PDOException $e) {
        $error = "Failed to update course. Please try again.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Course - PUG Academic Services Portal</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body>
    <header class="dashboard-header">
        <div class="container">
            <h1>Edit Course</h1>
            <div class="user-info">
                <div class="user-avatar">
                    <img src="images/avatar.png" alt="User Avatar" width="40" height="40">
                </div>
                <span><?php echo htmlspecialchars($_SESSION["user_name"]); ?></span>
            </div>
        </div>
    </header>
    
    <div class="container">
        <div class="form-container">
            <h2 class="form-title">Edit Course</h2>
            
            <?php if ($error): ?>
                <div class="error-message"><?php echo $error; ?></div>
            <?php endif; ?>
            
            <form method="POST" action="edit-course.php?id=<?php echo $courseId; ?>">
                <div class="form-group">
                    <input type="text" name="courseName" value="<?php echo htmlspecialchars($course["course_name"]); ?>" placeholder="Course Name" required>
                </div>
                <div class="form-group">
                    <input type="text" name="schedule" value="<?php echo htmlspecialchars($course["schedule"]); ?>" placeholder="Schedule (e.g., MWF 10:00 AM - 11:30 AM)" required>
                </div>
                <div class="form-group">
                    <label for="reminder">Set Reminder (Optional)</label>
                    <input type="datetime-local" name="reminder" id="reminder" value="<?php echo $course["reminder"] ? date('Y-m-d\TH:i', strtotime($course["reminder"])) : ''; ?>">
                </div>
                <div class="form-row">
                    <button type="submit" class="form-button">Save Changes</button>
                    <a href="dashboard.php" class="form-button" style="background-color: #ccc; text-align: center; text-decoration: none;">Cancel</a>
                </div>
            </form>
        </div>
    </div>
</body>
</html>
