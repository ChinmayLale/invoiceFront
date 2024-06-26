import React, { useState, useRef, useEffect } from 'react';





function DropDownUserWidget ({ companies, onSelect ,onChange ,placeholder ,id ,copiedData,name , visible}) {

    const [inputValue, setInputValue] = useState(copiedData || ''); // State for search inpu
    const selectRef = useRef(null); // Ref for the select element

    const handleInputChange = (event) => {
        const newInputValue = event.target.value.toLowerCase();
        setInputValue(newInputValue);
    };

    useEffect(()=>{
        console.log("Data GOt for DropDown IS /n",companies)
    },[])

    const handleSelect = (event , selectedCompany) => {
        const selectedValue = event.target.value;
        console.log("Selected Company is : ",selectedCompany)
        // if()
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
                onChange={onChange}
                onInput={handleInputChange}
            />
            <select
                name="UserName"
                id=""
                className={`relative w-[100%] text-left ${visible ? 'block' : 'hidden'}`}
                onChange={handleSelect}
                ref={selectRef}
            >
                {companies.filter((company) => company.username.toLowerCase()).map((company) => (
                    <option key={company.id} value={company.username}>
                        {company.username}
                    </option>
                )) || companies.filter((company) => company.UserName.toLowerCase()).map((company) => (
                    <option key={company.id} value={company.username}>
                        {company.username}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default DropDownUserWidget