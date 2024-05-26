
import React, { useState } from 'react';
import Navbar from './Navbar'; // Import your Navbar component
import './HomeAdminPage.css'; // Use HomeAdminPage CSS for styling
import './DeletePage.css';

function DeletePage() {
    const [showTextBox, setShowTextBox] = useState(false);

    const handleSearchClick = () => {
        setShowTextBox(true);
    };

    const dummyData = [
        "Entry 1: Example data 1",
        "Entry 2: Example data 2",
        "Entry 3: Example data 3",
        "Entry 4: Example data 4"
    ];

    return (
        <div>
            <Navbar />
            <div className="heading-container">
                <h2>Search For An Entry To Delete</h2>
            </div>
            <div className="container">
                <div className="search-container">
                    <input type="text" placeholder="Search..." className="search-input" />
                    <button className="search-button" onClick={handleSearchClick}>Search</button>
                </div>
                {showTextBox && (
                    <div className="result-container">
                        {dummyData.map((entry, index) => (
                            <div key={index} className="result-item">
                                <span>{entry}</span>
                                <button className="Delete-button">Delete</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <img src="/logo.png" alt="Company Logo" className="company-logo" />
        </div>
    );
}

export default DeletePage;