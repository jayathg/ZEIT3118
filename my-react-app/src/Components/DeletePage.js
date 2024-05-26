import axios from 'axios';
import React, { useState } from 'react';
import Navbar from './Navbar'; // Import your Navbar component
import './HomeAdminPage.css'; // Use HomeAdminPage CSS for styling
import './DeletePage.css';

function DeletePage() {
    const [showTextBox, setShowTextBox] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [userToDelete, setUserToDelete] = useState('');
    const [dummyData, setDummyData] = useState([]);
    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSearchClick = async () => {
        setShowTextBox(true);
        console.log("Searching User");
        try {
            const response = await axios.post(`https://techsecuretaskforcefunction.azurewebsites.net/api/httpTrigger5?searchQuery=${searchInput}`);
            console.log("Search response:", response.data);

            // Ensure response.data is parsed correctly
            const responseData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

            // Use JSON.stringify for better logging
            console.log("Search response (stringified):", JSON.stringify(responseData, null, 2));

            setDummyData(responseData.result); // Update state with search results
        } catch (error) {
            console.error("Unable to search:", error.response ? error.response.data.error : error.message);
            setPopupMessage("Unable to search:", error.response ? error.response.data.error : error.message )
        }
    };

    const deleteUser = async () => {
        console.log("Deleting User:", userToDelete);
        try {
            const response = await axios.post(`https://techsecuretaskforcefunction.azurewebsites.net/api/httpTrigger3?searchQuery=${userToDelete}`);
            console.log("Delete response:", response.data);
            setPopupMessage(`User ${userToDelete} has been deleted.`);
            // Optionally update dummyData to remove the deleted user
            setDummyData(dummyData.filter(item => item !== userToDelete));
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

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        deleteUser();
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
                        {dummyData.length > 0 ? (
                            dummyData.map((entry, index) => (
                                <div key={index} className="result-item">
                                    <span>{entry}</span>
                                    <button className="Delete-button" onClick={() => handleDeleteClick(entry)}>Delete</button>
                                </div>
                            ))
                        ) : (
                            <p>No results found</p>
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
            <img src="/logo.png" alt="Company Logo" className="company-logo" />
        </div>
    );
}

export default DeletePage;
