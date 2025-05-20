"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function Profile() {
  const router = useRouter()

  const studentInfo = {
    name: "John Doe",
    indexNumber: "10002233",
    program: "Bachelor of Science in Computer Science",
    level: "300",
    academicYear: "2022/2023",
    email: "10002233@student.pug.edu.gh",
    phone: "0245401237",
    address: "123 University Avenue, Accra",
    dateOfBirth: "15-May-2000",
    nationality: "Ghanaian",
    gender: "Male",
    admissionDate: "September 2021",
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
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="flex items-center mb-6">
          <button onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-2xl font-bold">My Profile</h2>
        </div>

        <div className="bg-white p-6 rounded-md border border-gray-200">
          <h3 className="text-xl font-semibold mb-6 pb-2 border-b">Personal Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{studentInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Index Number</p>
                <p className="font-medium">{studentInfo.indexNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Program</p>
                <p className="font-medium">{studentInfo.program}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Level</p>
                <p className="font-medium">{studentInfo.level}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Academic Year</p>
                <p className="font-medium">{studentInfo.academicYear}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{studentInfo.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{studentInfo.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{studentInfo.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">{studentInfo.dateOfBirth}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nationality</p>
                <p className="font-medium">{studentInfo.nationality}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium">{studentInfo.gender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Admission Date</p>
                <p className="font-medium">{studentInfo.admissionDate}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Link href="/dashboard" className="px-4 py-2 bg-[#002366] text-white rounded-md hover:bg-[#001845]">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
