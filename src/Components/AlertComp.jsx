import React from 'react'

function AlertComp({ isOpen , msg , action }) {
    return (
        <div className=' absolute mt-4 flex flex-col items-center w-[100vw]'>
            <div className={`bg-green-50 border border-green-400 rounded text-green-800 text-sm p-4 flex items-start w-[40%] ${isOpen ? 'block' : 'hidden'} ease-in-out duration-700`}>
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <div className="w-full">
                    <p>
                        <span className="font-bold">{msg}</span>
                    </p>
                    <button
                        className="border-green-400 bg-white hover:bg-gray-50 px-4 py-2 mt-4 border rounded font-bold"
                    >
                        {action}
                    </button>
                </div>
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default AlertComp