import React, { useState } from 'react'
import NavB from '../Navbar/navbar'
import axios from 'axios';
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
    <div style={{backgroundColor:"white",height:"100vh"}}>
    <NavB />
    <div className="container loginBox pt-5">
      <div className="container Box mt-5">
        <h1 style={{color: "#173c53"}} className="mb-5 mt-3">Signup</h1>
        <form className="SignUp" onSubmit={sendData}>
          <div className="container">
            <input
              className="form-control inpBt my-4 mx-auto"
              type="email"
              placeholder="Email"
              name="email"
              value={userInput.email}
              style={{width:"400px"}}
              onChange={handleChange}
              required
            />
            <input
              className="form-control inpBt my-4 mx-auto"
              type="text"
              placeholder="UserName"
              value={userInput.username}
              name="username"
              onChange={handleChange}
              style={{width:"400px"}}
              required
            />
            <input
              className="form-control inpBt my-4 mx-auto"
              type="password"
              value={userInput.password}
              placeholder="Create a password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              name="password"
              onChange={handleChange}
              style={{width:"400px"}}
              required
            />
            <p className="mt-5">
              Already have an account? <a href="/login" style={{color:"#173c53"}}>Log in</a>
            </p>
            <button type='submit' className="btn btn-lg mt-2 home-btn" style={{backgroundColor:"#adcdff",color:"#173c53",border:"2px solid black"}}>
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Register