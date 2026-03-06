import e from "express";
import {pool} from '../db/mysql.js'
import {compare, hash} from "bcrypt";
import jwt from "jsonwebtoken"

const userRouter = e.Router()
userRouter.post('/register',async (req,res)=>{
    try {
            const {name, email, password, address} = req.body
            const hashedPassword = await hash(password, 10)
            const [result] = await pool.execute('insert into users(user_name, user_email, user_password,user_delivery_address) values(?,?,?,?)',[name,email, hashedPassword, address])
            const token = jwt.sign({id:result.insertId,email}, process.env.SECRET_KEY, {expiresIn: "7d"})
            return res.status(201).json({token})    
        }
    catch (error) {
        res.status(404).json({error:error}) 
    }
})

userRouter.post('/login', async(req,res)=>{
    try {
        const {email, password} = req.body
        const [foundedPassword] = await pool.execute('select user_id,user_password from users where user_email = ?',[email])
        
        if(foundedPassword[0].user_id){           
            const validPassword = await compare(password, foundedPassword[0].user_password)       
            if(validPassword){
                const token = jwt.sign({id:foundedPassword[0].user_id,email}, process.env.SECRET_KEY, {expiresIn: "7d"})
                return res.status(200).json({token})
            }else{
                return res.status(401).json({"status":"login failed"})
            }
        }
    } catch (error) {
        res.status(404).json({error:error}) 
    }
})

export {userRouter}