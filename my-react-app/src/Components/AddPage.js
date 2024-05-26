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

    const handleConfirmClick = async() => {
        console.log("Input Values:", inputValues);
        try {
            const response = await axios.post(`https://techsecuretaskforcefunction.azurewebsites.net/api/httpTrigger4?fname=${inputValues[0]}&lname=${inputValues[1]}&email=${inputValues[2]}&accessLevel=${inputValues[3]}`);
            console.log(response);
            
            // Access the response data
            const responseData = response.data;
            
            // Check the structure of the response
            console.log(responseData);
            if (responseData.message === "Added users") {
                const users = responseData.result;
                console.log("Added user:", users);
                setPopupMessage(`User ${users} has been updated.`);

            } else {
                console.error("Error:", responseData.body);
                setPopupMessage(`Error: ${responseData.body}`);
            }
        } catch (error) {
            console.error("Unable to edit:", error.response ? error.response.data.error : error.message);
            setPopupMessage('An error occurred while updating the user.');
        }
        showPopup(true);
        setCurrentEditIndex(null); // Hide the input boxes after confirming
        setShowTextBox(false); // Show the search results again
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
