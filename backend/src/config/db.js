import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config();


const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Error connecting to the database:", err);
    return;
  }
  console.log("✅ Database connected successfully.");
  connection.release(); // Release back to the pool
});

export default db;


