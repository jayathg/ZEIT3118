import axios from 'axios';
import React, { useState } from 'react';
import Navbar from './Navbar'; // Import your Navbar component
import './HomeAdminPage.css'; // Use HomeAdminPage CSS for styling
import './DeletePage.css';

function DeletePage() {
    const [showTextBox, setShowTextBox] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [dummyData, setDummyData] = useState([]);
    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
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
    
    const deleteUser = async (userId) => {
        console.log("Deleting User:", userId);
        try {
            const response = await axios.delete(`https://techsecuretaskforcefunction.azurewebsites.net/api/deleteUser?userId=${userId}`);
            console.log("Delete response:", response.data);
            setPopupMessage(`User ${userId} has been deleted.`);
            // Optionally update dummyData to remove the deleted user
            setDummyData(dummyData.filter(user => user.employeeID !== userId));
        } catch (error) {
            console.error("Unable to delete:", error.response ? error.response.data.error : error.message);
            if (error.response && (error.response.status === 400 || error.response.status === 500)) {
                setPopupMessage('There was an error processing your request. Please try again.');
            } else {
                setPopupMessage('An unexpected error occurred. Please try again.');
            }
        }
        setShowPopup(true);
    };

    const handleDeleteClick = (userId) => {
        deleteUser(userId);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div>
            <Navbar />
            <div className="heading-container">
                <h2>Search For An Entry To Delete</h2>
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
                {showTextBox && (
                    <div className="result-container">
                        {dummyData.map((user, index) => (
                            <div key={index} className="result-item">
                                <span>{user.employeeID} - {user.firstName} {user.lastName} - {user.email}</span>
                                <button className="Delete-button" onClick={() => handleDeleteClick(user.employeeID)}>Delete</button>
                            </div>
                        ))}
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

export default DeletePage;
