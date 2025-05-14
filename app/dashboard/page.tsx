"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Bell,
  Menu,
  Home,
  Mail,
  Book,
  Settings,
  Clock,
  Calendar,
  FileText,
  CreditCard,
  AlertTriangle,
} from "lucide-react"

interface Course {
  code: string
  title: string
  time: string
  lecturer: string
  venue: string
}

interface Announcement {
  id: number
  title: string
  content: string
  date: string
}

const courses: Course[] = [
  {
    code: "ACC430",
    title: "Introduction to Cost Accounting",
    time: "10:00AM - 2:00PM",
    lecturer: "Dr. A. Amosko",
    venue: "LT 5",
  },
  {
    code: "FIN 130",
    title: "Banking and Finance",
    time: "4:00PM - 6:00PM",
    lecturer: "Prof. E. Okoro",
    venue: "LT 2",
  },
]

const announcements: Announcement[] = [
  {
    id: 1,
    title: "End of Semester Examinations",
    content: "Final exams begin on May 15th. Check your timetable for details.",
    date: "April 12, 2025",
  },
]

export default function Dashboard() {
  const [user, setUser] = useState({
    name: "Presley",
    indexNo: "10002233",
    phone: "0245401237",
    email: "10002233@student.pug.edu.gh",
    programme: "BSc Computer Science",
    faculty: "Computing and Information Systems",
  })

  const router = useRouter()

  useEffect(() => {
    // In a real app, you would check authentication status here
    // and redirect to login if not authenticated
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <header className="bg-white p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Presbyterian University Ghana Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="text-[#002366] text-xl font-semibold">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative">
            <Bell className="h-6 w-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>
          <button>
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Profile Section */}
        <section className="bg-white rounded-lg p-4 flex items-start space-x-4">
          <Image
            src="/placeholder.svg?height=80&width=80"
            alt="Profile Picture"
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <h2 className="font-medium">Welcome, {user.name}</h2>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Index No: {user.indexNo}</p>
              <p>Phone: {user.phone}</p>
              <p>Programme: {user.programme}</p>
              <p>Student Email: {user.email}</p>
              <p>Faculty: {user.faculty}</p>
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Today's Schedule</h2>
            <Link href="#" className="text-sm text-[#002366]">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {courses.map((course) => (
              <div key={course.code} className="bg-white rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{course.code}</h3>
                  <p className="text-sm text-gray-600">{course.title}</p>
                  <p className="text-sm text-gray-500">Time: {course.time}</p>
                  <p className="text-sm text-gray-500">Venue: {course.venue}</p>
                  <p className="text-sm text-gray-500">Lecturer: {course.lecturer}</p>
                </div>
                <div className="bg-[#002366] p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-white" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Links */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Quick Access</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: FileText, label: "Academic Records" },
              { icon: CreditCard, label: "Payments" },
              { icon: Calendar, label: "Timetable" },
              { icon: Book, label: "E-learning" },
            ].map((item, index) => (
              <button
                key={index}
                className="bg-[#002366] bg-opacity-10 rounded-lg p-4 flex flex-col items-center justify-center space-y-2"
              >
                <item.icon className="h-6 w-6 text-[#002366]" />
                <span className="text-sm text-gray-600">{item.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Announcements */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Announcements</h2>
          {announcements.map((announcement) => (
            <div key={announcement.id} className="bg-white rounded-lg p-4 border-l-4 border-[#DAA520]">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-[#DAA520] mr-2 mt-0.5" />
                <div>
                  <h3 className="font-medium">{announcement.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                  <p className="text-xs text-gray-500 mt-2">{announcement.date}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3">
        {[
          { icon: Home, label: "Home", active: true },
          { icon: Mail, label: "Mail" },
          { icon: Book, label: "Courses" },
          { icon: Settings, label: "Settings" },
        ].map((item, index) => (
          <Link
            key={index}
            href="#"
            className={`flex flex-col items-center space-y-1 ${item.active ? "text-[#002366]" : "text-gray-500"}`}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
