import React, { useState, useRef } from 'react';

const DropDownWidget = ({ companies, onSelect ,onChange ,placeholder ,id ,name , visible , gst}) => {
  const [inputValue, setInputValue] = useState(''); // State for search input
  // const [filteredCompanies, setFilteredCompanies] = useState(companies); // State for filtered companies
  const selectRef = useRef(null); // Ref for the select element





  const handleInputChange = (event) => {
    const newInputValue = event.target.value.toLowerCase();
    setInputValue(newInputValue);
  };

  const handleSelect = (event) => {
    const selectedValue = event.target.value;
    console.log("Selectd Company Value is ")
    const selectedCompany = companies.find(company => company.companyName === selectedValue);
    console.log(selectedCompany);
    if(selectedCompany.gstNumber.length > 10){
      console.log("GST FOUND")
      gst();
    }
    onSelect(selectedValue,event); // Pass selected value to parent component
    setInputValue(selectedValue); // Clear search input on selection
  };

  return (
    <div className="w-[70%] h-fit overflow-y-auto flex flex-col items-center justify-center bg-indigo-50">
      <input
        type="text"
        placeholder={placeholder}
        className="relative w-[100%] text-right"
        name={name}
        value={inputValue}
        onChange={onchange}
        onInput={handleInputChange}
      />
      <select
        name="companyName"
        id=""
        className={`relative w-[100%] text-right ${visible ? 'block':'hidden'} `}
        onChange={handleSelect}
        ref={selectRef}
      >
        {companies.filter((company)=>company.companyName.toLowerCase()).map((company) => (
          <option key={company._id} value={company.companyName}>
            {company.companyName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDownWidget;
