import React, { useState, useRef, useEffect } from "react";
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';



function Invoice() {

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });


  const [userIMG, setUserIMG] = useState(null);
  const [invoiceID, setInvoiceID] = useState('');
  const[date , setDate] = useState('');
  const [tableData, setTableData] = useState([
    {
      itemId: 1,
      itemName: '',
      itemAmount: '',
      itemQuant: '',
      itemCost: ''
    },
  ]);
  const [invoicedata, setInvoiceData] = useState([
    {
      tableData,
      invoiceID:'',
      CompanyName: '',
      OwnerName: '',
      CompanyAddressL1: '',
      CompanyAddressL2: '',
      CompanyAddressL3: '',
      CompanyCountry: '',
      UserName: '',
      UserAddressL1: '',
      UserAddressL2: '',
      UserContact: '',
      UserCountry: '',
      Date: Date(),
      InvoiceDesc: '',
      Conditions: ''
    }
  ])


  // ======================================= Generate Invoice ID Here ==============================================

useEffect(()=>{
  const temp = new Date()
  const invoiceNumber = temp.getTime()
  setInvoiceID(invoiceNumber);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  setDate(temp.toLocaleDateString('en-US', options));
},[])




  // ========================================Table Functions========================================================
  const handleInputChange = (event, rowIndex) => {
    const { name, value } = event.target;
    const currentCost = event.target.value; //{`itemCost-${row.itemId}`}
    setTableData((prevData) =>
      prevData.map((row, index) =>
        index === rowIndex ? { ...row, [name]: value } : row
      )
    );
    setInvoiceData({ ...invoicedata, tableData: tableData });
    console.log(name + " : " + value);
    console.log(currentCost);
  };

  // const handleInputChange = (e, rowIndex) => {
  //   const { name, value } = e.target;
  //   const updatedTableData = [...tableData];
  //   const row = updatedTableData[rowIndex];
  
  //   // Update the corresponding field in the row object
  //   row[name] = value;
  
  //   // Calculate the cost and update the row object
  //   row.itemCost = row.itemAmount * row.itemQuant;
  
  //   // Update the state with the new tableData
  //   setTableData(updatedTableData);
  // };

  const handleAddRow = () => {
    const newRow = {
      itemId: tableData.length + 1,
      itemName: "",
      itemAmount: 0,
      itemQuant: 0,
      itemCost: 0, // Set cost for new row as well
    };
    setTableData([...tableData, newRow]);
  };

  //================================================================================================================

  const handleLogoClick = () => {
    const fileInput = document.getElementById("fileinp");
    fileInput.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => setUserIMG(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleInvoiceDataChange = (event) => {
    const { name, value } = event.target;
    setInvoiceData({ ...invoicedata, [name]: value });
    console.log(invoicedata);
  };

  const hideButton = async () => {
    const btn = document.getElementById('addItem');
    btn.style.display = 'none';
    const responce = await axios.post('http://localhost:8000/post', invoicedata).then((res) => { console.log(res.data) });
    console.log(responce.data);
  }







  return (
    <div className="cont flex-[4] flex items-center justify-center bg-stone-100 h-fit p-10 ml-5">
      <div className=" border-gray-400 border-2 pl-6 pr-6 bg-white w-[100%]" ref={contentToPrint}>
        <div className="flex justify-between items-end pb-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Invoice #<input type="number" className="text-left" onChange={handleInvoiceDataChange} placeholder={invoiceID} id='invoiceID' value={invoicedata.invoiceID} name="invoiceID" /></h1>
            <p className="text-xs">{date}</p>
          </div>
          <div onClick={handleLogoClick}>
            {userIMG && <img src={userIMG} alt="" className="relative bg-cover w-[100px] h-[100px]" />}
            {!userIMG && <><input type="file" className="relative hidden" onInput={(e) => { handleFileChange(e) }} id='fileinp' />
              Company Logo </>}
          </div>
        </div>

        <div className="infodiv flex flex-row-reverse items-center justify-between">
          <div className="text-right">
            <p className="p-0 mb-1">
              <b><input type="text" className="text-right" onChange={handleInvoiceDataChange} placeholder="Company Name" id='CompanyName' value={invoicedata.CompanyName} name="CompanyName" /></b>
            </p>
            <p className="p-0 mb-1"><input type="text" className="text-right" onChange={handleInvoiceDataChange} placeholder="Address Line 1" id='CompanyAddressL1' value={invoicedata.CompanyAddressL1} name="CompanyAddressL1" />,</p>
            <p className="p-0 mb-1"><input type="text" className="text-right" onChange={handleInvoiceDataChange} placeholder="Address Line 2" id='CompanyAddress2' value={invoicedata.CompanyAddressL2} name="CompanyAddressL2" />,</p>
            <p className="p-0 mb-1"><input type="text" className="text-right" onChange={handleInvoiceDataChange} placeholder="City , State" id='CompanyAddress3' value={invoicedata.CompanyAddressL3} name="CompanyAddressL3" />,</p>
            <p className="p-0 mb-1"><input type="text" className="text-right" onChange={handleInvoiceDataChange} placeholder="City , State" id='CompanyAddress4' value={invoicedata.CompanyCountry} name="CompanyCountry" /></p>
          </div>

          <div className="h-px bg-gray-300 my-4" />

          <div>
            <p className="p-0 mb-1">
              <b>Bill to:</b>
            </p>
            <p className="p-0 mb-1"><input type="text" className="text-left" onChange={handleInvoiceDataChange} placeholder="User Name" id='UserName' value={invoicedata.UserName} name="UserName" /></p>
            <p className="p-0 mb-1"><input type="text" className="text-left" onChange={handleInvoiceDataChange} placeholder="User Address Line 1" id='UserAddressL1' value={invoicedata.UserAddressL1} name="UserAddressL1" />,</p>
            <p className="p-0 mb-1"><input type="text" className="text-left" onChange={handleInvoiceDataChange} placeholder="User Address Line 2" id='UserAddressL2' value={invoicedata.UserAddressL2} name="UserAddressL2" />,</p>
            <p className="p-0 mb-1"><input type="text" className="text-left" onChange={handleInvoiceDataChange} placeholder="City , State , Country" id='UserCountry' value={invoicedata.UserCountry} name="UserCountry" /></p>
            <p className="p-0 mb-1"><input type="number" className="text-left" onChange={handleInvoiceDataChange} placeholder="Contact Number" id='UserContact' value={invoicedata.UserContact} name="UserContact" /></p>
          </div>
        </div>
        <div className="h-px bg-gray-300 my-4" />
        <p className="p-0 leading-5"><b>
          <input type="text" className="text-left w-[90%]" onChange={handleInvoiceDataChange} placeholder="Invoice Descroption Here" id='InvoiceDesc' value={invoicedata.InvoiceDesc} name="InvoiceDesc" /></b>
        </p>

        {/* =========================================================================================================================== */}
        <table className="w-full mt-8">
          <thead>
            <tr className="border-b border-gray-300 bg-slate-300">
              <th className="text-left font-bold py-2">Item</th>
              <th className="text-left font-bold py-2">Description</th>
              <th className="text-left font-bold py-2">Unit Price</th>
              <th className="text-left font-bold py-2">Quantity</th>
              <th className="text-left font-bold py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={row.itemId} className="border-b border-gray-300">
                <td className="py-2">
                  <input
                    type="text"
                    placeholder="1"
                    value={row.itemId}
                    id={`itemID-${row.itemId}`}
                    className="w-[25px]"
                    readOnly
                  />
                </td>
                <td className="py-2">
                  <input
                    type="text"
                    placeholder="Item Name"
                    value={row.itemName}
                    name="itemName" //Name
                    id={`itemName-${rowIndex}`} // Unique ID
                    onChange={(e) => handleInputChange(e, rowIndex)}
                    className="w-[220px]"
                  />
                </td>
                <td className="py-2">
                  $<input
                    type="text"
                    placeholder="100"
                    value={row.itemAmount}
                    name="itemAmount" //Amount
                    id={`itemAmount-${row.itemId}`}
                    onChange={(e) => handleInputChange(e, rowIndex)}
                    className="w-[50px]"
                  />
                </td>
                <td className="py-2">
                  <input
                    type="text"
                    placeholder="5"
                    value={row.itemQuant}
                    id={`itemQuant-${row.itemId}`}
                    name="itemQuant"                //Quantity
                    onChange={(e) => handleInputChange(e, rowIndex)}
                    className="w-[50px]"
                  />
                </td>
                <td className="py-2" >
                  $<input
                    type="text"
                    placeholder="8"
                    value={row.itemQuant * row.itemAmount}
                    id={`itemCost-${row.itemId}`}
                    name="itemCost"         //Cost
                    onChange={(e) => handleInputChange(e, rowIndex)}
                    className="w-[60px]"
                  /></td>
              </tr>
            ))}


          </tbody>
        </table>


        {/* =========================================================================================================================== */}

        <button id="addItem" className="bg-green-100 p-2 rounded-md border-green-300 text-green-800 text-sm m-5" onClick={handleAddRow}>+ Add Item</button>

        {/* =========================================================================================================================== */}
        <div className="bg-blue-100 p-3 rounded-md border-blue-300 text-blue-800 text-sm mt-9">
          <input type="text" className="text-left w-[90%] bg-blue-100" onChange={handleInvoiceDataChange} placeholder="Terms & Conditions Applied here" id='Conditions' value={invoicedata.Conditions} name="Conditions" />
        </div>

        <div className="h-px bg-gray-300 my-4" />
        <div className="text-gray-400 text-sm">Invoice #1234</div>
      </div>

      <button className="absolute top-[10vh]  right-[-1%] w-fit h-fit p-3 text-md text-white font-bold bg-blue-800 rounded-lg"
        onClick={() => {
          hideButton();
          handlePrint(null, () => contentToPrint.current);
        }}>Print</button>
    </div>
  );
}

export default Invoice;
