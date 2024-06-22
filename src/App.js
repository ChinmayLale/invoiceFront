import React, { useState , useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import Invoice from "./Components/Invoice";
import NavBar from "./Components/NavBar";
import DashBoard from "./Components/DashBoard";
import SideMenuBar from "./Components/SideMenuBar";
import HistoryInvoices from "./Components/HistoryInvoices";
import AddCompany from "./Components/AddCompany";
import AddCustomUser from "./Components/AddCustomUser";
import DraftInvoicesData from "./Components/DraftInvoicesData";
import SignupForm from "./Components/SignupForm";

function App() {
   const [isLogedIn, setIsLogedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken(token);
      console.log(decodedToken)
      if (decodedToken && decodedToken.exp > Date.now() / 1000) {
        setIsLogedIn(true);
      } else {
        localStorage.removeItem("token");
      }
    }
  }, []);

  function handleLogin() {
    const token = localStorage.getItem('token');
    // console.log(token)
    // localStorage.setItem('token',token);
    const decodedToken = decodeToken(token);
    if (decodedToken && decodedToken.exp > Date.now() / 1000) {
      setIsLogedIn(true);
    } else {
      localStorage.removeItem("token");
      alert("Wrong Credentials");
    }
  }

  function handleLOgOut() {
    localStorage.removeItem("token");
    setIsLogedIn(false);
  }

  function decodeToken(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    // console.log(base64)
    return JSON.parse(window.atob(base64));
  }
  

  return (
    <>
      {isLogedIn ? (
        <>
          <NavBar handleLOgOut = {handleLOgOut}/>
          <div className="container flex overflow-x-hidden items-start h-fit bg-slate-100">
            <SideMenuBar />
            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/newInvoice" element={<Invoice />} />
              <Route path="/history" element={<HistoryInvoices />} />
              <Route path="/addCompany" element={<AddCompany />} />
              <Route path="/addCustomUser" element={<AddCustomUser />} />
              <Route path="/draftInvoice" element={<DraftInvoicesData />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage handleLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </>
  );
}

export default App;
