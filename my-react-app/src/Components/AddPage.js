import React from 'react';
import Navbar from './Navbar'; // Import your Navbar component
import './AddPage.css'

function AddPage() {
    return (
        <div>
            <Navbar />
            <h1>This is the Add Page</h1>
            <p>This is the content of the new page.</p>
        </div>
    );
}

export default AddPage;