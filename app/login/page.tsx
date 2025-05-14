"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Email validation function as specified in the architecture
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="Presbyterian University Ghana Logo"
            width={120}
            height={120}
            priority
            className="mb-6"
          />
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
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
              placeholder="student@pug.edu.gh"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#002366] focus:border-[#002366]"
            />
          </div>

          <div className="text-sm text-gray-600">Enter your student email to receive a one-time login code</div>

          <div className="flex items-center justify-between">
            <Link href="/signup" className="text-sm text-[#002366] hover:text-[#DAA520]">
              New User? Sign up
            </Link>
            <Link href="/forgot-password" className="text-sm text-[#002366] hover:text-[#DAA520]">
              Need Help?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#002366] text-white rounded-md hover:bg-[#001845] transition-colors disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  )
}
