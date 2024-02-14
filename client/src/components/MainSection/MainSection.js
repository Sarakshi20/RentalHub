import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useNavigate} from 'react-router-dom';

function MainSection() {
    const navi = useNavigate();
    function Navigate() {
        if(localStorage.getItem('token')){
            navi('/profile');
        }else{
            navi('/register');
        }
    }
  return (
    <React.Fragment>
        <Container style={{backgroundImage: "url('https://liv.rent/blog/wp-content/uploads/2023/03/landlords-post-graphic.svg')",height:"105vh",backgroundPosition: "right center",backgroundRepeat:"no-repeat", backgroundSize: "800px 500px",backgroundColor:"white",overflow:"hidden"}}>
            <Container className='d-flex flex-column align-items-start justify-content-center' style={{height:"inherit"}}>
            <h2 style={{ borderRadius:"10px"}}>Discover seamless rentals for every need.<br /> Easy, affordable, and at your fingertips.</h2>
                <Button size="lg" className='mt-3 home-btn' style={{backgroundColor:"#adcdff",color:"#173c53",border:"2px solid black",fontSize:"22px"}} onClick={Navigate}>Get Started</Button>
            </Container>
        </Container>
        <Container fluid style={{backgroundColor:"white",overflow:"hidden"}}>
            <Row className='d-flex justify-content-center'>
                <Col xs={12} md={4} className='d-flex flex-column align-items-center pb-5'>
                    <h1 className='py-3'><i className="fa-regular fa-star fa-xl"></i></h1>
                    <h3 style={{color:"#adcdff"}}>Access More</h3>
                    <p>Persue passions. Get things done</p>
                </Col>
                <Col xs={12} md={4} className='d-flex flex-column align-items-center pb-5'>
                    <h1 className='py-3'><i className="fa-solid fa-earth-americas fa-xl"></i></h1>
                    <h3 style={{color:"#adcdff"}}>Help the Planet</h3>
                    <p>Live lighter. Reduce waste</p>
                </Col>
                <Col xs={12} md={4} className='d-flex flex-column align-items-center pb-5'>
                    <h1 className='py-3'><i className="fa-solid fa-hand-holding-dollar fa-xl"></i></h1>
                    <h3 style={{color:"#adcdff"}}>Save Money</h3>
                    <p>Buy less. Rent for a fraction of cost</p>
                </Col>
            </Row>
        </Container>
    </React.Fragment>
  )
}

export default MainSection