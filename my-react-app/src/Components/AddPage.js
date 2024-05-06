import React, { useState } from 'react';
import Navbar from './Navbar'; // Import your Navbar component
import './HomeAdminPage.css'; // Use HomeAdminPage CSS for styling
import './AddPage.css'

function AddPage() {
    const [showData, setShowData] = useState(false);

    const toggleData = () => {
        setShowData(!showData);
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
                    {showData ? "Hide Data" : "Click to show data"}
                </button>
            </div>
            {showData && (
                <div className="data-container">
                    {/* Your data goes here */}
                    {/* For example, you can display a table or any other content */}
                    <textarea className="data-textarea" readOnly>
                        John - 30
                        Jane - 25
                    </textarea>
                </div>
            )}
        </div>
    );
}

export default AddPage;
