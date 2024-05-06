import React from 'react';
import Navbar from './Navbar'; // Import your Navbar component
import './DeletePage.css'

function DeletePage() {
    return (
        <div>
            <Navbar />
            <h1>This is the Delete Page</h1>
            <p>This is the content of the new page.</p>
        </div>
    );
}

export default DeletePage;