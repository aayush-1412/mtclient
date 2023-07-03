import React, { useEffect, useState } from "react";
import axios from "axios";
import Transaction from "./Transaction";
import ResponsiveAppBar from "./Navbar";

const UserTransactions = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios
      .get(`https://mtserver-r8v0.onrender.com/api/transaction/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);
  
  return (
    <div>
   
      {user &&
        user.transactions &&
        user.transactions.map((transaction, index) => (
          <Transaction
          id={transaction._id}
            key={index}
            isUser={true}
            title={transaction.title}
            description={transaction.description}
            totalExpense={transaction.totalExpense}
            splitCount={transaction.splitCount}
            splitAmong={transaction.splitAmong}
            splitCategory={transaction.splitCategory}
            userName={user.name}
          />
        ))}
    </div>
  );
};

export default UserTransactions;
