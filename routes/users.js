import e from "express";
import {pool} from '../db/mysql.js'
import {hash} from "bcrypt";


const userRouter = e.Router()
userRouter.post('/register',async (req,res)=>{
    try {
            const {name, email, password, address} = req.body
            const hashedPassword = await hash(password, 10)
            await pool.execute('insert into users(user_name, user_email, user_password,user_delivery_address) values(?,?,?,?)',[name,email, hashedPassword, address])
            return res.sendStatus(201)    
        }
    catch (error) {
        res.status(404).json({error:error}) 
    }
})

userRouter.post('/login', async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(404).json({error:error}) 
    }
})

export {userRouter}