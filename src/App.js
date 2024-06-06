import React, { useState} from "react";
import LoginPage from "./Components/LoginPage";
import Invoice from "./Components/Invoice";
import NavBar from "./Components/NavBar";
import DashBoard from "./Components/DashBoard";
import { Route , Routes } from "react-router-dom";
import SideMenuBar from "./Components/SideMenuBar";
import HistoryInvoices from "./Components/HistoryInvoices";
import AddCompany from "./Components/AddCompany";
import AddCustomUser from "./Components/AddCustomUser";
import DraftInvoicesData from "./Components/DraftInvoicesData";
import { useDataGridProps } from "@mui/x-data-grid/DataGrid/useDataGridProps";


function App() {
  const [isLogedIn, setIsLogedIn] = useState(false);
  const localStorageData = localStorage.getItem('auth');

  function handleLogin () {
    if(localStorageData){
      var userData;
      const getUserData = () => {
        userData = JSON.parse(localStorage.getItem("token"));
        console.log(userData)
        return userData;
      };
      const data = getUserData();
      console.log(data);
      if(userData){
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
        <div className="container flex overflow-x-hidden items-start h-fit bg-slate-100 ">
            <SideMenuBar />
            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/newInvoice" element={<Invoice />} />
              <Route path="/history" element={<HistoryInvoices />} />
              <Route path="/addCompany" element={<AddCompany/>} />
              <Route path="/addCustomUser" element={<AddCustomUser/>} />
              <Route path="/draftIncoive" element={<DraftInvoicesData/>}/>
            </Routes>
          </div>
      </>
      : <LoginPage  handleLogin = {handleLogin}/>}
    </>
  );
}

export default App;
