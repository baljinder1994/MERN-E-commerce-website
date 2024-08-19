const express=require('express')
const multer=require('multer')
const Product=require('../models/Product')


const router=express.Router()

const storage=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + '-' + file.originalname)
    },
})

const upload = multer({storage:storage});

router.post('/',upload.single('image'),async (req,res) =>{
    const {productName,description,price} =req.body
    const imageUrl=req.file.path

    const product= new Product({
        productName,
        description,
        price,
        imageUrl,
    })

    try{
        await product.save();
        res.status(201).send('Product added')
    }catch(err){
        res.status(400).send('Error adding product')
    }
})

router.get('/',async(req,res) =>{
    try{
        const products= await Product.find({});
        res.json(products)
    }catch(err){
        res.status(400).json({message:'failed to fetch data'})
    }
})



module.exports= router
