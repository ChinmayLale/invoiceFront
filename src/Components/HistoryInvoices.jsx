import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function HistoryInvoices() {

    const [rowData, setRowData] = useState(null);
    const [tableData, setTableData] = useState(null);
    const navi = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token).token}`
                    }
                };
                const response = await axios.get('https://invoice-generator-server.vercel.app/tableData', config);
                const d = response.data;
                setRowData(d);
                console.log("Row Data Set & Data is \n\n");
                console.log(response);
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

    const copyInvoice = (params) => {
        const clickedRow = params.row;
        console.log('Clicked on row details:');
        const copyData = rowData.filter((obj)=>obj.UserName === clickedRow.UserName);
        console.log(copyData[0])
        localStorage.setItem("copiedInvoice",JSON.stringify(copyData))
        navi('/newInvoice')
    }

    useEffect(() => {
        var data = null
        if (rowData) {
            data = rowData.map((obj, index) => ({
                id: index + 1,
                UserName: obj.UserName,
                invoiceID: obj.invoiceID ? obj.invoiceID : '455',
                UserContact: obj.UserContact ? obj.UserContact : '999999999',
                Status: 'Paid'
            }));
            setTableData(data);
            console.log("Filtered Data : ");
            console.log(tableData)
        }
        else {
            console.log("Error")
        }
        console.log(tableData)
    }, [rowData]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'UserName', headerName: 'UserName', width: 150 },
        { field: 'invoiceID', headerName: 'Invoice Id', width: 100 },
        { field: 'UserContact', headerName: 'UserContact', width: 100 },
        {
            field: 'Current Status',
            headerName: 'Action',
            width: 60,
            renderCell: (params) => {
                return (
                    <>
                        <button className='bg flex flex-row items-center justify-center bg-green-300 m-1 h-[60%] text-center w-[100%] p-2 rounded-lg font-semibold' onClick={copyInvoice}>Copy</button>
                    </>
                )
            }
        }
    ];




    return (
        <div className=' flex-[4] bg-slate-50 h-fit flex-col'>
            <div className="heading w-full h-[10%] pt-[1%]">
                <h1 className=' font-medium text-3xl text-center font-sans'>Your Invoices</h1>
            </div>
            <div className="historyInfo w-full flex flex-row items-center justify-center mt-3 ">
                <div style={{ height: 600, width: '90%' }} >
                    {tableData && <DataGrid
                        rows={tableData}
                        className='bg-slate-100 text-yellow-100'
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 8 },
                            },
                        }}
                        pageSizeOptions={[5, 8, 10]}
                        onRowClick={copyInvoice}
                        checkboxSelection
                        autosizeOnMount
                    />}
                </div>
            </div>
        </div>
    )
}

export default HistoryInvoices