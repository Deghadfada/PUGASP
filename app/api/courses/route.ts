import { NextResponse } from "next/server"

// Mock data for courses
const mockCourses = [
  {
    id: 1,
    user_id: 1,
    course_name: "ACC410 - Introduction to Cost Accounting",
    schedule: "Monday, Wednesday, Friday 12:00PM - 2:00PM",
    reminder: "2025-03-10T12:00:00.000Z",
    created_at: "2025-03-01T10:00:00.000Z",
  },
  {
    id: 2,
    user_id: 1,
    course_name: "FIN 130 - Banking and Finance",
    schedule: "Tuesday, Thursday 4:00PM - 6:00PM",
    reminder: "2025-03-11T16:00:00.000Z",
    created_at: "2025-03-01T10:05:00.000Z",
  },
]

export async function GET(request: Request) {
  const url = new URL(request.url)
  const userId = url.searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 })
  }

  try {
    // Filter courses by user ID
    const userCourses = mockCourses.filter((course) => course.user_id === Number.parseInt(userId))

    return NextResponse.json({ success: true, courses: userCourses })
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch courses" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const { userId, courseName, schedule, reminder } = await request.json()

  try {
    // In a real implementation, you would insert the course into the database
    // For now, we'll just simulate success

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error adding course:", error)
    return NextResponse.json({ success: false, error: "Failed to add course" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const { courseId, courseName, schedule, reminder } = await request.json()

  try {
    // In a real implementation, you would update the course in the database
    // For now, we'll just simulate success

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating course:", error)
    return NextResponse.json({ success: false, error: "Failed to update course" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const url = new URL(request.url)
  const courseId = url.searchParams.get("courseId")

  if (!courseId) {
    return NextResponse.json({ success: false, error: "Course ID is required" }, { status: 400 })
  }

  try {
    // In a real implementation, you would delete the course from the database
    // For now, we'll just simulate success

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting course:", error)
    return NextResponse.json({ success: false, error: "Failed to delete course" }, { status: 500 })
  }
}
