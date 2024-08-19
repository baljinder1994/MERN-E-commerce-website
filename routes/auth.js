const express=require('express')
const router=express.Router()
const bcrypt=require('bcryptjs')
const User=require('../models/User')
const jwt=require('jsonwebtoken')

//Register router

router.post('/register',async(req,res)=>{
    const{email,password} = req.body
    try{
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }

        const hashedPassword=await bcrypt.hash(password,10)

        const newUser=new User({email,password:hashedPassword})
        await newUser.save()

        res.status.json({message:"User created successfully"})
    }catch(error){
        res.status(500).json({message:"Something went wrong"})
    }
})

//Login route

const JWT_SECRET= 'your_secret_key';

router.post('/login',async(req,res)=>{
    const {email,password}=req.body;

    try{
        const user= await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User does not exist"})
        }

        //check Password
        const isMatch= await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid password"})
        }

        //Create JWT

        const token=jwt.sign({id:user._id,email:user.email}, JWT_SECRET,{expiresIn:'1h'})
        res.status(200).json({token})
    }catch(error){
        res.status(500).json({message:"Something went wrong"
            
        })
    }
})
module.exports=router