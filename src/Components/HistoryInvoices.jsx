import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function HistoryInvoices() {

    const [rowData, setRowData] = useState(null);
    const [tableData, setTableData] = useState(null);
    const [generatedBy , setGeneratedBy] = useState(null)
    const [ delInvoiceID , setDelInvoiceID] = useState(null);
    const [refresh , setRefresh] = useState(false);
    const navi = useNavigate();
    
    useEffect(()=>{
        const temp = JSON.parse(localStorage.getItem('cred')).userName
        console.log(temp);
        setGeneratedBy(temp);
      },[])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token).token}`
                    }
                };
                //https://invoice-generator-server.vercel.app
                //http://localhost:8000
                const response = await axios.get('https://invoice-generator-server.vercel.app/tableData', config);
                const d = response.data;
                // const filterHistory = d.filter((obj)=>obj.generatedBy===generatedBy);
                const rowsWithId = d.map((row, index) => ({ ...row, id: index+1 }));
                setRowData(rowsWithId);
                console.log("Row Data Set & Data is \n\n");
                console.log(d);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        // Initial fetch
        fetchData();

        // Fetch data every 1 minute
        const intervalId = setInterval(fetchData, 10000);

        //CleanUp 
        return () => clearInterval(intervalId);
    }, []);

    const copyInvoice = async (params) => {
        console.log(params);
      
        // Check if params.row exists before accessing it
        const clickedRow = params.row ? params.row :'';
        if (params.row) {
          
          console.log('Clicked on row details:');
          console.log(clickedRow.UserName);
        } else {
          console.error('Missing row data in params');
        }
      
        console.log("table Data is ");
        console.log(tableData);
        const CopyData = await tableData.filter((obj) => obj.UserName===clickedRow.UserName);
        console.log(CopyData);
        localStorage.setItem("copiedInvoice", JSON.stringify(CopyData));
        navi('/newInvoice');
      };
      
   

    useEffect(() => {
        var data = null
        if (rowData && generatedBy) {
            const filteredData = rowData.filter(obj => obj.generatedBy === generatedBy);
            console.log("----------------------------------------------------------")
            console.log(filteredData)
            setTableData(filteredData);
            console.log("Filtered Data : ");
            console.log(tableData)
        }
        else {
            console.log("Error")
        }
        console.log(tableData)
    }, [rowData,generatedBy]);


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'UserName', headerName: 'Client Name', width: 150 },
        { field: 'CompanyName' || 'companyName', headerName: 'Company Name', width: 170 },
        { field: 'UserContact', headerName: 'Client Contact', width: 160 },
        {
            field:'status',
            headerName:'Current Status',
            width:120,
            renderCell:(params)=>{
                if(params.row.status==='unpaid'){
                    return (<div className='flex flex-row w-fit h-full items-center'><div className="flex flex-row items-center justify-center bg-red-400 m-1 h-[50%] text-center p-2 rounded-lg font-medium text-red-950 cursor-pointer">{(params.row.status).toUpperCase()}</div></div>)
                }
                else if(params.row.status==='paid'){
                    // console.log(params);
                    return(<div className='flex flex-row w-fit h-full items-center'><div className="flex flex-row items-center justify-center bg-green-400 m-1 h-[50%] text-center p-2 rounded-lg font-medium text-green-950 cursor-pointer">{(params.row.status).toUpperCase()}</div></div>)
                }
                else if(params.row.status==='sent'){
                    // console.log(params);
                    return(<div className='flex flex-row w-fit h-full items-center'><div className="flex flex-row items-center justify-center bg-blue-400 m-1 h-[50%] text-center p-2 rounded-lg font-medium text-blue-950 cursor-pointer">{params.row.status}</div></div>)
                }
            }
        },
        {
            field: 'Current Status',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
                return (
                    <div className='flex flex-row w-fit h-full items-center'>
                        <button className='bg flex flex-row items-center justify-center bg-green-300 m-1 h-[50%] text-center w-[40%] px-2 rounded-lg font-medium text-green-950' onClick={()=>{copyInvoice(params)}}>Copy</button>

                        <button className='bg flex flex-row items-center justify-center bg-red-300 m-1 h-[50%] text-center w-[40%] px-2 rounded-lg font-medium text-red-950' onClick={async()=>{console.log(params.row._id);await setDelInvoiceID(params.row._id);setTimeout(()=>{handleDeleteinVoice()},1000)}}>Delete</button>
                    </div>
                )
            }
        }
    ];

    const handleDeleteinVoice = async () => {
        const token = localStorage.getItem('token');
        console.log("Req Recived For Deleting Company With ID : ", delInvoiceID);
        const config = {
          headers: {
            Authorization: `Bearer ${JSON.parse(token).token}`,
          },
        };
        try {
          const response = await axios.post(`https://invoice-generator-server.vercel.app/deleteCustominvoice`,{delInvoiceID}, config);
          if (response.status === 200) {
            alert("Invoice Deleted");
          }
          setRefresh(!refresh);
        } catch (error) {
          console.error("Error deleting Client:", error);
        }
      };
 

    
    return (
        <div className=' flex-[4] bg-slate-50 h-fit flex-col'>
            <div className="heading w-full h-[10%] pt-[1%]">
                <h1 className=' font-medium text-3xl text-center font-sans'>Your Invoices</h1>
            </div>
            <div className="historyInfo w-full flex flex-row items-center justify-center mt-3 ">
                <div style={{ height: 600, width: '90%' }} >
                    {tableData && <DataGrid
                        rows={tableData}
                        getRowId={(row) => row.id}
                        className='bg-slate-100 text-yellow-100 w-full'
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 8 },
                            },
                        }}
                        pageSizeOptions={[5, 8, 10]}
                        // onRowClick={copyInvoice}
                        checkboxSelection
                        autosizeOnMount
                    />}
                </div>
            </div>
        </div>
    )
}

export default HistoryInvoices