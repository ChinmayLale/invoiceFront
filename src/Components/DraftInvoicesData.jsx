import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';


function DraftInvoicesData() {
    const[tableData , setTableData] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const [user , setUser] = useState(null);
    const [filteredData , setFilterdData] = useState(null);


    useEffect(()=>{
        async function getDraftInvoice(){
           
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token).token}`
                }
            };
            const response = await axios.get('http://localhost:8000/getdraftInvoice',config);
            const rowData = response.data;
            const datawithID = await rowData.map((obj,index)=>({...obj,id:index+1}))
            setTableData(datawithID);
            console.log(datawithID);
        }
        getDraftInvoice();
        const u = localStorage.getItem('cred');
        setUser(JSON.parse(u).userName);
        console.log("JSON.parse(u).userName = ",JSON.parse(u).userName);
    },[])

    useEffect(()=>{
        if(tableData && tableData.length>1){
            setFilterdData(tableData); 
            console.log(filteredData);
        }
    },[tableData])


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'companyName', headerName: 'Company Name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 90,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        },
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

    const handleSelectionChange = (newSelection) => {
        const selectedIDs = new Set(newSelection);
        const selectedRowData = rows.filter((row) => selectedIDs.has(row.id));
        setSelectedRows(selectedRowData);
    };

   

    return (
        <div className="cont flex-[4] flex flex-col items-center justify-center bg-white h-[90vh] p-4 ">
            <h1 className='relative text-3xl font-semibold'>Draft Saved Invoices</h1>
            {filteredData && <DataGrid
                className='relative mt-4 w-[80%]'
                rows={filteredData}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}

                checkboxSelection={handleSelectionChange}
                onSelectionModelChange={handleSelectionChange}
                
            />}
            {selectedRows.length > 0 && (
                <div className=' relative w-full h-[20vh] bg-red-50'>
                    <h2>Selected Rows: {selectedRows}</h2>
                </div>
            )}
        </div>
    )
}

export default DraftInvoicesData