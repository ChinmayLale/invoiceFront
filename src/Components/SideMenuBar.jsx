import React from 'react';
import { Link } from 'react-router-dom';


function SideMenuBar() {
  return (
    <div className='sidebar flex-1 bg-slate-100 h-[90vh] sticky top-[0vh]'>
            <div className="sideBarWrapper p-[20px] text-gray-700">
                <div className="sideBarMenu mb-[10px]">
                    <h3 className="sideBarTitle text-md text-gray-400 font-semibold ">Quick Menu</h3>
                    <ul className="sideBarList p-[5px]">
                        <Link to="/" className="sideBarListItem p-[5px] cursor-pointer flex flex-row items-center rounded-[10px] hover:bg-blue-200  hover:scale-105 duration-100  hover:text-sky-950">
                            DashBoard
                        </Link>
                        <Link to='/newInvoice' className="sideBarListItem p-[5px] cursor-pointer flex flex-row items-center rounded-[10px] hover:bg-blue-200   hover:scale-105 duration-100  hover:text-sky-950">
                            Generate
                        </Link>
                        <Link to='/history'className="sideBarListItem p-[5px] cursor-pointer flex flex-row items-center rounded-[10px] hover:bg-blue-200   hover:scale-105 duration-100  hover:text-sky-950">
                            History
                        </Link>
                    </ul>
                </div>

                

            </div>
        </div>
  )
}

export default SideMenuBar