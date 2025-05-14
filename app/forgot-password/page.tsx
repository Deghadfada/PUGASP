"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Email validation function
  const validateEmail = (email: string) => {
    const regex = /^[A-Z0-9._%+-]+@(student\.)?pug\.edu\.gh$/i
    return regex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate email format
    if (!validateEmail(email)) {
      setMessage("Please use your official student email")
      setMessageType("error")
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setMessage("Password reset instructions sent to your email")
      setMessageType("success")

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (error) {
      setMessage("An error occurred. Please try again.")
      setMessageType("error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="Presbyterian University Ghana Logo"
            width={80}
            height={80}
            priority
            className="mb-4"
          />
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Reset Password</h2>
          <p className="text-center text-gray-600 mb-6">
            Enter your student email and we'll send you instructions to reset your password
          </p>
        </div>

        {message && (
          <div
            className={`${
              messageType === "success"
                ? "bg-green-100 border-green-400 text-green-700"
                : "bg-red-100 border-red-400 text-red-700"
            } px-4 py-3 rounded relative mb-4`}
            role="alert"
          >
            <span className="block sm:inline">{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Student Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@pug.edu.gh"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#002366] focus:border-[#002366]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#002366] hover:bg-[#001845] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#002366] disabled:opacity-50 transition-colors"
          >
            {isLoading ? "Sending..." : "Reset Password"}
          </button>
        </form>

        <div className="text-center">
          <Link href="/login" className="text-sm text-[#002366] hover:text-[#DAA520]">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}
