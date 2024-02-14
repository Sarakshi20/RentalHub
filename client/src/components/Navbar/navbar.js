import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavB() {
  return (
    <Navbar expand="lg" style={{backgroundColor:"#173c53" , color:"#fff6f6",position:"fixed",width:"100%",zIndex:"3"}}>
      <Container>
        <Navbar.Brand href="/" style={{color:"#adcdff",fontWeight:"500",fontSize:"25px"}}><i className="fa-solid fa-truck-moving fa-flip-horizontal fa-lg" style={{color: "#adcdff"}}></i> RentalHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav.Link href="/Items" className='me-4'>Browse Items</Nav.Link>
          <Nav.Link href={localStorage.getItem('token')?'/profile':'/register'} className='me-4'>Account</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavB