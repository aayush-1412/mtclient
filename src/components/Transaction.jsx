import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css";
import ResponsiveAppBar from "./Navbar";

const Transaction = ({
  title,
  description,
  totalExpense,
  splitCount,
  splitAmong,
  splitCategory,
  userName,
  isUser,
  id,
}) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/myTransactions/${id}`);
  };
  const deleteRequest = async () => {
    const res = await axios
      .delete(`https://mtserver-r8v0.onrender.com/api/transaction/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest();
    window.location.reload();
  };
  return (
    <div>
      {" "}
      <Card
        sx={{
          width: "60%",
          margin: "auto",
          backgroundColor: "#202151",
          mt: 2,
          borderRadius: 5,
          padding: 2,
          boxShadow: "10px 10px 15px  rgba(0,0,0,0.37)",
          ":hover": {
            boxShadow: "20px 20px 30px rgba(0,0,0,0.37)",
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "lightblue", color: "darkblue" }}>
                  {userName}
                </Avatar>
              }
            />
            <IconButton sx={{ marginLeft: "auto" }}></IconButton>
            <IconButton onClick={handleEdit}>
              <EditIcon sx={{ color: "lightblue" }} />
            </IconButton>

            <IconButton onClick={handleDelete}>
              <DeleteIcon sx={{ color: "lightblue" }} />
            </IconButton>
          </Box>
        )}

        <Box display="flex" flexDirection="column">
          <b
            id="textId"
            style={{
              margin: 15,
            }}
          >
            {title}
          </b>
          <Typography id="textId" sx={{ marginLeft: 1.7 }} variant="subtitle2">
            About - {description}
          </Typography>
        </Box>

        <CardContent>
          <hr />
          <br />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              margin: "auto",
              padding: "4",
            }}
          >
            <p style={{ color: "lightblue" }}>
              Amount{"   "}: {totalExpense}
            </p>

            <p style={{ color: "lightblue" }}>
              Divisions{"  "}: {splitCount}
            </p>

            <p style={{ color: "lightblue" }}>
              Among{"  "}: {splitAmong}
            </p>

            <p style={{ color: "lightblue" }}>
              Category{"  "}: {splitCategory}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transaction;
