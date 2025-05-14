"use server"

import { query } from "../utils/db"

export async function getCourses(userId: number) {
  try {
    const courses = await query("SELECT * FROM courses WHERE user_id = ? ORDER BY created_at DESC", [userId])
    return { success: true, courses }
  } catch (error) {
    console.error("Error fetching courses:", error)
    return { success: false, error: "Failed to fetch courses" }
  }
}

export async function addCourse(userId: number, courseName: string, schedule: string, reminder: string | null) {
  try {
    await query("INSERT INTO courses (user_id, course_name, schedule, reminder) VALUES (?, ?, ?, ?)", [
      userId,
      courseName,
      schedule,
      reminder,
    ])
    return { success: true }
  } catch (error) {
    console.error("Error adding course:", error)
    return { success: false, error: "Failed to add course" }
  }
}

export async function updateCourse(courseId: number, courseName: string, schedule: string, reminder: string | null) {
  try {
    await query("UPDATE courses SET course_name = ?, schedule = ?, reminder = ? WHERE id = ?", [
      courseName,
      schedule,
      reminder,
      courseId,
    ])
    return { success: true }
  } catch (error) {
    console.error("Error updating course:", error)
    return { success: false, error: "Failed to update course" }
  }
}

export async function deleteCourse(courseId: number) {
  try {
    await query("DELETE FROM courses WHERE id = ?", [courseId])
    return { success: true }
  } catch (error) {
    console.error("Error deleting course:", error)
    return { success: false, error: "Failed to delete course" }
  }
}
