import React from 'react';
import Navbar from './Navbar'; // Import your Navbar component
import './HomeAdminPage.css' // Use HomeAdminPage CSS for styling

function DeletePage() {
    return (
        <div>
            <Navbar />
            <img src="/logo.png" alt="Company Logo" className="company-logo" />
            <h1>This is the Delete Page</h1>
            <p>This is the content of the new page.</p>
        </div>
    );
}

export default DeletePage;