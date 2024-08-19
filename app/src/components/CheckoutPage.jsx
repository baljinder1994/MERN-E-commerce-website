import React, { useState } from 'react'
import {Form,Button} from 'react-bootstrap'
import axios from 'axios'
import {useCart} from './CartContext'
import {useNavigate} from 'react-router-dom'
const CheckoutPage = () => {
  const { cartItems, totalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city:'',
        state:'',
        country:'',
        zipcode:'',
        paymentMethod:'',
    })

    const navigate= useNavigate();


    const handleChange=(e)=>{
       setFormData({...formData,[e.target.name]: e.target.value})
    }

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/orders/create', {
        items: cartItems.map(item => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price
        })),
        totalPrice,
        ...formData, // Include form data in the request
      });
      clearCart();
      navigate('/');
    } catch (err) {
      console.error('Order error:', err);
    }
  };
   
  return (
    <div className="common-container">
     <h2>Checkout</h2>
     <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFullName">
           <Form.Label>Full Name</Form.Label>
           <Form.Control
             type="text"
             name="fullName"
             placeholder="Enter Full Name"
             onChange={handleChange}
           ></Form.Control>
        </Form.Group>
        <Form.Group controlId="formEmail">
           <Form.Label>Email </Form.Label>
           <Form.Control
             type="email"
             name="email"
             placeholder="Enter Email "
             onChange={handleChange}
           ></Form.Control>
        </Form.Group>
        <Form.Group controlId="formAddress">
           <Form.Label>Full Address</Form.Label>
           <Form.Control
             type="text"
             name="address"
             placeholder="Enter Address"
             onChange={handleChange}
           ></Form.Control>
        </Form.Group>
        <Form.Group controlId="formCity">
           <Form.Label>City </Form.Label>
           <Form.Control
             type="text"
             name="city"
             placeholder="Enter City"
             onChange={handleChange}
           ></Form.Control>
        </Form.Group>
        <Form.Group controlId="formState">
           <Form.Label>State </Form.Label>
           <Form.Control
             type="text"
             name="state"
             placeholder="Enter State"
             onChange={handleChange}
           ></Form.Control>
        </Form.Group>
        <Form.Group controlId="formZipCode">
           <Form.Label>Zip Code</Form.Label>
           <Form.Control
             type="text"
             name="zipCode"
             placeholder="Enter ZipCode"
             onChange={handleChange}
           ></Form.Control>
        </Form.Group>
        <Form.Group controlId="formCountry">
           <Form.Label>Country</Form.Label>
           <Form.Control
             type="text"
             name="country"
             placeholder="Enter Country"
             onChange={handleChange}
           ></Form.Control>
        </Form.Group>
        <Form.Group controlId="formPaymentMethod">
           <Form.Label>Payment Method</Form.Label>
           <Form.Control
             type="text"
             name="paymentMethod"
             placeholder="Enter Payment method(e.g, Credit Card, Debit Cart"
             onChange={handleChange}
           ></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">Place Order</Button>
     </Form>
    </div>
  )
}

export default CheckoutPage
