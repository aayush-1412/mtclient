import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import "../index.css"
import ResponsiveAppBar from "./Navbar";
const buttonStyle={
  backgroundColor:'#facb60',
  mt:2.5,
  borderRadius:2,
  
   color:'#202151',
  ':hover': {
    bgcolor: '#202151', // theme.palette.primary.
    color: '#f8dc9a',
  },
}
const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`https://mtserver-r8v0.onrender.com/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));
      console.log(res)
    const data = await res.data;
    return data;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSignup) {
    await  sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/transactions"))
        
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/transactions/add"))
        
    }
  };
  return (
    <div  >
  
      <form onSubmit={handleSubmit}>
        <Box className='font-link'
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent="center"
          boxShadow="10px 10px 15px 0px rgba(0,0,0,0.37);"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
          maxWidth={300}
          style={{backgroundColor:'#202151'}}
        >
          <Typography id="textId" variant="h4" padding={3} textAlign="center">
            {" "}
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField id="inputId"
              onChange={handleChange}
              name="name"
          
              value={inputs.name}
              placeholder="Name"
              margin="normal"
            />
          )}{" "}
          <TextField id="inputId"
            onChange={handleChange}
            name="email"
            type="email"
            value={inputs.email}
            placeholder="Email"
            margin="normal"
          />
          <TextField id="inputId"
            onChange={handleChange}
            name="password"
            type="password"
            value={inputs.password}
            placeholder="Password"
            margin="normal"
            
          />
          <Button sx={buttonStyle} variant="contained" type="submit">Submit</Button>
          <Button  sx={buttonStyle} onClick={() => setIsSignup(!isSignup)}>
            Change to {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
