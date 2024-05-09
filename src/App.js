import React, { useState , useEffect } from "react";

function App() {
  const [userIMG, setUserIMG] = useState(null);
  const [company, setCompany] = useState('')
  const [cowner, setCowner] = useState('');
  const [companyadd, setCompanyAdd] = useState('');
  const [invoiceID, setInvoiceID] = useState(255);
  const [item, itemName] = useState('')
  const [quant, itemQuant] = useState(0)
  const [amount , itemAmount] = useState(0)
  const [cost , itemCost] = useState(0)


  const [tableData, setTableData] = useState([
    {
      itemId: 1,
      itemName: item,
      itemAmount: amount,
      itemQuant: quant,
      itemCost: cost
    },
  ]);

  const handleInputChange = (event, rowIndex) => {
    const { name, value } = event.target;
    setTableData((prevData) =>
      prevData.map((row, index) =>
        index === rowIndex ? { ...row, [name]: value } : row
      )
    );
    // console.log(tableData);
    
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Perform any additional actions here after the timeout (optional)
      console.log(tableData); // Example of logging after timeout
    }, 500); // 0.5 seconds timeout
  
    return () => clearTimeout(timeoutId); // Cleanup on unmount
  }, [tableData]);


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

  const handleCompanyChange = () => {
    const data = document.getElementById('companyName');
    setCompany(data.value);
  }

  const handleOwnerChange = () => {
    const data = document.getElementById('c_owner');
    setCowner(data.value);
  }

  const handleaddChange = () => {
    const data = document.getElementById('c_add');
    setCompanyAdd(data.value);

  }

  return (
    <div className="cont w-[100vw] flex items-center justify-center bg-stone-100">
      <div className="w-[40%] border-gray-400 border-2 pl-6 pr-6 bg-white">
        <div className="flex justify-between items-end pb-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Invoice #{invoiceID}</h1>
            <p className="text-xs">January 1, 2025</p>
          </div>
          <div onClick={handleLogoClick}>
            {userIMG && <img src={userIMG} alt="" className="relative bg-cover w-[100px] h-[100px]" />}
            {!userIMG && <><input type="file" className="relative hidden" onInput={(e) => { handleFileChange(e) }} id='fileinp' />
              Company Logo </>}
          </div>
        </div>

        <div className="text-right">
          <p className="p-0 mb-1">
            <b><input type="text" className="text-right" onChange={handleCompanyChange} placeholder="Company Name" id='companyName' value={company} /></b>
          </p>
          <p className="p-0 mb-1">1600 Pennsylvania Avenue NW,</p>
          <p className="p-0 mb-1">Washington,</p>
          <p className="p-0 mb-1">DC 20500,</p>
          <p className="p-0 mb-1">United States of America</p>
        </div>

        <div className="h-px bg-gray-300 my-4" />

        <div>
          <p className="p-0 mb-1">
            <b>Bill to:</b>
          </p>
          <p className="p-0 mb-1">Titouan LAUNAY</p>
          <p className="p-0 mb-1">72 Faxcol Dr Gotahm City,</p>
          <p className="p-0 mb-1">NJ 12345,</p>
          <p className="p-0 mb-1">United States of America</p>
        </div>

        <div className="h-px bg-gray-300 my-4" />

        <p className="p-0 leading-5">
          All items below correspond to work completed in the month of January 2024.
          Payment is due within 15 days of receipt of this invoice.
          This includes non-business days.
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
                    className="w-[25px]"
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
                    className="w-[25px]"
                  />
                </td>
                <td className="py-2" >
                  $<input
                    type="text"
                    placeholder="8"
                    value={row.itemQuant*row.itemAmount}
                    id={`itemCost-${row.itemId}`}
                    name="itemCost"         //Cost
                    onChange={(e) => handleInputChange(e, rowIndex)}
                    className="w-[25px]"
                    readOnly
                  /></td>
              </tr>
            ))}


          </tbody>
        </table>


        {/* =========================================================================================================================== */}

        <button className="bg-green-100 p-2 rounded-md border-green-300 text-green-800 text-sm m-5" onClick={handleAddRow}>+ Add Item</button>

        {/* =========================================================================================================================== */}
        <div className="bg-blue-100 p-3 rounded-md border-blue-300 text-blue-800 text-sm">
          generated by react.
        </div>

        <div className="h-px bg-gray-300 my-4" />
        <div className="text-gray-400 text-sm">Invoice #1234</div>
      </div>
    </div>
  );
}

export default App;
