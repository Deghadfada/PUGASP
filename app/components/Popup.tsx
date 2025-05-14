"use client"

import { useEffect, useState } from "react"

interface PopupProps {
  message: string
}

export function Popup({ message }: PopupProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">{message}</div>
}
