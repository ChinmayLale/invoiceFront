import React, { useState} from "react";
import LoginPage from "./Components/LoginPage";
import Invoice from "./Components/Invoice";
import NavBar from "./Components/NavBar";
import DashBoard from "./Components/DashBoard";
import { Route , Routes } from "react-router-dom";
import SideMenuBar from "./Components/SideMenuBar";
import HistoryInvoices from "./Components/HistoryInvoices";
import AddCompany from "./Components/AddCompany";


function App() {
  const [isLogedIn, setIsLogedIn] = useState(false);
  const localStorageData = localStorage.getItem('auth');

  function handleLogin () {
    if(localStorageData){
      const getUserData = () => {
        const userData = JSON.parse(localStorage.getItem("auth"));
        return userData;
      };
      const data = getUserData();
      console.log(data);
      if(data.userName===null && data.pass === null){
        setIsLogedIn(true);
      }
      else{
        alert('Wrong Credentials')
      }
    }
  }

  return (
    <>
    {isLogedIn ? 
      <>
        <NavBar/>
        <div className="container flex overflow-x-hidden items-start h-full bg-slate-100 ">
            <SideMenuBar />
            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/newInvoice" element={<Invoice />} />
              <Route path="/history" element={<HistoryInvoices />} />
              <Route path="/addCompany" element={<AddCompany/>} />
            </Routes>
          </div>
      </>
      : <LoginPage  handleLogin = {handleLogin}/>}
    </>
  );
}

export default App;
