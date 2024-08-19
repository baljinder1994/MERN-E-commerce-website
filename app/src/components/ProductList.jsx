import React, { useEffect, useState } from 'react'
import axios from 'axios'
import{ Card,Button,Row,Col,Form} from 'react-bootstrap'
import {useCart} from './CartContext'
const ProductList = () => {

   const[products,setProducts]=useState([])
   const[searchQuery,setSearchQuery]=useState('')
   const {addToCart} =useCart()

   useEffect(() =>{
    const fetchProducts=async () =>{
      try{
        const response= await axios.get('http://localhost:5000/api/products')
        setProducts(response.data)
      }catch(err){
        console.error('Failed to fetch product list')
      }
    }
    fetchProducts()
   },[])
  const handleSearch=(e)=>{
    setSearchQuery(e.target.value.toLowerCase())
  }

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery)
  )
 

  return (
   <Row className="product-list">
    <Form className="mb-4 d-flex jusfity-content-center">
      <Form.Group className="searchBar" style={{ width:'300px'}}>
        <Form.Control
         type="text"
         placeholder="Search By Name"
         onChange={handleSearch}
         value={searchQuery}
        ></Form.Control>
      </Form.Group>
    </Form>
    {filteredProducts.map((product) =>(
      <Col key={product._id} sm={12} md={3}>
        <Card className="test-center">
        <Card.Img varient="top" src={`http://localhost:5000/${product.imageUrl}`} alt={product.productName}/>
          <Card.Body>
              <Card.Title>{product.productName}</Card.Title>
              <Card.Text>Price: ${product.price}</Card.Text>
              <Button varient="primary" onClick={() =>addToCart(product)}>Add To Cart</Button>
           </Card.Body>
          </Card>
      </Col>
    ))}
   
   </Row>
  )
}

export default ProductList
