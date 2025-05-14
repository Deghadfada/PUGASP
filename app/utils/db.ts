import mysql from "mysql2/promise"

// In a real-world scenario, you'd want to use environment variables for these
const pool = mysql.createPool({
  host: "localhost",
  user: "your_mysql_user",
  password: "your_mysql_password",
  database: "pugasp_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export async function query(sql: string, params: any[]) {
  const [results] = await pool.execute(sql, params)
  return results
}

export async function transaction<T>(callback: (connection: mysql.Connection) => Promise<T>): Promise<T> {
  const connection = await pool.getConnection()
  await connection.beginTransaction()

  try {
    const result = await callback(connection)
    await connection.commit()
    return result
  } catch (error) {
    await connection.rollback()
    throw error
  } finally {
    connection.release()
  }
}
