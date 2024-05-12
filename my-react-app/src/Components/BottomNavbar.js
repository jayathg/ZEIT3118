import React from 'react';
import { Link } from 'react-router-dom';
import './BottomNavbar.css' // Import the dedicated CSS file for styling

function BottomNavbar() {
    const goBack = () => {
        window.history.back();
    };

    return (
        <nav className="bottom-navbar">
            <button onClick={goBack}>Back</button>
        </nav>
    )
}

export default BottomNavbar;
