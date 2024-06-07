import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import DropDownWidget from "./DropDownWidget";




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
        const request = await axios.get('https://invoice-backend-aszjo8zbu-astrochinmays-projects.vercel.app/companyList',config)
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
    <div className='flex-[4] bg-white h-[90vh]'>
      DashBoard
      <h1>hello world</h1>

      {companies && <DropDownWidget companies={companies} onSelect={handleCompanySelect} />}


    </div>
  )
}

export default DashBoard