import React from 'react';
import Navbar from './Navbar'; // Import your Navbar component
import './HomeAdminPage.css'

function HomeAdminPage() {
    return (
        <div>
            <Navbar />
            <h1>This is the Home Admin Page</h1>
            <p>This is the content of the new page.</p>
        </div>
    );
}

export default HomeAdminPage;