import { createPool } from "mysql2/promise";
import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config({ quiet: true })

const pool = new Pool({
    host: process.env.DB_LOCALHOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    
})

export { pool }