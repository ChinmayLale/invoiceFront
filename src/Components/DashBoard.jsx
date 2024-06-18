import axios from "axios";
import React, { useEffect, useState } from "react";
import DropDownWidget from "./DropDownWidget";
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';



function DashBoard() {

  const [companies, setcompanies] = useState(null)


  useEffect(() => {
    async function getData() {
      try {
        const token = localStorage.getItem('token');
        console.log(token)
        console.log(JSON.parse(token))
        const config = {
          headers: {
            Authorization: `Bearer ${JSON.parse(token).token}`
          }
        };
        const request = await axios.get('https://invoice-generator-server.vercel.app/companyList',config)
        const data = await request.data
        console.log('Data From Backed Recived')
        setcompanies(() => data)
      } catch (error) {
        console.log(error)
      }
    }
    getData();
    companies ? console.log(companies) : console.log("No data")
  }, []);


  const handleCompanySelect = (selectedCompany) => {
    console.log('Selected company:', selectedCompany);
  };

  return (
    <div className="featured w-[100%] flex justify-between bg-white flex-[4] h-[90vh]">
        <div className="featuredItem flex-1 ml-[20px] mr-[20px] p-[30px] rounded-md cursor-pointer shadow-md h-fit">
            <span className="featured-title text-[20px] font-semibold">
                Total Invoices
            </span>
            <div className="featured-money-container mr-[10px] ml-[10px] flex items-center">
                <span className="featured-money text-[30px] font-semibold">
                    39,268
                </span>
                {/* <span className="featured-money-rate flex items-center ml-[20px]">
                    -11.65<ArrowDownwardOutlinedIcon style={{color:`red`, fontSize:'14px'}}/>
                </span> */}
            </div>
            {/* <span className="featured-subTitle text-[15px] text-gray-500">
                Compaired To Last Month
            </span> */}
        </div>

        <div className="featuredItem flex-1 ml-[20px] mr-[20px] p-[30px] rounded-md cursor-pointer shadow-md h-fit">
            <span className="featured-title text-[20px] font-semibold">
                Registerd Users
            </span>
            <div className="featured-money-container mr-[10px] ml-[10px] flex items-center">
                <span className="featured-money text-[30px] font-semibold">
                    214151
                </span>
                {/* <span className="featured-money-rate flex items-center ml-[20px]">
                    -11.65<ArrowDownwardOutlinedIcon style={{color:`red`, fontSize:'14px'}}/>
                </span> */}
            </div>
            {/* <span className="featured-subTitle text-[15px] text-gray-500">
                Compaired To Last Month
            </span> */}
        </div>

        <div className="featuredItem flex-1 ml-[20px] mr-[20px] p-[30px] rounded-md cursor-pointer shadow-md h-fit">
            <span className="featured-title text-[20px] font-semibold">
                Your Companies
            </span>
            <div className="featured-money-container mr-[10px] ml-[10px] flex items-center">
                <span className="featured-money text-[30px] font-semibold">
                    18
                </span>
                {/* <span className="featured-money-rate flex items-center ml-[20px]">
                    51.65<ArrowUpwardOutlinedIcon style={{color:`green`, fontSize:'14px'}}/>
                </span> */}
            </div>
            {/* <span className="featured-subTitle text-[15px] text-gray-500">
                Compaired To Last Month
            </span> */}
        </div>
    </div>
  )
}

export default DashBoard