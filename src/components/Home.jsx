import React from 'react'
import bg from '../assets/get-started.png'
import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import "../index.css"

const Home = () => {
    const navigate=useNavigate()
  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
    <Typography id="textId"  style={{fontSize:36}}>
        Money Tracker
    </Typography>
    <img   src={bg} style={{minWidth:'300px',maxWidth:'35%'}} />
    <Button  onClick={()=>navigate('/auth')} sx={{color:'#facb60'}} > Get Started</Button>
    
    </div>
  )
}

export default Home