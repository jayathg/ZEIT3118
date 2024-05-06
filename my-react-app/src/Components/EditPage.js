import React from 'react';
import Navbar from './Navbar'; // Import your Navbar component
import './EditPage.css'

function EditPage() {
    return (
        <div>
            <Navbar />
            <h1>This is the Edit Page</h1>
            <p>This is the content of the new page.</p>
        </div>
    );
}

export default EditPage;