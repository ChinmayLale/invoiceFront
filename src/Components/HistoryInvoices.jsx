import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';


function HistoryInvoices() {

    const [rowData , setRowData] = useState(null);
    const [tableData , setTableData] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:8000/tableData')
            .then((db)=>{
                // console.log(db);
                const d = db.data;
                setRowData(d);
                console.log("Data Set")
                console.log(db);
            })
            .then(()=>{
                    console.log("Data Isss");  
                    console.log(rowData)
            })
    },[])

    useEffect(() => {
        var data = null
        if (rowData) {
          // Handle potential missing tableData property
            data = rowData.map((obj, index ) => ({
                    id : index +1,
                    UserName : obj.UserName,
                    Date: obj.UserAddressL1
                })); 
            setTableData(data); 
            console.log("Filtered Data : ");
            console.log(tableData)
        }
        else{
            console.log("Error")
        }
        console.log(tableData)
    },[rowData]);

    const columns = [
        {field: 'id', headerName: 'ID', width: 70 }, 
        {field:'UserName' , headerName:'UserName' , width:100},  
        {field: 'Date' , headerName:'Date' , width:50} 
    ];


    // const rows = [
    //     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    //     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    //     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    //     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    //     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    //     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    //     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    //     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    //     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    // ];


    return (
        <div className=' flex-[4] bg-slate-200 h-[90vh] flex-col'>
            <div className="heading w-full h-[10%] pt-[1%]">
                <h1 className=' font-medium text-3xl text-center font-sans'>You Can See Your History Here</h1>
            </div>
            <div className="historyInfo w-full flex flex-row items-center justify-center mt-3">
                <div style={{ height: 400, width: '80%' }}>
                    {tableData && <DataGrid
                        rows={tableData}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                    />}
                </div>
            </div>
        </div>
    )
}

export default HistoryInvoices