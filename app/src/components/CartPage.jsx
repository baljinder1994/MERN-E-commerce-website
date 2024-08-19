import React from 'react'
import {useCart} from './CartContext'
import {Button,Table,Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'
const CartPage = () => {
    const {cartItems,removeFromCart,totalPrice} =useCart()
  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ?(
        <p>Your cart is empty</p>
      ):(
        <>
          <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {cartItems.map((item) =>(
                    <tr key={item._id}>
                        <td>
                            <Image src={`http://localhost:5000/${item.imageUrl}`} thumbnail style={{width:'100px'}}></Image>
                        </td>
                        <td>{item.productName}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price * item.quantity}</td>
                        <td>
                            <Button  variant="danger" onClick={() => removeFromCart(item._id)}>Remove</Button>
                        </td>
                    </tr>
                ))}
            </tbody>


          </Table>
          <h3>Total Price: ${totalPrice}</h3>
          <Link to="/register">
             <Button variant="success">Proceed to Purchase</Button>
          </Link>
        </>
      )}
     
    </div>
  )
}

export default CartPage
