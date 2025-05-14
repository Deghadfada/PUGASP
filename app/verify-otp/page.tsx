"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

export default function VerifyOTPPage() {
  const [otp, setOTP] = useState(["", "", "", "", "", ""])
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")
  const [isResending, setIsResending] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  useEffect(() => {
    if (!email) {
      router.push("/login")
    }
    inputRefs.current[0]?.focus()
  }, [email, router])

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOTP = [...otp]
      newOTP[index] = value
      setOTP(newOTP)

      if (value !== "" && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setMessage("Email not found")
      setMessageType("error")
      return
    }

    setIsVerifying(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, any OTP is valid
      setMessage("OTP verified successfully! Redirecting to dashboard...")
      setMessageType("success")

      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (error) {
      setMessage("Invalid OTP. Please try again.")
      setMessageType("error")
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResendOTP = async () => {
    if (!email) {
      setMessage("Email not found")
      setMessageType("error")
      return
    }

    setIsResending(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setMessage("New OTP sent successfully")
      setMessageType("success")
    } catch (error) {
      setMessage("Failed to resend OTP. Please try again.")
      setMessageType("error")
    } finally {
      setIsResending(false)
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
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Verify Your Email</h2>
          <p className="text-center text-gray-600 mb-6">We've sent a 6-digit code to {email}</p>
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
          <div className="flex justify-between">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-md shadow-sm focus:border-[#002366] focus:ring-1 focus:ring-[#002366]"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>
          <div>
            <button
              type="submit"
              disabled={isVerifying || otp.some((digit) => digit === "")}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#002366] hover:bg-[#001845] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#002366] disabled:opacity-50 transition-colors"
            >
              {isVerifying ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={handleResendOTP}
            disabled={isResending}
            className="text-sm text-[#002366] hover:text-[#DAA520] focus:outline-none"
          >
            {isResending ? "Resending..." : "Didn't receive code? Resend"}
          </button>
        </div>
      </div>
    </div>
  )
}
