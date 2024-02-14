import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NavB from '../Navbar/navbar';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

function Profilecomp() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    navigate('/');
  }

  const USer = {name: "",email:""};
  const [name, setName] = useState(USer);
  useEffect(() => {
    axios.get('https://rentalhub-server.onrender.com/profile', {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((response) => {
        const {username,email} = response.data;
        setName({
          name: username,
          email: email
        });
      }, []).catch((err) => err);
  })
  return (
    <>
      <div className='pb-5'>
        <NavB />
      </div>
      <div className='pt-5 d-flex align-items-center justify-content-center' style={{ height: "95vh" }}>
        <Container className='profile-box my-5' style={{ border: "3px solid black", boxShadow: "8px 5px #adcdff" }}>
          <Row>
            <Col lg={6} style={{border:"2px solid #173c53"}}>
              <Container fluid className='pt-5 pb-3 d-flex justify-content-center'>
                <Image fluid style={{ height: "200px" }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png" />
              </Container>
              <Container fluid className='mb-5'>
                <h3 className='text-center'>Welcome {name.name}</h3>
                <h5 className='text-center'>{name.email}</h5>
                <Container className='d-flex justify-content-center'>
                  <button onClick={handleLogout} className="btn btn-lg mt-2 home-btn" style={{ backgroundColor: "#adcdff", color: "#173c53", border: "2px solid black" }}>
                    Logout<i className="ps-2 fa-solid fa-right-from-bracket fa-lg"></i>
                  </button>
                </Container>
              </Container>
            </Col>
            <Col lg={6} style={{border:"2px solid #173c53"}} className='py-3'>
              <Container className='d-flex flex-column justify-content-center p-lg-5 my-3 align-items-center'>
              <button onClick={() => {navigate('/profile/listItems')}} className="mb-5 btn btn-lg mt-2 home-btn" style={{ backgroundColor: "#adcdff", color: "#173c53", border: "2px solid black" }}>
                List New Items
              </button>
              <button onClick={() => {navigate('/profile/listView')}} className="mb-5 btn btn-lg mt-2 home-btn" style={{ backgroundColor: "#adcdff", color: "#173c53", border: "2px solid black" }}>
                View Listed Items
              </button>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Profilecomp