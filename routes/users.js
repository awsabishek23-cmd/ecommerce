import e from "express";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db/postgres.js";

const userRouter = e.Router();

userRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    const hashedPassword = await hash(password, 10);
    const result = await pool.query(`INSERT INTO users (user_name, user_email, user_password, user_delivery_address) VALUES ($1,$2,$3,$4) RETURNING user_id`,[name, email, hashedPassword, address]);
    const token = jwt.sign(
      { id: result.rows[0].user_id, email },
      { expiresIn: "7d" }
    );

    res.status(201).json({ token });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


userRouter.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    const result = await pool.query(
      `SELECT user_id, user_password FROM users WHERE user_email = $1`,[email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ status: "login failed" });
    }

    const validPassword = await compare(password, result.rows[0].user_password);

    if (!validPassword) {
      return res.status(401).json({ status: "login failed" });
    }

    const token = jwt.sign({ id: user.user_id, email },{ expiresIn: "7d" });

    res.status(200).json({ token });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { userRouter };