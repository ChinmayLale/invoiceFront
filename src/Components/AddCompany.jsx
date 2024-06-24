import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';


function AddCompany() {
    const [companyName, setcompanyName] = useState('');
    const [ownerName, setownerName] = useState('');
    const [email, setemail] = useState('');
    const [gstNumber, setgstNumber] = useState(0);
    const [contactNumber, setcontactNumber] = useState(0)
    const [addState, setaddState] = useState('');
    const [country, setcountry] = useState('')
    const [companyList, setCompanyList] = useState([''])
    const [getUser, setUser] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [deleteCopm , setDeleteComp] = useState(null);


    useEffect(() => {
        async function getCompanyList() {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token).token}`
                }
            };
            const response = await axios.get('https://invoice-generator-server.vercel.app/companyList', config);
            setCompanyList(response.data);
            console.log(response.data)
        }
        getCompanyList();
    }, [refresh])

 

    const handleDefalut = async (e) => {
        // e.preventDefault();
        const data = { companyName, ownerName, email, gstNumber, contactNumber, addState, country, username: getUser }
        if (companyName === '' || ownerName === '' || email === '' || gstNumber === '' || contactNumber === '' || addState === '' || country === '' || !email.includes('@')) {
            alert('please fill all the fields with proper data');
            return;
        }
        // console.log(data)
        const token = localStorage.getItem('token');
        // console.log(token);
        const config = {
            headers: {
                Authorization: `Bearer ${JSON.parse(token).token}`
            }
        };
        try {
            const response = await axios.post("https://invoice-generator-server.vercel.app/addcompany", data, config);
            console.log("Data sent successfully:"); // Handle successful response
            // console.log(response.data.result);
            if (response.data.result) {
                alert("Company Added");
                setRefresh(!refresh);
            }
            else {
                alert("Duplicate Entry Found")
            }
        } catch (error) {
            console.error("Error sending data:", error); // Handle 
        }
    }

    const handleRowClick = async(params) => {
        const clickedRow =await params.row;
        console.log('Clicked on row details:',clickedRow);
        setDeleteComp(clickedRow._id);
        setcompanyName(clickedRow.companyName);
        setownerName(clickedRow.ownerName);
        setemail(clickedRow.email)
        setgstNumber(clickedRow.gstNumber);
        setaddState(clickedRow.addState);
        setcountry(clickedRow.country)
      };

      const handleDeleteCompany = async () => {
        const token = localStorage.getItem('token');
        // console.log(JSON.parse(token).token)
        console.log("Req Recived For Deleting Company With ID : ", deleteCopm);
        const config = {
          headers: {
            Authorization: `Bearer ${JSON.parse(token).token}`,
          },
        };
        try {
          const response = await axios.post(`https://invoice-generator-server.vercel.app/deletecompany`,{deleteCopm}, config);
          if (response.status === 200) {
            alert("Company Deleted");
          }
          setRefresh(!refresh);
        } catch (error) {
          console.error("Error deleting company:", error);
        }
      };


    const columns = [
        { field: 'companyName', headerName: "Company Name", width: 150 },
        { field: 'ownerName', headerName: "Owner", width: 150 },
        { field: 'email', headerName: "Contact", width: 100 },
        {
            field: 'Current Status',
            headerName: 'Action',
            width: 120,
            renderCell: (params) => {
                return (
                    <div className='relative flex flex-row items-center justify-center gap-4'>
                        <button onClick={handleDeleteCompany} className='relative flex flex-row items-center justify-center w-fit px-2 py-1 m-1 bg-red-300 text-red-900 h-[80%] rounded-xl text-sm'>Delete</button>
                        <button className='relative flex flex-row items-center justify-center w-fit px-2 py-1 m-1 bg-green-300 text-green-900 h-[80%] rounded-xl text-sm' onClick={()=>{handleRowClick(params)}} >Edit</button>
                    </div>
                )
            }
        }
    ];

    const filteredCompanyList = companyList ? companyList.filter(company => company.username === getUser) : [];
    

    return (
        <div className='relative flex-[4]  h-fit w-[100%] flex flex-col overflow-x-hidden bg-white'>
            <h1 className="text-3xl font-semibold text-center m-2">Add Company info here For Faster generation of invoices</h1>
            <div className="getonfo mt-5  w-[60%]">
                <form className="max-w-[80%] mx-auto" onSubmit={handleDefalut}>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="CompanyName" id="CompanyName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                            onChange={(e) => setcompanyName(e.target.value)} value={companyName} />

                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company Name</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="OwnerName" id="OwnerName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                            onChange={(e) => setownerName(e.target.value)} value={ownerName} />
                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Owner Name</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="email" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setemail(e.target.value)} value={email} />
                        <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company Email</label>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setgstNumber(e.target.value)} value={gstNumber} />
                            <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">GST Number</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setcontactNumber(e.target.value)} value={contactNumber} />
                            <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contact Number</label>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setaddState(e.target.value)} value={addState} />
                            <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">State</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_company" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setcountry(e.target.value)} value={country} />
                            <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Country</label>
                        </div>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={(e) => { handleDefalut(e) }}>Submit</button>
                </form>

            </div>

            <div className='companyLists w-[80%] h-[80vh] bg-white p-5 flex flex-col'>
                <h1 className="text-3xl font-semibold text-left m-2">Previously Registered Companies</h1>
                {filteredCompanyList && <DataGrid
                    rows={filteredCompanyList}
                    getRowId={(row) => row._id}
                    columns={columns}
                    // onRowClick={handleRowClick}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 6 },
                        },
                    }}
                    pageSizeOptions={[6, 10]}
                    checkboxSelection
                    autoHeight
                />}
            </div>
        </div>
    )
}

export default AddCompany