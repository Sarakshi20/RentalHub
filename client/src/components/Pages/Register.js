import React, { useState } from 'react'
import NavB from '../Navbar/navbar'
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import { useNavigate } from 'react-router-dom';

function Register() {
  const userData = {username : "",password : "",email : ""};
  const [userInput,setInput] = useState(userData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const data = {
      ...userInput,
      [e.target.name]: e.target.value
    }
    setInput(data);
  }

  const sendData = async(e) => {
    e.preventDefault();
    await axios.post('https://rentalhub-server.onrender.com/register',userInput)
    .then((response) => {
      if(response.data === false){
        return alert("Email is already taken");
      }
      localStorage.setItem("token",response.data);
      setInput(userData);
      return navigate('/profile');
    }).catch((err) => {console.log(err)});
  }

  return (
    <Container fluid style={{backgroundColor:"white",height:"100vh"}} className='px-0 mx-0'>
    <NavB />
    <div className="container loginBox pt-5 text-center">
      <div className="container Box mt-5">
        <h1 style={{color: "#173c53"}} className="mb-5 mt-3">Signup</h1>
        <form className="SignUp mb-5" onSubmit={sendData}>
          <div className="container d-flex flex-column align-items-center">
          <Col xs={12} md={8} lg={5}>
            <input
              className="form-control inpBt mb-3 mx-auto"
              type="email"
              placeholder="Email"
              name="email"
              value={userInput.email}
              onChange={handleChange}
              required
            />
            </Col>
            <Col xs={12} md={8} lg={5}>
            <input
              className="form-control inpBt mb-3 mx-auto"
              type="text"
              placeholder="UserName"
              value={userInput.username}
              name="username"
              onChange={handleChange}
              required
            />
            </Col>
            <Col xs={12} md={8} lg={5}>
            <input
              className="form-control inpBt mb-3 mx-auto"
              type="password"
              value={userInput.password}
              placeholder="Create a password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              name="password"
              onChange={handleChange}
              required
            />
            </Col>
            <Col xs={12} md={8} lg={5}>
            <p className="mt-4">
              Already have an account? <a href="/login" style={{color:"#173c53"}}>Log in</a>
            </p>
            <button type='submit' className="btn btn-lg mt-2 home-btn" style={{backgroundColor:"#adcdff",color:"#173c53",border:"2px solid black"}}>
              Create Account
            </button>
            </Col>
          </div>
        </form>
      </div>
    </div>
    </Container>
  )
}

export default Register