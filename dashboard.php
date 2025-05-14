<?php
require_once 'includes/functions.php';
ensureSession();
requireLogin();

$userId = $_SESSION["user_id"];
$userName = $_SESSION["user_name"];
$userEmail = $_SESSION["user_email"];

// Fetch courses
try {
    $stmt = $pdo->prepare("SELECT * FROM courses WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->execute([$userId]);
    $courses = $stmt->fetchAll();
} catch (PDOException $e) {
    $courses = [];
}

$message = "";
if (isset($_SESSION["message"])) {
    $message = $_SESSION["message"];
    unset($_SESSION["message"]);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - PUG Academic Services Portal</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body>
    <header class="dashboard-header">
        <div class="container">
            <h1>Dashboard</h1>
            <div class="user-info">
                <div class="user-avatar">
                    <img src="images/avatar.png" alt="User Avatar" width="40" height="40">
                    <span class="edit-avatar"><i class="fas fa-pencil-alt"></i></span>
                </div>
                <span><?php echo htmlspecialchars($userName); ?></span>
            </div>
        </div>
    </header>
    
    <div class="container">
        <?php if ($message): ?>
            <div class="popup"><?php echo $message; ?></div>
        <?php endif; ?>
        
        <div class="dashboard-content">
            <h2 class="section-title">Course Schedule</h2>
            
            <ul class="course-list">
                <?php if (empty($courses)): ?>
                    <li class="course-item">No courses added yet.</li>
                <?php else: ?>
                    <?php foreach ($courses as $course): ?>
                        <li class="course-item">
                            <div class="course-info">
                                <h3><?php echo htmlspecialchars($course["course_name"]); ?></h3>
                                <p><?php echo htmlspecialchars($course["schedule"]); ?></p>
                                <?php if ($course["reminder"]): ?>
                                    <p>Reminder: <?php echo date('M j, Y g:i A', strtotime($course["reminder"])); ?></p>
                                <?php endif; ?>
                            </div>
                            <div class="course-actions">
                                <a href="edit-course.php?id=<?php echo $course["id"]; ?>" class="action-button">
                                    <i class="fas fa-edit"></i>
                                </a>
                                <a href="delete-course.php?id=<?php echo $course["id"]; ?>" class="action-button delete" 
                                   onclick="return confirm('Are you sure you want to delete this course?');">
                                    <i class="fas fa-trash"></i>
                                </a>
                            </div>
                        </li>
                    <?php endforeach; ?>
                <?php endif; ?>
            </ul>
        </div>
        
        <div class="dashboard-content">
            <h2 class="section-title">Add New Course</h2>
            
            <form action="add-course.php" method="POST">
                <div class="form-group">
                    <input type="text" name="courseName" placeholder="Course Name" required>
                </div>
                <div class="form-group">
                    <input type="text" name="schedule" placeholder="Schedule (e.g., MWF 10:00 AM - 11:30 AM)" required>
                </div>
                <div class="form-group">
                    <label for="reminder">Set Reminder (Optional)</label>
                    <input type="datetime-local" name="reminder" id="reminder">
                </div>
                <button type="submit" class="form-button">
                    <i class="fas fa-plus"></i> Add Course
                </button>
            </form>
        </div>
    </div>
    
    <script>
        // Auto-hide popup after 3 seconds
        document.addEventListener('DOMContentLoaded', function() {
            const popup = document.querySelector('.popup');
            if (popup) {
                setTimeout(function() {
                    popup.style.display = 'none';
                }, 3000);
            }
        });
    </script>
</body>
</html>
