import axios from "axios";
import React, { useEffect, useState } from "react";
import DropDownWidget from "./DropDownWidget";
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';



function DashBoard() {

  const [dashBoardData, setdashBoardData] = useState({})


  useEffect(() => {
    async function getData() {
      try {
        const token = localStorage.getItem('token');
        // console.log(token)
        // console.log(JSON.parse(token))
        const config = {
          headers: {
            Authorization: `Bearer ${JSON.parse(token).token}`
          }
        };
        const username = JSON.parse(localStorage.getItem('cred')).userName;
        console.log('username : ',username);
        //https://invoice-generator-server.vercel.app
        const request = await axios.post('https://invoice-generator-server.vercel.app/dashboard',{username},config);
        const data = await request.data;
        console.log('Data From Backed Recived : \n',data);
        setdashBoardData(data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
    dashBoardData ? console.log(dashBoardData) : console.log("No data")
  }, []);




  return (
    <div className="featured w-[100%] flex justify-between bg-white flex-[4] h-[90vh]">
        <div className="featuredItem flex-1 ml-[20px] mr-[20px] p-[30px] rounded-md cursor-pointer shadow-md h-fit">
            <span className="featured-title text-[20px] font-semibold">
                Total Invoices
            </span>
            <div className="featured-money-container mr-[10px] ml-[10px] flex items-center">
                <span className="featured-money text-[30px] font-semibold">
                    {dashBoardData.totalinvoices}
                </span>
            </div>
    
        </div>

        <div className="featuredItem flex-1 ml-[20px] mr-[20px] p-[30px] rounded-md cursor-pointer shadow-md h-fit">
            <span className="featured-title text-[20px] font-semibold">
                Registerd Clients
            </span>
            <div className="featured-money-container mr-[10px] ml-[10px] flex items-center">
                <span className="featured-money text-[30px] font-semibold">
                    {dashBoardData.totalUsersCount}
                </span>
            </div>
        </div>

        <div className="featuredItem flex-1 ml-[20px] mr-[20px] p-[30px] rounded-md cursor-pointer shadow-md h-fit">
            <span className="featured-title text-[20px] font-semibold">
                Registered Companies
            </span>
            <div className="featured-money-container mr-[10px] ml-[10px] flex items-center">
                <span className="featured-money text-[30px] font-semibold">
                    {dashBoardData.totalCompaniesCount}
                </span>
            </div>
        </div>
    </div>
  )
}

export default DashBoard