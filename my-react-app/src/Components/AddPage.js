import axios from 'axios';
import React, { useState } from 'react';
import Navbar from './Navbar'; 
import ReactLoading from 'react-loading';
import './HomeAdminPage.css'; 
import './AddPage.css';

function AddPage() {
    const [showData, setShowData] = useState(false);
    const [inputValues, setInputValues] = useState(["", "", "", ""]);
    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [errorMessages, setErrorMessages] = useState(["", "", "", ""]);
    const [showLoading, setShowLoading] = useState(false);
    const placeholders = ["First Name", "Last Name", "Email", "Access Level"];

    const toggleData = () => {
        setShowData(!showData);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const showLoadingAnimation = () => {
        setShowLoading(true);
      } 

    const handleInputChange = (index, event) => {
        const newValues = [...inputValues];
        newValues[index] = event.target.value;
        setInputValues(newValues);
        validateInput(index, event.target.value);
    };

    const validateInput = (index, value) => {
        let errorMessage = "";
        if (index === 2) { // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = "Please enter a valid email.";
            }
        } else if (index === 3) { // Access level validation
            if (value !== "1" && value !== "0") {
                errorMessage = "Access level must be 1 or 0.";
            }
        }
        const newErrorMessages = [...errorMessages];
        newErrorMessages[index] = errorMessage;
        setErrorMessages(newErrorMessages);
    };

    const handleConfirmClick = async() => {
        showLoadingAnimation();

        // Validate all inputs before sending
        let isValid = true;
        inputValues.forEach((value, index) => {
            validateInput(index, value);
            if (errorMessages[index]) {
                isValid = false;
            }
        });

        if (!isValid) {
            setShowLoading(false);

            setPopupMessage('Please fix the errors in the form.');
            setShowPopup(true);
            return;
        }

        console.log("Input Values:", inputValues);
        try {
            const response = await axios.post(`https://techsecuretaskforcefunction.azurewebsites.net/api/httpTrigger4?fname=${inputValues[0]}&lname=${inputValues[1]}&email=${inputValues[2]}&accessLevel=${inputValues[3]}`);
            console.log(response);
            
            // Access the response data
            const responseData = response.data;
            
            // Check the structure of the response
            console.log(responseData);
            if (responseData.message === "Added user") {
                const users = responseData.result;
                console.log("Added user:", users);
                setShowLoading(false);

                setPopupMessage(`User ${users} has been added.`);
            } else {
                setShowLoading(false);

                console.error("Error:", responseData.body);
                setPopupMessage(`Error: ${responseData.body}`);
            }
        } catch (error) {
            setShowLoading(false);

            console.error("Unable to add user:", error.response ? error.response.data.error : error.message);
            setPopupMessage('An error occurred while adding the user.');
        }
        setShowLoading(false);

        setShowPopup(true);
        setInputValues(["", "", "", ""]); // Clear the input values after confirming
        setShowData(false); // Hide the input boxes after confirming
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
                        <div key={index} className="input-container">
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => handleInputChange(index, e)}
                                className="data-input"
                                placeholder={placeholders[index]}
                            />
                            {errorMessages[index] && (
                                <div className="error-message">{errorMessages[index]}</div>
                            )}
                        </div>
                    ))}
                    {!showLoading && (
                        <button className="confirm-button" onClick={handleConfirmClick}>
                        Click to Confirm
                    </button>
                    )}{showLoading && (
                        <div className="confirm-button">
                            <ReactLoading type="spin" color="#fff" height={100} width={100} />
                        </div>
                    )}
                    
                </div>
            )}
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>{popupMessage}</h2>
                        <button onClick={handleClosePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddPage;
