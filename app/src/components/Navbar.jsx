import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar,Nav,Form,FormControl,Button,Dropdown} from 'react-bootstrap'
import { FaSearch, FaShoppingCart} from 'react-icons/fa'
import { useCart} from './CartContext'
const NavbarComponent = () => {
    const {cartItemCount} =useCart();
  return (
    <Navbar bg="light" expand="lg" className="fixed-top">
       <Navbar.Brand as={Link}>ECom</Navbar.Brand>
       <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/Home">
               Home
            </Nav.Link>
          </Nav>
         
          <Nav>
            <Nav.Link as={Link} to="/cart" className="d-flex align-items-center">
                <FaShoppingCart/>
                {cartItemCount > 0 &&(
                    <span className="badge badge-pill badge-custom ml-2">{cartItemCount}</span>
                )}
                <span className='ml-2'>Cart</span>
            </Nav.Link>
          </Nav>
       </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarComponent
