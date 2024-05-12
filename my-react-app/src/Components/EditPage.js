import React from 'react';
import Navbar from './Navbar'; // Import your Navbar component
import './HomeAdminPage.css' // Use HomeAdminPage CSS for styling

function EditPage() {
    return (
        <div>
            <Navbar />
            <h1>This is the Edit Page</h1>
            <img src="/logo.png" alt="Company Logo" className="company-logo" />
            <p>This is the content of the new page.</p>
        </div>
    );
}

export default EditPage;