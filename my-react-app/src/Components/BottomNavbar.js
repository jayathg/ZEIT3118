// BottomNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './BottomNavbar.css';

function BottomNavbar() {
    const goBack = () => {
        window.history.back(); // Go back to the previous page
    };

    return (
        <nav className="bottom-navbar">
            <button onClick={goBack}>Back</button> {/* Button to go back */}
        </nav>
    )
}

export default BottomNavbar;
