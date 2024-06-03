import axios from 'axios';
import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import Navbar from './Navbar'; // Import your Navbar component
import './HomeAdminPage.css'; // Use HomeAdminPage CSS for styling
import './DeletePage.css';

function DeletePage() {
    const [showTextBox, setShowTextBox] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [dummyData, setDummyData] = useState([]);
    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
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
                const users = responseData.result;
                console.log("Found users:", users);
    
                setShowLoading(false);
                setDummyData(users);
                setShowTextBox(true);
            } else {
                setShowLoading(false)
                console.error("Error:", responseData.body);
                setPopupMessage(`Error: ${responseData.body}`);
            }
        } catch (error) {
            setShowLoading(false)
            console.error("Unable to search:", error.response ? error.response.data.error : error.message);
            setPopupMessage(`Unable to search: ${error.response ? error.response.data.error : error.message}`);
        }
    };
    
    const deleteUser = async (userId) => {
        showLoadingAnimation();
        console.log("Deleting User:", userId);
        try {
            const response = await axios.post(`https://techsecuretaskforcefunction.azurewebsites.net/api/httpTrigger3?userID=${userId}`);
            console.log("Delete response:", response.data);
            setShowLoading(false);
            setPopupMessage(`User ${userId} has been deleted.`);
            // Optionally update dummyData to remove the deleted user
            setDummyData(dummyData.filter(user => user.employeeID !== userId));
        } catch (error) {
            setShowLoading(false);
            console.error("Unable to delete:", error.response ? error.response.data.error : error.message);
            if (error.response && (error.response.status === 400 || error.response.status === 500)) {
                setPopupMessage('There was an error processing your request. Please try again.');
            } else {
                setPopupMessage('An unexpected error occurred. Please try again.');
            }
        }
        setShowLoading(false);
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
                {showTextBox && (
                    <div className="result-container">
                        {dummyData.map((user, index) => (
                            <div key={index} className="result-item">
                                <span>{user.employeeID} - {user.firstName} {user.lastName} - {user.email}</span>
                                {!showLoading && (
                                    <button className="edit-button" onClick={() => handleDeleteClick(user.employeeID)}>Delete</button>
                                )} { showLoading && (
                                    <div className="edit-button">
                                        <ReactLoading type="spin" color="#fff" height={100} width={100} />
                                    </div>
                                )}
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
