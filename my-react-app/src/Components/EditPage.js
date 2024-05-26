import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'; // Import your Navbar component
import './HomeAdminPage.css'; // Use HomeAdminPage CSS for styling
import './EditPage.css';

function EditPage() {
    const [showTextBox, setShowTextBox] = useState(false);
    const [currentEditIndex, setCurrentEditIndex] = useState(null);
    const [editValues, setEditValues] = useState({ fname: "", lname: "", email: "", accessLevel: "" });
    const [dummyData, setDummyData] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSearchClick = async () => {
        setShowTextBox(true);
        console.log("Searching User");
        try {
            const response = await axios.post(`https://techsecuretaskforcefunction.azurewebsites.net/api/httpTrigger5?searchQuery=${searchInput}`);
            console.log("Search response:", response.data);
            setDummyData(response.data); // Update state with search results
        } catch (error) {
            console.error("Unable to search:", error.response ? error.response.data.error : error.message);
        }
    };

    const handleEditClick = (index) => {
        setCurrentEditIndex(index);
        const entry = dummyData[index];
        setEditValues({ 
            fname: entry.fname || "", 
            lname: entry.lname || "", 
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
        const userID = dummyData[currentEditIndex].id;
        console.log("Edited Values:", editValues);
        try {
            const response = await axios.post(`https://techsecuretaskforcefunction.azurewebsites.net/api/httpTrigger6?userID=${userID}&fname=${editValues.fname}&lname=${editValues.lname}&email=${editValues.email}&accessLevel=${editValues.accessLevel}`);
            console.log("Edit response:", response.data);
            //setPopupMessage(`User ${userID} has been updated.`);
        } catch (error) {
            console.error("Unable to edit:", error.response ? error.response.data.error : error.message);
            //setPopupMessage('An error occurred while updating the user.');
        }
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
                        {dummyData.map((entry, index) => (
                            <div key={index} className="result-item">
                                <span>{entry.fname} {entry.lname}</span> {/* Adjust based on data structure */}
                                <button className="edit-button" onClick={() => handleEditClick(index)}>Edit</button>
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
            </div>
            <img src="/logo.png" alt="Company Logo" className="company-logo" />
        </div>
    );
}

export default EditPage;
