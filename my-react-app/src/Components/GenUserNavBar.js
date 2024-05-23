import React from 'react';
import { Link } from 'react-router-dom'; // Use Link from react-router-dom
import './Navbar.css'; // Use the same CSS file for styling

function SimpleNavbar() {
    return (
        <nav className="nav">
            <Link to="/HomeGenUserPage" className="site-title">
                Home
            </Link>
        </nav>
    );
}

export default SimpleNavbar;
