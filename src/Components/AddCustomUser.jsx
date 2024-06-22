import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

function AddCustomUser() {
    const [UserName, setUserName] = useState(null);
    const [email, setemail] = useState(null);
    const [gstNumber, setgstNumber] = useState(null);
    const [contactNumber, setcontactNumber] = useState(null)
    const [addState, setaddState] = useState(null);
    const [country, setcountry] = useState(null)
    const [getUserList, setUserList] = useState([]);
    const [ filteredUsers , setFilteredUsers]=useState(null);
    const [refresh , setRefresh] = useState(false);


    useEffect(() => {
        async function getUserList() {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token).token}`
                }
            };
            // https://invoice-generator-server.vercel.app/
            const response = await axios.get('https://invoice-generator-server.vercel.app/userList',config);
            const d = response.data
            const getUser = JSON.parse(localStorage.getItem('cred'))
            const filteredCompanyList = d.filter((obj) => obj.registeredBy === getUser.userName) ;
            setFilteredUsers(filteredCompanyList);
            setUserList(response.data)
        }
        getUserList();
    }, [refresh])

    const columns = [
        { field: 'username', headerName: "Client Name", width: 150 },
        { field: 'email', headerName: "Client Email", width: 150 },
        { field: 'contactNumber', headerName: "Contact", width: 100 },
        {
            field: 'Action',
            headerName: 'Action',
            width: 80,
            renderCell: (params) => {
              const handleDelete = async () => {
                const userId = params.row._id; // Get user ID from the row object
                const token = localStorage.getItem('token');
                const config = {
                  headers: {
                    Authorization: `Bearer ${JSON.parse(token).token}`,
                  },
                };
                try {
                  const response = await axios.delete(
                    `https://invoice-generator-server.vercel.app/deleteUser/${userId}`,
                    config
                  );
                  if (response.status === 200) {
                    const updatedUserList = getUserList.filter(
                      (user) => user._id !== userId
                    );
                    setUserList(updatedUserList);
                    setFilteredUsers(updatedUserList.filter((obj) => obj.registeredBy === JSON.parse(localStorage.getItem('cred')).userName));
                    alert('Client Deleted Successfully!');
                  } else {
                    alert('Error Deleting Client!');
                  }
                } catch (error) {
                  console.error('Error deleting user:', error);
                  alert('Error Deleting Client!');
                }
              };
      
              return (
                <>
                  <button className="relative flex flex-row items-center justify-center w-fit px-2 py-1 m-1 bg-red-300 text-red-900 h-[80%] rounded-xl" onClick={handleDelete}>
                    Delete
                  </button>
                </>
              );
            },
          },
    ];
  

    const handleDefalut = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('cred'));
        console.log(user)
        const temp = user.userName;
        console.log(temp)
        const data = { username:UserName, email, gstNumber, contactNumber, addState, country , registeredBy:temp }
        console.log(data)
        const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token).token}`
                }
            };
        try {
            const response = await axios.post("https://invoice-generator-server.vercel.app/addCustomUser", data,config);
            console.log("Client sent successfully:"); // Handle successful response
            console.log(response);
            if(response.status===200){
                alert("Client Added");
                setRefresh(!refresh)
            }
            else if(response.status === 404){
                alert("Client Already Exist");
            }
        } catch (error) {
            console.error("Error sending data:", error); // Handle errors
            alert('Somthing went wrong Try again')
        }
    }

    // const getUser = JSON.parse( localStorage.getItem('cred'));
    // console.log(getUser.userName);
    // const filteredCompanyList =getUserList ? getUserList.filter((obj) => obj.username === getUser.userName) :[''];

    return (
        <div className='relative flex-[4]  h-[90vh] w-full flex flex-col bg-white'>
            <h1 className="text-3xl font-semibold text-center m-2">Save Client info here For Faster generation of invoices</h1>
            <div className="getonfo mt-5  w-[60%]">
                <form className="max-w-[80%] mx-auto">
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="UserName" id="UserName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                            onChange={(e) => setUserName(e.target.value)} value={UserName} />

                        <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Client Name</label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input type="email" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setemail(e.target.value)} value={email} />
                        <label for="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Client Email</label>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setgstNumber(e.target.value)} value={gstNumber} />
                            <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Postal Code</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setcontactNumber(e.target.value)} value={contactNumber} />
                            <label for="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contact Number</label>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setaddState(e.target.value)} value={addState} />
                            <label for="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">State</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_User" id="floating_User" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setcountry(e.target.value)} value={country} />
                            <label for="floating_User" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Country</label>
                        </div>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={(e) => { handleDefalut(e) }}>Add Client</button>
                </form>

            </div>

            <div className='companyLists w-full h-[80vh] bg-white p-5 flex flex-col'>
                <h1 className="text-3xl font-semibold text-left m-2">Previously Registered Clients</h1>
                {getUserList.length > 5 && <DataGrid
                    rows={filteredUsers}
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