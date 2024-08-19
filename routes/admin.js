const express=require('express')
const router=express.Router()
const Order=require('../models/Order')
const Product=require('../models/Product')
const User=require('../models/User')


//Get all orders
router.get('/orders',async(req,res) =>{
    try{
        const orders=await Order.find().populate('items.product')
        res.json(orders)

    }catch(err){
        res.status(500).json({message:'Server error'})
    }
})

//Get all products
router.get('/products',async(req,res) =>{
    try{
        const prodcuts=await Product.find();
        res.json(prodcuts)

    }catch(err){
        res.status(500).json({message:'Server error'})
    }
})

//Get total revenue
router.get('/revenue',async(req,res) =>{
    try{
        const orders=await Order.find();
        const totalRevenue=orders.reduce((sum,order) => sum + order.totalPrice,0)
        res.json({totalRevenue})

    }catch(err){
        res.status(500).json({message:'Server error'})
    }
})

//Get total orders count
router.get('/total-orders',async(req,res) =>{
    try{
        const totalOrders= await Order.countDocuments()
        res.json({totalOrders})
    }catch(err){
        res.status(500).json({message:'Server error'})
    }

})

//Get total users

router.get('/total-users',async(req,res) =>{
    try{
        const totalUsers= await User.countDocuments()
        res.json({totalUsers})
    }catch(err){
        res.status(500).json({message:'Server error'})
    }

})

//update product
router.put('/products/:id' ,async (req,res) =>{
    try{
        const {productName,price}=req.body;
        const product= await Product.findByIdAndUpdate(
            req.params.id,
            {productName,price},
            {new:true}
        )
        if(!product){
            return res.status(404).json({message:'Product not found'})
        }
        res.json(product);
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

//delete

router.delete('/products/:id', async(req,res) =>{
    try{
        const deletedProduct= await Product.findByIdAndDelete(req.params.id)
        if(!deletedProduct) return res.status(404).json({ message : 'Product'})
            res.json({message :'Product deleted'})
    }catch(err){
        res.status(500).json({message: 'Server error'})
    }
})

//Get countries

router.get('/sales-by-country',async(req,res) =>{
    try{
        const salesByCountry=await Order.aggregate([
            {
                $group:{
                    _id:'$country',
                    totalSales:{$sum:'$totalPrice'}
                }
            }
        ])
        res.json(salesByCountry)
    }catch(err){
        res.sttaus(500).json({ message:'Server error'})
    }
})

module.exports=router