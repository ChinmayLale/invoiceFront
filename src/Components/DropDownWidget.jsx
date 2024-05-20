import React, { useState, useEffect, useRef } from 'react';

const DropDownWidget = ({ companies, onSelect }) => {
  const [inputValue, setInputValue] = useState(''); // State for search input
  const [filteredCompanies, setFilteredCompanies] = useState(companies); // State for filtered companies
  const selectRef = useRef(null); // Ref for the select element

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      // Close dropdown when clicking outside
      setInputValue('');
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleInputChange = (event) => {
    const newInputValue = event.target.value.toLowerCase();
    setInputValue(newInputValue);

    // Filter companies based on search input
    const filtered = companies.filter((company) =>
      company.companyName.toLowerCase().startsWith(newInputValue)
    );
    setFilteredCompanies(filtered);
  };

  const handleSelect = (event) => {
    const selectedValue = event.target.value;
    onSelect(selectedValue); // Pass selected value to parent component
    setInputValue(''); // Clear search input on selection
  };

  return (
    <div className="selectBox w-[40vw] max-h-[25%] overflow-y-auto flex flex-row items-center justify-center bg-indigo-50">
      <input
        type="text"
        placeholder="Name"
        className="relative"
        value={inputValue}
        onInput={handleInputChange}
      />
      <select
        name="companyName"
        id=""
        className="relative w-[20%]"
        onChange={handleSelect}
        ref={selectRef}
      >
        {filteredCompanies.map((company) => (
          <option key={company._id} value={company.companyName}>
            {company.companyName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDownWidget;
