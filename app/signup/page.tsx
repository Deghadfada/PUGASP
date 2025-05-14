"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function SignupPage() {
  const [fullName, setFullName] = useState("")
  const [indexNo, setIndexNo] = useState("")
  const [phone, setPhone] = useState("")
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
    setError("")

    // Validate email format
    if (!validateEmail(email)) {
      setError("Please use your official student email")
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      router.push(`/verify-otp?email=${encodeURIComponent(email)}`)
    } catch (error) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md space-y-6 px-4 py-8">
        <div className="flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="Presbyterian University Ghana Logo"
            width={80}
            height={80}
            priority
            className="mb-4"
          />
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Create Account</h2>
          <p className="text-center text-gray-600">Sign up for Presbyterian University Student Portal</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#002366] focus:border-[#002366]"
            />
          </div>

          <div>
            <label htmlFor="indexNo" className="block text-sm font-medium text-gray-700">
              Index Number
            </label>
            <input
              id="indexNo"
              name="indexNo"
              type="text"
              required
              value={indexNo}
              onChange={(e) => setIndexNo(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#002366] focus:border-[#002366]"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#002366] focus:border-[#002366]"
            />
          </div>

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
            className="w-full py-3 px-4 bg-[#002366] text-white rounded-md hover:bg-[#001845] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#002366] disabled:opacity-50 transition-colors"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center">
          <Link href="/login" className="text-sm text-[#002366] hover:text-[#DAA520]">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
