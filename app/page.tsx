"use client"

import Image from "next/image"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SplashScreen() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login")
    }, 4000) // Changed to 4 seconds as requested

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#002366]">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="Presbyterian University Ghana Logo"
            width={180}
            height={180}
            priority
            className="mb-6"
          />
          <h1 className="text-white text-xl font-semibold text-center">Presbyterian University, Ghana</h1>
          <h2 className="text-white text-lg text-center">Student Portal</h2>
        </div>
      </div>
    </div>
  )
}
