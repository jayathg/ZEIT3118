import axios from 'axios';
import React, { useState } from 'react';
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

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleSearchClick = async () => {
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
                const users = responseData.result;
                console.log("Found users:", users);
    
                // You can also set this data to the state if you want to display it in the UI
                setDummyData(users);
                setShowTextBox(true);
            } else {
                console.error("Error:", responseData.body);
                setPopupMessage(`Error: ${responseData.body}`);
            }
        } catch (error) {
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
            accessLevel: entry.accessLevel || "" 
        }); // Initialize the input fields with existing entry values
    };

    const handleInputChange = (key, event) => {
        setEditValues({
            ...editValues,
            [key]: event.target.value,
        });
    };

    const handleConfirmClick = async () => {
        const userID = currentEditIndex;
        console.log("Edited Values:", editValues);
        try {
            const response = await axios.post(`https://techsecuretaskforcefunction.azurewebsites.net/api/httpTrigger6?userID=${userID}&fname=${editValues.fname}&lname=${editValues.lname}&email=${editValues.email}&accessLevel=${editValues.accessLevel}`);
            console.log(response);
            
            // Access the response data
            const responseData = response.data;
            
            // Check the structure of the response
            console.log(responseData);
            if (responseData.message === "Edited users") {
                const users = responseData.result;
                console.log("Edited user:", users);
                setPopupMessage(`User ${userID} has been updated.`);

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
        <div className="page-container">
            <Navbar />
            <div className="heading-container">
                <h2>Search For An Entry To Edit</h2>
            </div>
            <div className="container">
                <div className="search-container">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="search-input" 
                        value={searchInput}
                        onChange={handleSearchChange}
                    />
                    <button className="search-button" onClick={handleSearchClick}>Search</button>
                </div>
                {showTextBox && currentEditIndex === null && (
                    <div className="result-container">
                        {dummyData.map((user, index) => (
                            <div key={index} className="result-item">
                                <span>{user.employeeID} - {user.firstName} {user.lastName} - {user.email}</span>
                                <button className="edit-button" onClick={() => handleEditClick(user.employeeID)}>Edit</button>
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
                        <input
                            type="text"
                            value={editValues.lname}
                            onChange={(e) => handleInputChange('lname', e)}
                            className="edit-input"
                            placeholder="Last Name"
                        />
                        <input
                            type="email"
                            value={editValues.email}
                            onChange={(e) => handleInputChange('email', e)}
                            className="edit-input"
                            placeholder="Email"
                        />
                        <input
                            type="text"
                            value={editValues.accessLevel}
                            onChange={(e) => handleInputChange('accessLevel', e)}
                            className="edit-input"
                            placeholder="Access Level"
                        />
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
            <img src="/logo.png" alt="Company Logo" className="company-logo" />
        </div>
    );
}

export default EditPage;
