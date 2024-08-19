const express= require('express')
const router=express.Router()
const Order=require('../models/Order')

router.post('/create',async(req,res) =>{
    const { items,totalPrice,fullName,email,address,city,state,zipCode,country,paymentMethod} =req.body
    try{
        const newOrder= new Order({
            items,
            totalPrice,
            fullName,
            email,
            address,
            city,
            state,
            zipCode,
            country,
            paymentMethod
        })

        await newOrder.save();
        res.status(201).json({message:'Order places',order:newOrder})
    }catch(error){
        res.status(500).json({message:'Server Error'})
    }
})
module.exports=router