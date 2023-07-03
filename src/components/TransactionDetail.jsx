import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../index.css"
import ResponsiveAppBar from "./Navbar";
const labelStyles = { mt:3,  fontSize: "20px",color: "#f8dc9a9b", fontFamily:'Ubuntu'}
const buttonStyle={
  backgroundColor:'#facb60',
  mt:2.5,
  borderRadius:2,
  
   color:'#202151',
  ':hover': {
    bgcolor: '#202151', // theme.palette.primary.main
    color: '#f8dc9a',
  },
}
const TransactionDetail = () => {
  const navigate=useNavigate()
  const [transaction, setTransaction] = useState();
  const {id}=useParams()
 
  const [inputs, setInputs] = useState({
 
  });
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const fetchDetails = async () => {
    const res = await axios
      .get(`https://mtserver-r8v0.onrender.com/api/transaction/${id}`)
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      setTransaction(data.transaction);
      setInputs({title:data.transaction.title,
      description:data.transaction.description,
      totalExpense:data.transaction.totalExpense,
      splitCount:data.transaction.splitCount,
      splitCategory:data.transaction.splitCategory,
      splitAmong:data.transaction.splitAmong,
      
      
      })
    });
  }, [id]);
  const sendRequest=async ()=>{
    const res=axios.put(`https://mtserver-r8v0.onrender.com/api/transaction/update/${id}`,{
      title:inputs.title,
      
      description:inputs.description,
      totalExpense:inputs.totalExpense,
      splitCount:inputs.splitCount,
      splitAmong:inputs.splitAmong,
      splitCategory:inputs.splitCategory,
    }).catch(err=>console.log(err))
    const data=await res.data;
    return data
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    
    sendRequest().then(data=>console.log(data)).then(()=>navigate("/myTransactions/"))
  };

  return (
    <div>
   
    {inputs &&
      
      <form onSubmit={handleSubmit}>
        <Box
        borderColor="whitesmoke"
          borderRadius={5}
        
          padding={4}
          margin="auto"
          marginTop={2}
          display="flex"
          flexDirection={"column"}
          minWidth={300}
          maxWidth={800}
         
          width={"70%"}
          style={{backgroundColor:'#202151'}}
          boxShadow="20px 20px 35px 0px rgba(0,0,0,0.37);"
        >
          <Typography
            fontWeight={"bold"}
            padding={2}
            color="grey"
            variant="h4"
            textAlign={"center"} id='textId'
          >
           Edit Transaction
          </Typography>
          <InputLabel sx={labelStyles}> Title</InputLabel>
          <TextField
            value={inputs.title}
            name="title"
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            id='inputId'
          />
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField
            value={inputs.description}
            name="description"
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            id="inputId"
          />
          <InputLabel sx={labelStyles}>Total Expense</InputLabel>
          <TextField
            value={inputs.totalExpense}
            margin="normal"
            variant="outlined"
            type={"number"}
            name="totalExpense"
            onChange={handleChange}
            id="inputId"
          />
          <InputLabel sx={labelStyles}>No. of Splits</InputLabel>
          <TextField
            value={inputs.splitCount}
            margin="normal"
            variant="outlined"
            type={"number"}
            name="splitCount"
            onChange={handleChange}
            id="inputId"
          />
          <InputLabel sx={labelStyles}>Split Among</InputLabel>
          <TextField
            value={inputs.splitAmong}
            margin="normal"
            variant="outlined"
            name="splitAmong"
            onChange={handleChange}
            id="inputId"
          />
          <InputLabel sx={labelStyles}>Split Category</InputLabel>
          <TextField
            value={inputs.splitCategory}
            margin="normal"
            variant="outlined"
            name="splitCategory"
            onChange={handleChange}
            id="inputId"
          />
          <Button
           sx={buttonStyle}
            variant="contained"
            color="secondary"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    }
    </div>
  );
};

export default TransactionDetail;
