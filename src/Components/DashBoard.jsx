import axios from "axios";
import React, { useEffect, useState } from "react";




function DashBoard() {

  const [companies, setcompanies] = useState(null)

  useEffect(() => {
    async function getData(){
      try {
        const request = await axios.get('http://localhost:8000/companyList')
        const data = await request.data
        console.log('Data From Backed Recived')
        setcompanies(()=>data)
      } catch (error) {
        console.log(error)
      }
    }
    getData();
    companies ? console.log(companies) : console.log("No data")
  }, []);


  return (
    <div className='flex-[4] bg-white h-[90vh]'>
      DashBoard
      <h1>hello world</h1>
      {companies && companies.map((obj)=>{
       return <h1>{obj.companyName}</h1>
      })}
    </div>
  )
}

export default DashBoard