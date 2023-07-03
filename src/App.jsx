import Auth from "./components/Auth";
import AddTransaction from "./components/AddTransaction";
import Transactions from "./components/Transactions";
import UserTransactions from "./components/UserTransactions";
import TransactionDetail from "./components/TransactionDetail";
// import Header from "./components/Header";
import { Route, Routes, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { authActions } from "./store";
import Home from "./components/Home";
import "./index.css"
import ResponsiveAppBar from "./components/Navbar";


function App() {
  const dispatch=useDispatch()
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(()=>{
    if(localStorage.getItem('userId')){
          dispatch(authActions.login())
    }
  },[dispatch])

  return (
    <div className="page-container" >
    <div className="content-wrap" >

 <ResponsiveAppBar/>
        <Routes>
          {!isLoggedIn ? (
            
            <>
            <Route path="/" element={<Home/>} />
            <Route path="/auth" element={<Auth />} />
            </>
          ) : (
              <>
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/transactions/add" element={<AddTransaction />} />
              <Route path="/myTransactions" element={<UserTransactions />} />
              <Route
                path="/myTransactions/:id"
                element={<TransactionDetail />}
              />{" "}
              </>
            
          )}
        </Routes>
</div>
        <Footer />
     
    
    </div>
  );
}

export default App;
