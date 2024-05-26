//AddPage JS

import React, { useState } from 'react';
import Navbar from './Navbar'; 
import './HomeAdminPage.css'; 
import './AddPage.css'

function AddPage() {
    const [showData, setShowData] = useState(false);
    const [inputValues, setInputValues] = useState(["", "", "", ""]);

    const toggleData = () => {
        setShowData(!showData);
    };

    const handleInputChange = (index, event) => {
        const newValues = [...inputValues];
        newValues[index] = event.target.value;
        setInputValues(newValues);
    };

    const handleConfirmClick = () => {
        console.log("Input Values:", inputValues);
    };

    return (
        <div>
            <Navbar />
            <div className="header">
                <img src="/logo.png" alt="Company Logo" className="company-logo" />
                <h1>This is the Add Page</h1>
            </div>
            <div className="button-container">
                <button className="show-button" onClick={toggleData}>
                    {showData ? "Hide Data" : "Click to add data"}
                </button>
            </div>
            {showData && (
                <div className="data-container">
                    {inputValues.map((value, index) => (
                        <input
                            key={index}
                            type="text"
                            value={value}
                            onChange={(e) => handleInputChange(index, e)}
                            className="data-input"
                            placeholder={`Input ${index + 1}`}
                        />
                    ))}
                    <button className="confirm-button" onClick={handleConfirmClick}>
                        Click to Confirm
                    </button>
                </div>
            )}
        </div>
    );
}

export default AddPage;
