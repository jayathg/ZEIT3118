import axios from 'axios';
import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import Navbar from './Navbar'; // Import your Navbar component
import './HomeAdminPage.css'; // Use HomeAdminPage CSS for styling
import './EditPage.css';

function EditPage() {
    const [showTextBox, setShowTextBox] = useState(false);
    const [currentEditIndex, setCurrentEditIndex] = useState(null);
    const [editValues, setEditValues] = useState({ fname: "", lname: "", email: "", accessLevel: "" });
    const [dummyData, setDummyData] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [errorMessages, setErrorMessages] = useState({ fname: "", lname: "", email: "", accessLevel: "" });
    const [showLoading, setShowLoading] = useState(false);

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const showLoadingAnimation = () => {
        setShowLoading(true);
      }

    const handleSearchClick = async () => {
        showLoadingAnimation();
        console.log("Searching User");
        try {
            const response = await axios.post(`https://techsecuretaskforcefunction.azurewebsites.net/api/httpTrigger5?searchQuery=${searchInput}`);
            console.log(response);
            
            // Access the response data
            const responseData = response.data;
            
            // Check the structure of the response
            console.log(responseData);
    
            // Extract the relevant information
            if (responseData.message === "Found users") {
                if(responseData.result.length === 0) {
                    setShowLoading(false);
                    setPopupMessage("No users found.");
                    setShowPopup(true);
                    return;
                }
                const users = responseData.result;
                console.log("Found users:", users);
                setShowLoading(false);

                // You can also set this data to the state if you want to display it in the UI
                setDummyData(users);
                setShowTextBox(true);
            } else {
                setShowLoading(false);
                console.error("Error:", responseData.body);
                setPopupMessage(`Error: ${responseData.body}`);
            }
        } catch (error) {
            setShowLoading(false);
            console.error("Unable to search:", error.response ? error.response.data.error : error.message);
            setPopupMessage(`Unable to search: ${error.response ? error.response.data.error : error.message}`);
        }
    };

    const handleEditClick = (index) => {
        const entry = dummyData.find(user => user.employeeID === index);

        setCurrentEditIndex(index);
        setEditValues({ 
            fname: entry.firstName || "", 
            lname: entry.lastName || "", 
            email: entry.email || "", 
            accessLevel: entry.accessLevel !== undefined ? String(entry.accessLevel) : "" 
        }); // Initialize the input fields with existing entry values
    };

    const handleInputChange = (key, event) => {
        setEditValues({
            ...editValues,
            [key]: event.target.value,
        });
        validateInput(key, event.target.value);
    };

    const validateInput = (key, value) => {
        let errorMessage = "";
        if (key === "email") { // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = "Please enter a valid email.";
            }
        } else if (key === "accessLevel") { // Access level validation
            if (value !== "1" && value !== "0") {
                errorMessage = "Access level must be 1 or 0.";
            }
        }
        setErrorMessages({
            ...errorMessages,
            [key]: errorMessage
        });
    };

    const handleConfirmClick = async () => {
        setShowLoading(true);

        // Validate all inputs before sending
        let isValid = true;
        for (const [key, value] of Object.entries(editValues)) {
            validateInput(key, value);
            if (errorMessages[key]) {
                isValid = false;
            }
        }

        if (!isValid) {
            setPopupMessage('Please fix the errors in the form.');
            setShowPopup(true);
            return;
        }

        const userID = currentEditIndex;
        const formattedAccessLevel = editValues.accessLevel.toLowerCase() === 'true' ? 1 : 0; // Convert to 1 or 0
        console.log("Edited Values:", {...editValues, accessLevel: formattedAccessLevel});
        try {
            const response = await axios.post(`https://techsecuretaskforcefunction.azurewebsites.net/api/httpTrigger6?userID=${userID}&fname=${editValues.fname}&lname=${editValues.lname}&email=${editValues.email}&accessLevel=${formattedAccessLevel}`);
            console.log(response);
            
            // Access the response data
            const responseData = response.data;
            
            // Check the structure of the response
            console.log(responseData);
            if (responseData.message === "Edited users") {
                console.log("Edited user:", userID);
                setPopupMessage(`User ${userID} has been updated.`);

            } else {
                setShowLoading(false);
                console.error("Error:", responseData.body);
                setPopupMessage(`Error: ${responseData.body}`);
            }
        } catch (error) {
            setShowLoading(false);
            console.error("Unable to edit:", error.response ? error.response.data.error : error.message);
            setPopupMessage('An error occurred while updating the user.');
        }
        setShowLoading(false);
        setShowPopup(true);
        setCurrentEditIndex(null); // Hide the input boxes after confirming
        setShowTextBox(false); // Show the search results again
    };

    return (
        <div className="page-container">
            <Navbar />
            <header className="header-container">
                <img src="/logo.png" alt="Company Logo" className="company-logo" />
                <div className="heading-container">
                    <h2>Search For An Entry To Edit</h2>
                </div>
            </header>

            <div className="container">
                <div className="search-container">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="search-input" 
                        value={searchInput}
                        onChange={handleSearchChange}
                    />
                    <div className="submit-button-container">
                        {!showLoading && (
                            <button className="search-button" onClick={handleSearchClick}>
                                Search
                            </button>
                        )}{showLoading && (
                            <div className="search-button">
                                <ReactLoading type="spin" color="#fff" height={100} width={100} />
                            </div>
                        )}
                  </div>
                    
                        
                    
                </div>
                {showTextBox && currentEditIndex === null && (
                    <div className="result-container">
                        {dummyData.map((user, index) => (
                            <div key={index} className="result-item">
                                <span>{user.employeeID} - {user.firstName} {user.lastName} - {user.email}</span>
                                {!showLoading && (
                                    <button className="edit-button" onClick={() => handleEditClick(user.employeeID)}>Edit</button>
                                )} { showLoading && (
                                    <div className="edit-button">
                                        <ReactLoading type="spin" color="#fff" height={100} width={100} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {currentEditIndex !== null && (
                    <div className="edit-container">
                        <input
                            type="text"
                            value={editValues.fname}
                            onChange={(e) => handleInputChange('fname', e)}
                            className="edit-input"
                            placeholder="First Name"
                        />
                        {errorMessages.fname && (
                            <div className="error-message">{errorMessages.fname}</div>
                        )}
                        <input
                            type="text"
                            value={editValues.lname}
                            onChange={(e) => handleInputChange('lname', e)}
                            className="edit-input"
                            placeholder="Last Name"
                        />
                        {errorMessages.lname && (
                            <div className="error-message">{errorMessages.lname}</div>
                        )}
                        <input
                            type="email"
                            value={editValues.email}
                            onChange={(e) => handleInputChange('email', e)}
                            className="edit-input"
                            placeholder="Email"
                        />
                        {errorMessages.email && (
                            <div className="error-message">{errorMessages.email}</div>
                        )}
                        <input
                            type="text"
                            value={editValues.accessLevel}
                            onChange={(e) => handleInputChange('accessLevel', e)}
                            className="edit-input"
                            placeholder="Access Level"
                        />
                        {errorMessages.accessLevel && (
                            <div className="error-message">{errorMessages.accessLevel}</div>
                        )}
                        <button className="confirm-button" onClick={handleConfirmClick}>
                            Click to Confirm
                        </button>
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
        </div>
    );
}

export default EditPage;
