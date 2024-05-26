import React, { useState } from 'react';
import Navbar from './Navbar'; // Import your Navbar component
import './HomeAdminPage.css'; // Use HomeAdminPage CSS for styling
import './EditPage.css';

function EditPage() {
    const [showTextBox, setShowTextBox] = useState(false);
    const [currentEditIndex, setCurrentEditIndex] = useState(null);
    const [editValues, setEditValues] = useState(["", "", "", ""]);

    const handleSearchClick = () => {
        setShowTextBox(true);
    };

    const handleEditClick = (index) => {
        setCurrentEditIndex(index);
        setEditValues(["", "", "", ""]); // Initialize the input fields with empty values or existing entry values
    };

    const handleInputChange = (index, event) => {
        const newValues = [...editValues];
        newValues[index] = event.target.value;
        setEditValues(newValues);
    };

    const handleConfirmClick = () => {
        console.log("Edited Values:", editValues);
        // Handle the confirmation logic here, such as updating the data in a database
        setCurrentEditIndex(null); // Hide the input boxes after confirming
        setShowTextBox(false); // Show the search results again
    };

    const dummyData = [
        "Entry 1: Example data 1",
        "Entry 2: Example data 2",
        "Entry 3: Example data 3",
        "Entry 4: Example data 4"
    ];

    return (
        <div className="page-container">
            <Navbar />
            <div className="heading-container">
                <h2>Search For An Entry To Edit</h2>
            </div>
            <div className="container">
                <div className="search-container">
                    <input type="text" placeholder="Search..." className="search-input" />
                    <button className="search-button" onClick={handleSearchClick}>Search</button>
                </div>
                {showTextBox && currentEditIndex === null && (
                    <div className="result-container">
                        {dummyData.map((entry, index) => (
                            <div key={index} className="result-item">
                                <span>{entry}</span>
                                <button className="edit-button" onClick={() => handleEditClick(index)}>Edit</button>
                            </div>
                        ))}
                    </div>
                )}
                {currentEditIndex !== null && (
                    <div className="edit-container">
                        {editValues.map((value, index) => (
                            <input
                                key={index}
                                type="text"
                                value={value}
                                onChange={(e) => handleInputChange(index, e)}
                                className="edit-input"
                                placeholder={`Input ${index + 1}`}
                            />
                        ))}
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
