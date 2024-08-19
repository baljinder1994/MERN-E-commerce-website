const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const app=express()
const productRoutes=require('./routes/product')
const authRoutes=require('./routes/auth')
const orderRoutes=require('./routes/order')
const adminRoutes=require('./routes/admin')

app.use(cors())
app.use(express.json())
app.use('/uploads',express.static('uploads'))

mongoose.connect('mongodb://localhost:27017/ecom1',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

app.use('/api/products',productRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/admin',adminRoutes)
// In your Express.js server file
app.get('/api/products', async (req, res) => {
    const { search } = req.query
    try {
      const products = await Product.find({
        productName: new RegExp(search, 'i') // Case-insensitive search
      })
      res.json(products)
    } catch (err) {
      res.status(500).send('Error fetching products')
    }
  })
  

app.listen(5000,() =>{
    console.log(`Server running on port 5000`)
})