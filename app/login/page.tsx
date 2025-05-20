"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
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
      setError("Please use your official student email")
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      console.log("Sending OTP to:", email)

      // Navigate to OTP verification
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`)
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#002366]">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-8 bg-[#002366] rounded flex items-center justify-center mb-6">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <h1 className="text-2xl font-semibold text-center text-gray-800">Student Login</h1>
          <p className="text-center text-gray-600 mt-1">Enter your student email to receive a verification code</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
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
              placeholder="Enter your university email"
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#002366] focus:border-[#002366]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#002366] text-white rounded-md hover:bg-[#001845] transition-colors disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Continue"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          For technical support, please contact the IT department
        </div>
      </div>
    </div>
  )
}
