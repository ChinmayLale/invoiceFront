import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

function AddCustomUser() {
    const [UserName, setUserName] = useState('');
    const [email, setemail] = useState('');
    const [gstNumber, setgstNumber] = useState(0);
    const [contactNumber, setcontactNumber] = useState(0)
    const [addState, setaddState] = useState('');
    const [country, setcountry] = useState('')
    const [getUserList, setUserList] = useState([])

    useEffect(() => {
        async function getUserList() {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token).token}`
                }
            };
            const response = await axios.get('https://invoice-generator-server.vercel.app/userList',config);
            console.log(response.data);
            setUserList(response.data)
        }
        getUserList();
    }, [])

    const columns = [
        { field: 'name', headerName: "Client Name", width: 150 },
        { field: 'email', headerName: "Client Email", width: 150 },
        { field: 'phone', headerName: "Contact", width: 100 },
        {
            field: 'Current Status',
            headerName: 'Action',
            width: 80,
            renderCell: (params) => {
                return (
                    <>
                        <button className='relative flex flex-row items-center justify-center w-fit px-2 py-1 m-1 bg-red-300 text-red-900 h-[80%] rounded-xl'>Delete</button>
                    </>
                )
            }
        }
    ];

    const handleDefalut = async (e) => {
        e.preventDefault();
        const data = { UserName, email, gstNumber, contactNumber, addState, country }
        const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token).token}`
                    }
            };
        try {
            const response = await axios.post("https://invoice-generator-server.vercel.app/addCustomUser", data,config);
            console.log("Data sent successfully:", response.data); // Handle successful response
            console.log(response.data);
        } catch (error) {
            console.error("Error sending data:", error); // Handle errors
        }
    }

    return (
        <div className='relative flex-[4]  h-[90vh] w-full flex flex-col bg-white'>
            <h1 className="text-3xl font-semibold text-center m-2">Save Client info here For Faster generation of invoices</h1>
            <div className="getonfo mt-5  w-[60%]">
                <form class="max-w-[80%] mx-auto">
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="text" name="UserName" id="UserName" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                            onChange={(e) => setUserName(e.target.value)} value={UserName} />

                        <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User Name</label>
                    </div>

                    <div class="relative z-0 w-full mb-5 group">
                        <input type="email" name="repeat_password" id="floating_repeat_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setemail(e.target.value)} value={email} />
                        <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User Email</label>
                    </div>
                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setgstNumber(e.target.value)} value={gstNumber} />
                            <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Postal Code</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setcontactNumber(e.target.value)} value={contactNumber} />
                            <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contact Number</label>
                        </div>
                    </div>
                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setaddState(e.target.value)} value={addState} />
                            <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">State</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_User" id="floating_User" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setcountry(e.target.value)} value={country} />
                            <label for="floating_User" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Country</label>
                        </div>
                    </div>
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={(e) => { handleDefalut(e) }}>Add Client</button>
                </form>

            </div>

            <div className='companyLists w-full h-[80vh] bg-white p-5 flex flex-col'>
                <h1 className="text-3xl font-semibold text-left m-2">Previously Registered Companies</h1>
                {getUserList.length > 5 && <DataGrid
                    rows={getUserList}
                    getRowId={(row) => row._id}
                    columns={columns}
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

export default AddCustomUser

// 