import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import AlertComp from './AlertComp';



function LoginPage({handleLogin}) {

    const [userName, setUserName] = useState(null);
    const [pass, setPass] = useState(null);
    const [isOpen, setIsOpen] = useState(false);


    const handleSignIn = async (e) => {
        e.preventDefault()
        console.log(`UserName - ${userName} `);
        localStorage.setItem('cred', JSON.stringify({ userName }));
        try {
            // https://invoice-generator-server.vercel.app/
            const postData = await axios.post('http://localhost:8000/login', { username: userName, password: pass});
            const respons =await postData.data;
            // console.log(respons);
            if(postData.status === 200 && postData.data){
                setIsOpen(true)
                setTimeout(() => {
                    localStorage.setItem('token',JSON.stringify(respons));
                    handleLogin();
                    setIsOpen(false)
                }, 500);
            }
            else if(postData.status === 400){
                alert("Wrong Credentials")
            }
          
        } catch (error) {
            console.error("Error While Sending Login Data To Server", error.response || error);
            alert("Wrong Credentials")
            
        }
    }


    return (
        <div>
        <AlertComp isOpen={isOpen} msg={'Login Succesfull !'} action={'Login'} />
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    Invoice Generator
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email/UserName</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900       sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={(e) => { setUserName(e.target.value); }} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e) => { setPass(e.target.value); }} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            <button type="submit" className="w-full text-white bg-sky-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleSignIn} >Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don't have an account yet? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        </div>
    );
}

export default LoginPage;
