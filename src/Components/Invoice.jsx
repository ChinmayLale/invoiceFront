import React, { useState, useRef, useEffect } from "react";
import { useReactToPrint } from 'react-to-print';
import DropDownWidget from "./DropDownWidget";
import axios from 'axios';
import DropDownUserWidget from "./DropDownUserWidget";



function Invoice() {
  const [getCopiedData, setCopiedData] = useState(null)
  const [companies, setcompanies] = useState(null)
  const [userIMG, setUserIMG] = useState(null);
  const [invoiceID, setInvoiceID] = useState('');
  const [date, setDate] = useState('');
  const [imageState, setImageState] = useState('');
  const [visible, setvisible] = useState(true);
  const [totalQuant, setTotalQuant] = useState(1);
  const [totalAmount, setTotalAmount] = useState(null)
  const [totalPrice, setTotalPrice] = useState(null);
  const [amountWithTax, setAmountWithTax] = useState(null);
  const [clients, setClients] = useState(null);
  const [tax, settax] = useState(null);
  const [isHavingGST, setISHavingGst] = useState(false);
  const [taxOnAmount, setTaxOnAmount] = useState(null);
  const [generatedBy, setGeneratedBy] = useState(null)
  const [tableData, setTableData] = useState([
    {
      itemId: 1,
      itemName: '',
      itemDesc: '',
      itemAmount: '',
      itemQuant: '',
      itemCost: ''
    },
  ]);
  const [invoicedata, setInvoiceData] = useState([
    {
      tableData,
      invoiceID: '',
      CompanyName: '',
      OwnerName: '',
      CompanyAddressL1: '',
      UserName: '' || getCopiedData ? getCopiedData.UserName : '',
      UserAddressL1: '' || getCopiedData ? getCopiedData.UserAddressL1 : '',
      UserContact: '',
      Date: Date(),
      InvoiceDesc: '',
      Conditions: '',
      CompanyLogo:imageState
    }
  ])



  // ================================================== Handle Print function ===============================================================

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  //============================================ Get Copied Invoice Data =================================================================
  useEffect(() => {
    const copiedData = JSON.parse(localStorage.getItem('copiedInvoice'))
    if (copiedData) {
      // console.log(copiedData);
      setCopiedData(copiedData[0]);
      localStorage.removeItem('copiedInvoice')
      console.log("Copied Data Found !")
      console.log(copiedData[0])
    }
  }, [])

  // ======================================= Generate Invoice ID Here =====================================================================

  useEffect(() => {
    const temp = new Date()
    const invoiceNumber = temp.getTime()
    setInvoiceID(invoiceNumber);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setDate(temp.toLocaleDateString('en-US', options));
  }, [])

  // ========================================Table Functions==============================================================================
  const handleInputChange = (event, rowIndex) => {
    const { name, value } = event.target;
    const currentCost = event.target.value; //{`itemCost-${row.itemId}`}
    setTableData((prevData) =>
      prevData.map((row, index) =>
        index === rowIndex ? { ...row, [name]: value } : row
      )
    );
    setInvoiceData({ ...invoicedata, tableData: tableData, TotalBillAmount: totalPrice, TotalQuantity: totalQuant, taxableAmount: amountWithTax ,generatedBy: generatedBy ? generatedBy : addGeneratedBy()});
    console.log(name + " : " + value);
    console.log(currentCost);
  };



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

  // ======================================================================================================================================

  const handleLogoClick = () => {
    const fileInput = document.getElementById('fileinp');
    fileInput.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Error handling: Ensure a file is selected
    if (!file) {
      console.error('Please select a valid image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target.result;
      console.log(base64Image)
      setImageState(base64Image); // Update imageState with base64 data
    };

    // Validate file type (optional):
    if (!file.type.match('image.*')) {
      console.error('Only image files are allowed.');
      return;
    }

    reader.readAsDataURL(file);
  };

  // ====================================================================================================================================
  const handleInvoiceDataChange = (event) => {
    const { name, value } = event.target;
    setInvoiceData((prevData) => ({ ...prevData, [name]: value })); 
    console.log(invoicedata);
  };



  // ========================================================hideComponents================================================================

  const addGeneratedBy = async () => {
    const temp = await JSON.parse(localStorage.getItem('cred')).userName
    console.log("============================================", temp);
    setGeneratedBy(temp);
    setInvoiceData((prevData) =>({ ...prevData, generatedBy: temp }));
    return temp;
  }


  const hideButton = async () => {
    await addGeneratedBy();
    const btn = document.getElementById('addItem');
    btn.style.display = 'none';
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(token).token}`
      }
    };
    setInvoiceData((prevData) => ({ ...prevData, generatedBy: generatedBy, CompanyLogo: imageState }));
    console.log("---------------------------------------------------------------------------------------------------------------------");
    // https://invoice-generator-server.vercel.app
    setTimeout(async () => {
      const responce = await axios.post('https://invoice-generator-server.vercel.app/post', invoicedata, config);
      console.log(invoicedata);
      console.log(responce.data);
    }, 1000)
    setTimeout(() => {
      btn.style.display = 'block';
    }, 2000)
  }

  // ================================================== Save Draft Invoice ==================================================================
  const saveDraftInvoice = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(token).token}`
      }
    };
    setInvoiceData((prevData) => ({ ...prevData, generatedBy: generatedBy }));
    const responce = await axios.post('https://invoice-generator-server.vercel.app/draftInvoice', invoicedata, config)
    console.log(responce.data);
    if (responce.status === 200) {
      alert('Draft Saved !')
    }
  }
  // ============================================== Company Select Box Functions    ==============================================

  useEffect(() => {
    async function getData() {
      try {
        const token = localStorage.getItem('token');
        const admin = JSON.parse(localStorage.getItem('cred'));
        console.log("User Who Logged In Is : ", admin.userName)
        const config = {
          headers: {
            Authorization: `Bearer ${JSON.parse(token).token}`
          }
        };
        const request = await axios.get('https://invoice-generator-server.vercel.app/companyList', config)
        const data = await request.data
        console.log('Company List Data From Backed Recived')
        const filteredData = data.filter(obj => obj.username === admin.userName);
        console.log(filteredData);
        setcompanies(filteredData);

      } catch (error) {
        console.log(error)
      }
    }
    getData();
    companies ? console.log(companies) : console.log("No data")
  }, []);

  const handleCompanySelect = (selectedCompany, e) => {
    const { name, value } = e.target;
    console.log('Selected company:', selectedCompany);
    setInvoiceData({ ...invoicedata, [name]: value })
    console.log(invoicedata)
  };

  // ======================================calculating Total Quant=============================================================
  useEffect(() => {
    const calculateTotalQuantity = () => {
      const total = tableData.reduce((acc, row) => acc + parseFloat(row.itemQuant || 0), 0);
      setTotalQuant(total);
    };
    calculateTotalQuantity();
  }, [tableData]);

  // =====================================calculating Total amount=============================================================
  useEffect(() => {
    const calculateTotalAmount = () => {
      const total = tableData.reduce((acc, row) => acc + parseFloat(row.itemAmount || 0), 0);
      setTotalAmount(total);
    };
    calculateTotalAmount();
  }, [tableData]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = tableData.reduce((acc, row) => acc + parseFloat(row.itemQuant) * parseFloat(row.itemAmount), 0);
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [tableData]);

  // ====================================== Handle Delete Row =======================================================================

  const handleDeleteRow = (rowIndex) => {
    const updatedTableData = tableData.filter((_, index) => index !== rowIndex);
    setTableData(updatedTableData);
  };

  // =============================================== User Select Box Functions =======================================================

  useEffect(() => {
    async function getData() {
      try {
        const token = localStorage.getItem('token');
        const admin = JSON.parse(localStorage.getItem('cred'));
        console.log("User Who Logged In Is : ", admin.userName)
        const config = {
          headers: {
            Authorization: `Bearer ${JSON.parse(token).token}`
          }
        };
        const request = await axios.get('https://invoice-generator-server.vercel.app/userList', config)
        const data = await request.data
        console.log('UserList Data From Backed Recived - ', admin.userName);
        const filteredData = data.filter((obj) => obj.registeredBy === admin.userName);
        console.log(filteredData);
        setClients(filteredData);

      } catch (error) {
        console.log(error)
      }
    }
    getData();
    companies ? console.log("User Data Recived") : console.log("No data")
  }, []);


  const handleUserSelect = (selectedCompany, e) => {
    const { name, value } = e.target;
    console.log('Selected Client:', selectedCompany);
    setInvoiceData({ ...invoicedata, [name]: value })
    console.log(invoicedata)
  };



  // ========================================================================================================================================


  return (
    <div className="cont flex-[4] flex items-center justify-center bg-stone-100 h-fit p-10 ml-5">
      <div className=" border-gray-400 border-2 pl-6 pr-6 bg-white w-[100%]" ref={contentToPrint}>
        <div className="flex justify-between items-end pb-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Invoice #<input type="number" className="text-left" onChange={handleInvoiceDataChange} placeholder={invoiceID} id='invoiceID' value={invoicedata.invoiceID} name="invoiceID" /></h1>
            <p className="text-xs">{date}</p>
          </div>
          <button onClick={handleLogoClick}>Upload Logo</button>
          <input type="file" id="fileinp" accept="image/*" onChange={handleFileChange} hidden />
          {imageState && <img src={imageState} alt="Uploaded Logo" className="relative bg-cover w-[100px] h-[100px]" />}
        </div>

        <div className="infodiv flex flex-row-reverse items-center justify-between">
          <div className="text-right">
            <div className="p-0 mb-1 w-fit">
              <b className="p-0 mb-1 flex flex-col items-end  bg-white-100 w-fit">
                {companies &&
                  <DropDownWidget companies={companies} onSelect={handleCompanySelect} className="text-right" onChange={handleInvoiceDataChange} placeholder="Company Name" id='CompanyName' value={invoicedata.CompanyName} name="CompanyName"
                    visible={visible} gst={() => { setISHavingGst(true) }} />}</b>
            </div>
            <p className="p-0 mb-1"><textarea type="text" className="text-right" onChange={handleInvoiceDataChange} placeholder="Address Line 1" id='CompanyAddressL1' value={invoicedata.CompanyAddressL1} name="CompanyAddressL1" />,</p>
            {/* <p className="p-0 mb-1"><input type="text" className="text-right" onChange={handleInvoiceDataChange} placeholder="Address Line 2" id='CompanyAddress2' value={invoicedata.CompanyAddressL2} name="CompanyAddressL2" />,</p>
            <p className="p-0 mb-1"><input type="text" className="text-right" onChange={handleInvoiceDataChange} placeholder="City , State" id='CompanyAddress3' value={invoicedata.CompanyAddressL3} name="CompanyAddressL3" />,</p>
            <p className="p-0 mb-1"><input type="text" className="text-right" onChange={handleInvoiceDataChange} placeholder="City , State" id='CompanyAddress4' value={invoicedata.CompanyCountry} name="CompanyCountry" /></p> */}
          </div>

          <div className="h-px bg-gray-300 my-4" />

          <div>
            <p className="p-0 mb-1">
              <b>Bill to:</b>
            </p>
            <b className="p-0 mb-1 flex flex-col items-end  bg-white-100 w-fit">
              {clients && clients.length > 1 &&
                <DropDownUserWidget companies={clients} onSelect={handleUserSelect} className="text-left" onChange={handleInvoiceDataChange} placeholder="Client Name" id='UserName' value={invoicedata.UserName} name="UserName"
                  visible={visible} />}</b>
            <p className="p-0 mb-1"><textarea type="text" className="text-left" onChange={handleInvoiceDataChange} placeholder="User Address Line 1" id='UserAddressL1' value={invoicedata.UserAddressL1} name="UserAddressL1" />,</p>
            {/* <p className="p-0 mb-1"><input type="text" className="text-left" onChange={handleInvoiceDataChange} placeholder="User Address Line 2" id='UserAddressL2' value={invoicedata.UserAddressL2} name="UserAddressL2" />,</p>
            <p className="p-0 mb-1"><input type="text" className="text-left" onChange={handleInvoiceDataChange} placeholder="City , State , Country" id='UserCountry' value={invoicedata.UserCountry} name="UserCountry" /></p> */}
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
              <th className="text-left font-bold py-2">SrNo.</th>
              <th className="text-left font-bold py-2">Item Name</th>
              <th className="text-left font-bold py-2">Description</th>
              <th className="text-left font-bold py-2">Unit Price</th>
              <th className="text-left font-bold py-2">Quantity</th>
              <th className="text-left font-bold py-2">Amount</th>
              <th className={`text-left font-bold py-2 ${visible ? 'block' : 'hidden'}`}>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={row.itemId} className="border-b border-gray-300 h-full">
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
                    onChange={(e) => { handleInputChange(e, rowIndex) }}
                    className="w-[150px]"
                  />
                </td>
                <td className="py-2 h-fit resize-none overflow-hidden">
                  <textarea
                    type="text"
                    placeholder="Item Desc"
                    value={row.itemDesc}
                    name="itemDesc" //Name
                    id={`itemDesc-${rowIndex}`} // Unique ID
                    onChange={(e) => handleInputChange(e, rowIndex)}
                    className="w-[275px]"
                    style={{ height: 'auto', minHeight: '50px' }} // Adjust minHeight as necessary
                    onInput={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                  />
                </td>
                <td className="py-2">
                  ₹ <input
                    type="text"
                    placeholder="100"
                    value={row.itemAmount}
                    name="itemAmount" //Amount
                    id={`itemAmount-${row.itemId}`}
                    onChange={(e) => { const val = parseFloat(e.target.value); if (val < 0) { e.target.value = Math.abs(val); } handleInputChange(e, rowIndex) }}
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
                    onChange={(e) => { const val = parseFloat(e.target.value); if (val < 0) { e.target.value = Math.abs(val); } handleInputChange(e, rowIndex) }}
                    className="w-[50px]"
                  />
                </td>
                <td className="py-2" >
                  ₹ <input
                    type="text"
                    placeholder="8"
                    value={row.itemQuant * row.itemAmount}
                    id={`itemCost-${row.itemId}`}
                    name="itemCost"         //Cost
                    onChange={(e) => handleInputChange(e, rowIndex)}
                    className="w-[60px]"
                  /></td>
                <td className="py-2">
                  <i
                    className={`ri-delete-bin-6-line text-xl cursor-pointer text-black ${visible ? 'block' : 'hidden'}`}
                    onClick={() => handleDeleteRow(rowIndex)}
                  ></i>
                </td>
              </tr>


            ))}
            <tr>
              <td></td>
              <td></td>
              <td className="text-left font-bold py-2">Total </td>
              <td >₹ {totalAmount}</td>
              <td>{totalQuant}</td>
              <td >₹ {totalPrice}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td ></td>
              <td ></td>
              <td></td>
              <td ></td>
            </tr>
            {isHavingGST && <><tr>
              <td></td>
              <td></td>
              <td ></td>
              <td className="text-left font-bold py-2">Tax : </td>
              <td><input
                type="text"
                placeholder="tax %"
                // value={amountWithTax}
                id={`Tax`}
                name="Tax"
                onChange={(e) => { setAmountWithTax(((e.target.value * totalPrice) / 100) + totalPrice); settax(e.target.value); setTaxOnAmount(((e.target.value * totalPrice) / 100) + totalPrice) }}
                className="w-[40px]"
              /></td>
              <td >₹ {amountWithTax}</td>
            </tr>
              <tr>
                <td></td>
                <td></td>
                <td ></td>
                <td className="text-left font-bold py-2"> Tax Amount : </td>
                <td><input
                  type="text"
                  placeholder="tax %"
                  value={`₹ ${totalAmount * tax / 100}`}
                  id={`TaxAmount`}
                  name="Tax"
                  // onChange={(e) =>{setAmountWithTax(((e.target.value*totalPrice)/100)+totalPrice)} }
                  className="w-[40px]"
                  readOnly
                /></td>
                <td ></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td ></td>
                <td className="text-left font-bold py-2">CGST : </td>
                <td><input
                  type="text"
                  placeholder="tax %"
                  value={tax / 2}
                  id={`Tax`}
                  name="Tax"
                  // onChange={(e) =>{setAmountWithTax(((e.target.value*totalPrice)/100)+totalPrice)} }
                  className="w-[40px]"
                /></td>
                <td ></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td ></td>
                <td className="text-left font-bold py-2">SGST : </td>
                <td><input
                  type="text"
                  placeholder="tax %"
                  value={tax / 2}
                  id={`Tax`}
                  name="Tax"
                  className="w-[40px]"
                /></td>
                <td ></td>
              </tr></>}
          </tbody>
        </table>


        {/* =========================================================================================================================== */}

        <button id="addItem" className="bg-green-100 p-2 rounded-md border-green-300 text-green-800 text-sm m-5" onClick={handleAddRow}>+ Add Item</button>


        {/* =========================================================================================================================== */}
        <div className="bg-blue-100 p-3 rounded-md border-blue-300 text-blue-800 text-sm mt-9">
          <input type="text" className="text-left w-[90%] bg-blue-100" onChange={handleInvoiceDataChange} placeholder="Terms & Conditions Applied here" id='Conditions' value={invoicedata.Conditions} name="Conditions" />
        </div>

        <div className="h-px bg-gray-300 my-4" />
        <div className="text-gray-400 text-sm">Invoice #{invoiceID}</div>
      </div>

      <button className="absolute bottom-[1vh] left-[10vw] w-fit h-fit p-4 bg-green-200 font-bold text-green-900 rounded-lg z-30"
        onClick={async () => {
          hideButton();
          setvisible(false);
          // handlePrint(null, () => contentToPrint.current);
          setTimeout(() => {
            handlePrint(null, () => contentToPrint.current);
          }, 10);
        }}>Print</button>

      <button className=" absolute bottom-[1vh] left-[2vw] w-fit h-fit p-4 bg-red-200 font-bold text-red-900 rounded-lg"
        onClick={saveDraftInvoice}>Save Draft</button>
    </div>
  );
}

export default Invoice;
