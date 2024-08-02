import React from 'react';

const CheckboxButton = ({ label, onToggle, checked }) => {
    const handleClick = () => {
        onToggle(!checked);
    };

    return (
        <button className={`py-1 px-6 rounded-2xl font-bold text-gray-400 m-1 border-[1px] border-gray-300 bg-[#f9f9f9] ${checked ? 'bg-black text-white border-white' : ''}`} onClick={handleClick}>
            {label}
        </button>
    );
};

export default CheckboxButton;
