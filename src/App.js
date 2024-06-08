import React, { useState } from "react";
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
  // const localStorageData = localStorage.getItem('auth');

  function handleLogin() {
    const userData = JSON.parse(localStorage.getItem("token"));
    if (userData) {
      setIsLogedIn(true);
    } else {
      alert('Wrong Credentials');
    }
  }
  

  return (
    <>
      {isLogedIn ? (
        <>
          <NavBar />
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
