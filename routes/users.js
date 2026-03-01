import e from "express";
import {pool} from '../db/mysql.js'
import {hash} from "bcrypt";
import Joi from "joi";

const userRouter = e.Router()
const userValidation = Joi.object({
    name:Joi.string().min(3).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required(),
    address:Joi.string().min(5).required()
})

userRouter.post('/register',async (req,res)=>{
    try {
        const validation = userValidation.validate(req.body)
        if(validation.error){
            return res.status(400).json(validation.error.details[0].message)
        }else{
            const {name, email, password, address} = req.body
            const hashedPassword = await hash(password, 10)
            await pool.execute('insert into users(user_name, user_email, user_password,delivary_address) values(?,?,?,?)',[name,email, hashedPassword, address])
            return res.sendStatus(201)    
        }
    } catch (error) {
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