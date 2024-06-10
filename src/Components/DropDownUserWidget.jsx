import React, { useState, useRef, useEffect } from 'react';





function DropDownUserWidget ({ companies, onSelect ,onChange ,placeholder ,id ,name , visible}) {

    const [inputValue, setInputValue] = useState(''); // State for search inpu
    const selectRef = useRef(null); // Ref for the select element

    const handleInputChange = (event) => {
        const newInputValue = event.target.value.toLowerCase();
        setInputValue(newInputValue);
    };

    useEffect(()=>{
        console.log("Data GOt for DropDOwn IS /n",companies)
    },[])
    const handleSelect = (event) => {
        const selectedValue = event.target.value;
        onSelect(selectedValue, event); // Pass selected value to parent component
        setInputValue(selectedValue); // Clear search input on selection
    };


    return (
        <div className=" h-fit overflow-y-auto flex flex-col items-center justify-center bg-indigo-50">
            <input
                type="text"
                placeholder={placeholder}
                className="relative w-[100%] text-left"
                name={name}
                value={inputValue}
                onChange={onchange}
                onInput={handleInputChange}
            />
            <select
                name="UserName"
                id=""
                className={`relative w-[100%] text-left ${visible ? 'block' : 'hidden'}`}
                onChange={handleSelect}
                ref={selectRef}
            >
                {companies.filter((company) => company.username.toLowerCase().startsWith(inputValue)).map((company) => (
                    <option key={company.id} value={company.username}>
                        {company.username}
                    </option>
                )) || companies.filter((company) => company.UserName.toLowerCase().startsWith(inputValue)).map((company) => (
                    <option key={company.id} value={company.username}>
                        {company.username}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default DropDownUserWidget