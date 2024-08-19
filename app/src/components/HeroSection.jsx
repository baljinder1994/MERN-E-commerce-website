import React from 'react'
import {Button,Container,Row,Col} from 'react-bootstrap'
const HeroSection = () => {
  return (
    <div className='hero-section'>
       <Container>
        <Row className='align-items-center'>
            <Col md={6} className="hero-text">
                <h1>Your Dream PRoducts Await</h1>
                <p>Discover the latest trends and find the perfect items for you.</p>
                <Button variant="primary" size="lg" href="/">Shop Now</Button>
            </Col>
            <Col md={6} className="hero-image">
               <img src="hero.webp"></img>
            </Col>
        </Row>
       </Container>
    </div>
  )
}

export default HeroSection
