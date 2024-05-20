import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import DropDownWidget from "./DropDownWidget";




function DashBoard() {

  const [companies, setcompanies] = useState(null)
  const [inputValue, setInputValue] = useState("");
  const selectRef = useRef(null);

  useEffect(() => {
    async function getData() {
      try {
        const request = await axios.get('http://localhost:8000/companyList')
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


  const openSelect = async () => {
    if (selectRef.current) {
      selectRef.current.focus(); // Focus on the select to open it
    }
  };
  // ==========================================================================================================================
  const handleCompanySelect = (selectedCompany) => {
    console.log('Selected company:', selectedCompany);
  };

  return (
    <div className='flex-[4] bg-white h-[90vh]'>
      DashBoard
      <h1>hello world</h1>


      {/* <div className="selectBox w-[100%] max-h-[25%] overflow-y-auto flex flex-row items-center justify-center bg-indigo-50">
        <label htmlFor="companyName">companyName</label> 
        <input type="text" placeholder="Name" className="relative" value={inputValue} onInput={openSelect} onChange={(e) => { setInputValue(e.target.value.toLowerCase()); }} />
        <select name="companyName" id="" className="relative w-[20%]" onChange={(e) => { console.log(e.target.value) }} ref={selectRef}>
          <option value="Company Name">company Name</option> 
          {companies && companies.filter((company) =>
            company.companyName.toLowerCase().startsWith(inputValue)
          ).map((obj) =>
            (<option value={obj.companyName}>{obj.companyName}</option>)
          )}
        </select>

     
        
      </div> */}

      {companies && <DropDownWidget companies={companies} onSelect={handleCompanySelect} />}


    </div>
  )
}

export default DashBoard