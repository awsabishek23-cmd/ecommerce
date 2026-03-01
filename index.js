import e from "express";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { userRouter } from "./routes/users.js";

const app = e()

app.use(e.json())
app.use(helmet())
app.use(morgan('common'))
dotenv.config({ quiet: true })
app.use('/api/user', userRouter)

app.listen(process.env.APP_PORT, () => console.log('server running on port 3000'))