import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use Link from react-router-dom
import './Navbar.css'; // Use the same CSS file for styling


function SimpleNavbar() {
    const navigate = useNavigate(); // Hook for navigation

    const navigateToLogoutPage = () => {
        navigate('/Logout')
    }
    return (
        <nav className="nav">
            <Link to="/HomeGenUserPage" className="site-title">
                Home
            </Link>
            <ul>
                <Link to="/Logout" onClick={navigateToLogoutPage}>Logout</Link>
            </ul>
            

        </nav>
    );
}

export default SimpleNavbar;