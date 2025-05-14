package com.pugasp.reminder;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Timestamp;
import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Date;

public class ReminderService {
    
    private static final String DB_URL = "jdbc:postgresql://localhost:5432/pugasp_db";
    private static final String DB_USER = "postgres";
    private static final String DB_PASSWORD = "your_password"; // Change this to your actual PostgreSQL password
    
    private static final String EMAIL_HOST = "smtp.example.com";
    private static final String EMAIL_USER = "your-email@example.com";
    private static final String EMAIL_PASSWORD = "your-password";
    
    public static void main(String[] args) {
        try {
            // Load PostgreSQL JDBC driver
            Class.forName("org.postgresql.Driver");
            
            // Check for upcoming reminders
            checkReminders();
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    private static void checkReminders() throws Exception {
        // Current time
        Timestamp now = new Timestamp(System.currentTimeMillis());
        
        // Time window for reminders (next 15 minutes)
        Timestamp reminderWindow = new Timestamp(now.getTime() + (15 * 60 * 1000));
        
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
            String sql = "SELECT c.id, c.course_name, c.schedule, c.reminder, u.email, u.full_name " +
                         "FROM courses c " +
                         "JOIN users u ON c.user_id = u.id " +
                         "WHERE c.reminder BETWEEN ? AND ? " +
                         "AND c.reminder > ?";
            
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setTimestamp(1, now);
            stmt.setTimestamp(2, reminderWindow);
            stmt.setTimestamp(3, now);
            
            ResultSet rs = stmt.executeQuery();
            
            while (rs.next()) {
                int courseId = rs.getInt("id");
                String courseName = rs.getString("course_name");
                String schedule = rs.getString("schedule");
                Timestamp reminder = rs.getTimestamp("reminder");
                String email = rs.getString("email");
                String fullName = rs.getString("full_name");
                
                // Send reminder email
                sendReminderEmail(email, fullName, courseName, schedule, reminder);
                
                // Update the reminder status or mark as sent
                markReminderAsSent(conn, courseId);
            }
        }
    }
    
    private static void sendReminderEmail(String to, String name, String courseName, String schedule, Timestamp reminderTime) {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", EMAIL_HOST);
        props.put("mail.smtp.port", "587");
        
        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(EMAIL_USER, EMAIL_PASSWORD);
            }
        });
        
        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("noreply@pugasp.edu"));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
            message.setSubject("Reminder: Upcoming Course - " + courseName);
            
            String content = "Dear " + name + ",<br><br>" +
                            "This is a reminder for your upcoming course:<br><br>" +
                            "<b>Course:</b> " + courseName + "<br>" +
                            "<b>Schedule:</b> " + schedule + "<br>" +
                            "<b>Time:</b> " + reminderTime + "<br><br>" +
                            "Please make sure you're prepared for this class.<br><br>" +
                            "Regards,<br>" +
                            "PUG Academic Services Portal";
            
            message.setContent(content, "text/html");
            
            Transport.send(message);
            
            System.out.println("Reminder email sent to " + to + " for course " + courseName);
            
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
    
    private static void markReminderAsSent(Connection conn, int courseId) throws Exception {
        // In a real application, you might want to track which reminders have been sent
        // For simplicity, we're not updating anything in the database here
        System.out.println("Marked reminder as sent for course ID: " + courseId);
    }
}
