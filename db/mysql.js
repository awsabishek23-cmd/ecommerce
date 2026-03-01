import { createPool } from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config({ quiet: true })

const pool = createPool({
    host: process.env.DB_LOCALHOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    multipleStatements: true
})

export { pool }