import nodemailer from "nodemailer"

// In a real-world scenario, you'd want to use environment variables for these
const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: "your-email@example.com",
    pass: "your-password",
  },
})

export async function sendOTPEmail(to: string, otp: string) {
  const mailOptions = {
    from: '"PUGASP" <noreply@pugasp.edu>',
    to: to,
    subject: "Your OTP for PUGASP Registration",
    text: `Your OTP is: ${otp}. This code will expire in 10 minutes.`,
    html: `
      <h1>Your OTP for PUGASP Registration</h1>
      <p>Your OTP is: <strong>${otp}</strong></p>
      <p>This code will expire in 10 minutes.</p>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log("OTP email sent successfully")
    return true
  } catch (error) {
    console.error("Error sending OTP email:", error)
    return false
  }
}
