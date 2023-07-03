import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import "../index.css"
import ResponsiveAppBar from "./Navbar";

const labelStyles = { mt:3,  fontSize: "20px",color: "#f8dc9a9b", fontFamily:'Ubuntu'}

const buttonStyle={
  backgroundColor:'#facb60',
  mt:2.5,
  borderRadius:2,
  
   color:'#202151',
  ':hover': {
    bgcolor: '#202151', 
    color: '#f8dc9a',
  },
}
const AddTransaction = () => {
  const navigate= useNavigate()
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    totalExpense: "",
    splitCount: "",
    splitAmong: "",
    splitCategory: "",
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const sendRequest=async()=>{
    const res=await axios.post(`https://mtserver-r8v0.onrender.com/api/transaction/add`,{
      title:inputs.title,
      description:inputs.description,
      totalExpense:inputs.totalExpense,
      splitCount:inputs.splitCount,
      splitAmong:inputs.splitAmong,
      splitCategory:inputs.splitCategory,
      user: localStorage.getItem("userId")


    }).catch(err=>console.log(err))
    return res
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
 
   await sendRequest().then((data)=>console.log(data))
    navigate('/myTransactions')
  };

  return (
    <div>
  
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
          // maxHeight={600}
        >
          <Typography
            fontWeight={"bold"}
            padding={2}
            color="grey"
            variant="h4"
            textAlign={"center"}
            id='textId'
          >
            Add new Transaction
          </Typography>
          <InputLabel sx={labelStyles}> Title</InputLabel>
          <TextField id="inputId"
            value={inputs.title}
            name="title"
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            placeholder="Title"
          />
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField
            value={inputs.description}
            id="inputId"
            name="description"
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            placeholder='Describe your expense'
          />
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',justifyContent:'space-around'}} >

          
          <InputLabel sx={labelStyles}> Expense</InputLabel>
          <InputLabel sx={labelStyles}>Splits</InputLabel>
          <TextField
            value={inputs.totalExpense}
            id="inputId"
            margin="normal"
            variant="outlined"
            type={"number"}
            name="totalExpense"
            onChange={handleChange}
            placeholder='amount to split'
          />
         
          <TextField
            value={inputs.splitCount}
            margin="normal"
            variant="outlined"
            id="inputId"
            type={"number"}
            name="splitCount"
            onChange={handleChange}
            placeholder='Number of splits'
          />
          </div>
          <InputLabel sx={labelStyles}>Split Among</InputLabel>
          <TextField
            value={inputs.splitAmong}
            margin="normal"
            variant="outlined"
            name="splitAmong"
            id="inputId"
            onChange={handleChange}
            placeholder='Separate names with comma '
          />
          <InputLabel sx={labelStyles}>Split Category</InputLabel>
          <TextField
            value={inputs.splitCategory}
            margin="normal"
            variant="outlined"
            name="splitCategory"
            id="inputId"
            onChange={handleChange}
            placeholder='Category of expense'
          />
          <Button 
          sx={buttonStyle} variant='contained' color="secondary"
          type="submit">Submit</Button>
        </Box>
      </form>
    </div>
  );
};

export default AddTransaction;
