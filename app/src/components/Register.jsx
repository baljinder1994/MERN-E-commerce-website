import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import axios from 'axios'
import {Form,Button,Row,Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
const Register = () => {

    const[formData,setFormData]=useState({email:'' , password: ''})
    const navigate=useNavigate()

    const handleChange=(e) =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit= async (e)=>{
        e.preventDefault()
        try{
            await axios.post('http://localhost:5000/api/auth/register', formData)
            navigate('/login')
        }catch(err){
            console.error('Register failed',err)
        }
    }
  return (
    <div className="common-container">
    <h2>Register</h2>
    <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>
                 Email address
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
              required
            ></Form.Control>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <Form.Label>
                 Email address
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter PAssword"
              onChange={handleChange}
              required
            ></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">Register</Button>
    </Form>
    <Row className="mt-3">
        <Col>
           <p>Already have an account? <Link to="/login">Login here</Link></p>
        </Col>
    </Row>
    </div>
  )
}

export default Register
