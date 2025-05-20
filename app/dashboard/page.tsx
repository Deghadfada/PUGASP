"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import Link from "next/link"

interface Announcement {
  title: string
  description: string
}

interface Course {
  code: string
  title: string
  instructor: string
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Overview")
  const router = useRouter()

  const studentInfo = {
    name: "Student",
    program: "Bachelor of Science in Computer Science",
    level: "300",
    academicYear: "2022/2023",
  }

  const announcements: Announcement[] = [
    {
      title: "End of Semester Exams",
      description: "Examination timetable has been released",
    },
    {
      title: "Library Notice",
      description: "Extended hours during exam period",
    },
  ]

  const courses: Course[] = [
    {
      code: "CSC301",
      title: "Database Management",
      instructor: "Dr. Samuel Owusu",
    },
    {
      code: "CSC302",
      title: "Software Engineering",
      instructor: "Prof. Jane Mensah",
    },
    {
      code: "CSC303",
      title: "Computer Networks",
      instructor: "Dr. Emmanuel Adjei",
    },
    {
      code: "CSC304",
      title: "Web Development",
      instructor: "Mr. Kofi Agyeman",
    },
  ]

  const handleLogout = () => {
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#002366] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-white rounded-full"></div>
            <div>
              <h1 className="font-semibold">Presbyterian University, Ghana</h1>
              <p className="text-sm">Student Portal</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center space-x-1 hover:underline">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Student Dashboard</h2>
          <Link href="/profile" className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            My Profile
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          {["Overview", "Academics", "Finance"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-8 ${
                activeTab === tab
                  ? "border border-gray-300 border-b-white bg-white rounded-t-md -mb-px"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Welcome section */}
          <div className="bg-white p-6 rounded-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-1">Welcome, {studentInfo.name}</h3>
            <p className="text-gray-600 mb-4">Here's a summary of your information</p>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Program:</span>
                <span>{studentInfo.program}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Level:</span>
                <span>{studentInfo.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Academic Year:</span>
                <span>{studentInfo.academicYear}</span>
              </div>
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white p-6 rounded-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-4">Announcements</h3>
            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <div key={index} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <h4 className="font-medium">{announcement.title}</h4>
                  <p className="text-gray-600 text-sm">{announcement.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Current Courses */}
        <div className="bg-white p-6 rounded-md border border-gray-200">
          <h3 className="text-xl font-semibold mb-4">Current Courses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <div key={course.code} className="border-b border-gray-100 pb-3">
                <h4 className="font-medium">
                  {course.code} - {course.title}
                </h4>
                <p className="text-gray-600 text-sm">{course.instructor}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
