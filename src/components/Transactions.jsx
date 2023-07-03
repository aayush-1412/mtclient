import React, { useEffect, useState } from "react";
import axios from "axios";
import Transaction from "./Transaction";
import ResponsiveAppBar from "./Navbar";

const Transactions = () => {
  const [transactions, setTransactions] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("https://mtserver-r8v0.onrender.com/api/transaction")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setTransactions(data.transactions));
  }, []);
 
  return (
    <div>
    
      {transactions &&
        transactions.map((transaction, index) => (
          <Transaction
         
          id={transaction._id}
          isUser={localStorage.getItem("userId")===transaction.user._id}
          title={transaction.title}
          description={transaction.description}
          totalExpense={transaction.totalExpense}
          splitCount={transaction.splitCount}
          splitAmong={transaction.splitAmong}
          splitCategory={transaction.splitCategory}
          userName={transaction.user.name}
           />
        ))}
    </div>
  );
};

export default Transactions;
