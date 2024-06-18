import React, { useEffect, useState } from 'react'
import Bill from '../bill.png';
import user from '../user.png';
import { Link ,useNavigate} from 'react-router-dom';


function NavBar({handleLOgOut}) {
  const [ userName , setUserName] = useState('')
  const navi = useNavigate()
  useEffect(()=>{
    const username = localStorage.getItem('cred')
    const data = JSON.parse(username)
    console.log(data.userName)
    setUserName(data.userName);
  },[])

  const handleLogOut = () =>{
    localStorage.removeItem('cred');
    localStorage.removeItem('auth');
    
    handleLOgOut();
    navi('/')
  }

  return (
    <div className='sticky top-0 h-[10vh] w-[100vw] bg-sky-950 border-b-2 shadow-sm flex flex-row items-center justify-between p-1 z-10'>
      <div className="logo relative h-[100%] w-[20%] flex flex-row items-center ml-2">
        <img src={Bill} alt="" className='h-full' />
        <h2 className='text-2xl font-medium text-yellow-50'>Invoice Generator</h2>
      </div>
      <div className="menuItems  relative h-full w-[20%] flex flex-row items-center gap-10 text-yellow-50">
        <Link to='/'><h2 className='text-md font-normal hover:scale-110 duration-100  hover:text-green-300 cursor-pointer'>DashBoard</h2></Link>
        <Link to='/newInvoice'><h2 className='text-md font-normal hover:scale-110 duration-100 cursor-pointer hover:text-green-300'>Generator</h2></Link>
        <Link to='/history'><h2 className='text-md font-normal hover:scale-110 duration-100 cursor-pointer hover:text-green-300'>History</h2></Link>
      </div>

      <div className="userInfo relative h-full w-fit flex flex-row  items-center justify-start pb-2 mr-2">
        <div className="userInfo relative h-full w-fit flex flex-col  items-center justify-start pb-2 mr-2">
        <img src={user} alt="" className='h-[70%] rounded-[50%]' />
        <h2 className='text-lg font-normal text-green-200 hover:scale-110 duration-100 cursor-pointer hover:text-green-300 pb-2'>{userName}</h2>
        </div>
        <i class="ri-login-box-line text-2xl font-normal text-white cursor-pointer" onClick={handleLogOut}></i>
      </div>
      
    </div>
  )
}

export default NavBar