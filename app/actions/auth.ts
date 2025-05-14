"use server"

import { hash, compare } from "bcrypt"
import { query, transaction } from "../utils/db"
import { generateOTP } from "../utils/otpUtils"
import { sendOTPEmail } from "../utils/emailUtils"

export async function signUp(userData: {
  fullName: string
  phone: string
  email: string
  password: string
}) {
  try {
    // Check if user already exists
    const existingUser = await query("SELECT id FROM users WHERE email = ?", [userData.email])
    if (Array.isArray(existingUser) && existingUser.length > 0) {
      return { success: false, error: "User with this email already exists" }
    }

    const otp = generateOTP()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // OTP expires in 10 minutes

    await transaction(async (connection) => {
      // Insert OTP verification record
      await connection.execute("INSERT INTO otp_verifications (email, otp, expires_at) VALUES (?, ?, ?)", [
        userData.email,
        otp,
        expiresAt,
      ])

      // Hash the password
      const hashedPassword = await hash(userData.password, 10)

      // Insert user data
      await connection.execute("INSERT INTO users (full_name, email, phone, password) VALUES (?, ?, ?, ?)", [
        userData.fullName,
        userData.email,
        userData.phone,
        hashedPassword,
      ])
    })

    const emailSent = await sendOTPEmail(userData.email, otp)

    if (!emailSent) {
      return { success: false, error: "Failed to send OTP email. Please try again." }
    }

    return { success: true }
  } catch (error) {
    console.error("Signup error:", error)
    return { success: false, error: "An error occurred during signup. Please try again." }
  }
}

export async function verifyOTP(email: string, submittedOTP: string) {
  try {
    const [otpRecord] = (await query(
      "SELECT * FROM otp_verifications WHERE email = ? ORDER BY created_at DESC LIMIT 1",
      [email],
    )) as any[]

    if (!otpRecord) {
      return { success: false, error: "No OTP found for this email" }
    }

    if (new Date() > new Date(otpRecord.expires_at)) {
      await query("DELETE FROM otp_verifications WHERE id = ?", [otpRecord.id])
      return { success: false, error: "OTP has expired. Please request a new one." }
    }

    if (otpRecord.otp !== submittedOTP) {
      return { success: false, error: "Invalid OTP" }
    }

    // OTP is correct, update user status or perform any other necessary actions
    await query("DELETE FROM otp_verifications WHERE id = ?", [otpRecord.id])

    return { success: true }
  } catch (error) {
    console.error("OTP verification error:", error)
    return { success: false, error: "An error occurred during OTP verification. Please try again." }
  }
}

export async function resendOTP(email: string) {
  try {
    const [existingUser] = (await query("SELECT id FROM users WHERE email = ?", [email])) as any[]
    if (!existingUser) {
      return { success: false, error: "No user found with this email" }
    }

    const newOTP = generateOTP()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // New OTP expires in 10 minutes

    await query(
      "INSERT INTO otp_verifications (email, otp, expires_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE otp = ?, expires_at = ?",
      [email, newOTP, expiresAt, newOTP, expiresAt],
    )

    const emailSent = await sendOTPEmail(email, newOTP)

    if (!emailSent) {
      return { success: false, error: "Failed to send OTP email. Please try again." }
    }

    return { success: true }
  } catch (error) {
    console.error("Resend OTP error:", error)
    return { success: false, error: "An error occurred while resending OTP. Please try again." }
  }
}

export async function login(email: string, password: string) {
  try {
    const [user] = (await query("SELECT * FROM users WHERE email = ?", [email])) as any[]

    if (!user) {
      return { success: false, error: "Invalid email or password" }
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      return { success: false, error: "Invalid email or password" }
    }

    // In a real application, you would generate and return a JWT token here
    return {
      success: true,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        phone: user.phone,
      },
    }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "An error occurred during login. Please try again." }
  }
}
