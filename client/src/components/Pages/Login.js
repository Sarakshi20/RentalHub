import React, { useState } from 'react'
import NavB from '../Navbar/navbar'
import axios from 'axios';
import Container from 'react-bootstrap/esm/Container'
import Col from 'react-bootstrap/Col';
import {useNavigate} from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const data = {email: "",password: ""};
  const [userInput,setInput] = useState(data);
  function handleChange(e) {
    setInput({
      ...userInput,
      [e.target.name]: e.target.value
    })
  }

  async function sendData(e){
    e.preventDefault();
    await axios.post('https://rentalhub-server.onrender.com/login',userInput)
    .then((response)=>{
      if(response.status === 200){
        localStorage.setItem("token",response.data);
       return navigate('/profile');
      }else{
        return alert("Invalid Email or Password");
      }
    })
    .catch((err) => {console.error(err);});
    setInput(data);
  }

  return (
    <Container fluid style={{backgroundColor:"white",height:"100vh"}} className='px-0'>
    <NavB />
    <div className="container loginBox text-center pt-5 d-flex align-items-center">
    <div className="container Box mt-5">
      <h1 style={{color:"#173c53"}} className="mb-4 mt-5">Login</h1>
      <form className="SignUp" onSubmit={sendData}> 
        <div className="container d-flex flex-column align-items-center">
          <Col xs={12} md={8} lg={5}>
          <input
            className="form-control inpBt my-2 mx-auto"
            type="email"
            placeholder="email"
            name="email"
            value={userInput.email}
            onChange={handleChange}
            required
          />
          </Col>
          <Col xs={12} md={8} lg={5}>
          <input
            className="form-control inpBt my-4 mx-auto"
            type="password"
            placeholder="Enter password"
            name="password"
            value={userInput.password}
            onChange={handleChange}
            required
          />
          </Col>
          <Col xs={12} md={8} lg={5}>
          <p className="mt-2">
            Need an account? <a href="/register" style={{color:"#173c53"}}>SignUp</a>
          </p>
          <button type='submit' className="btn btn-lg mt-2 rounded home-btn" style={{backgroundColor:"#adcdff",color:"#173c53",border:"2px solid black"}}>
            Login
          </button>
          </Col>
        </div>
      </form>
    </div>
  </div>
  </Container>
  )
}

export default Login