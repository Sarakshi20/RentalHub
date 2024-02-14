import React, { useState } from 'react'
import NavB from '../Navbar/navbar'
import axios from 'axios';
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
    await axios.post('http://localhost:3100/login',userInput)
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
    <div style={{backgroundColor:"white",height:"100vh"}}>
    <NavB />
    <div className="container loginBox text-center pt-5">
    <div className="container Box mt-5">
      <h1 style={{color:"#173c53"}} className="mb-3 mt-3">Login</h1>
      <form className="SignUp" onSubmit={sendData}> 
        <div className="container">
          <input
            className="form-control inpBt my-4 mx-auto"
            type="email"
            placeholder="email"
            name="email"
            value={userInput.email}
            onChange={handleChange}
            style={{width:"400px"}}
            required
          />
          <input
            className="form-control inpBt my-4 mx-auto"
            type="password"
            placeholder="Enter password"
            name="password"
            value={userInput.password}
            onChange={handleChange}
            style={{width:"400px"}}
            required
          />
          <p className="mt-5">
            Need an account? <a href="/register" style={{color:"#173c53"}}>SignUp</a>
          </p>
          <button type='submit' className="btn btn-lg mt-2 rounded home-btn" style={{backgroundColor:"#adcdff",color:"#173c53",border:"2px solid black"}}>
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
  </div>
  )
}

export default Login