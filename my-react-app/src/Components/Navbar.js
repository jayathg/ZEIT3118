// Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import './Navbar.css';

function Navbar() {
    const navigate = useNavigate(); // Hook for navigation

    const navigateToAddPage = () => {
        navigate('/AddPage'); // Navigate to AddPage
    };

    const navigateToEditPage = () => {
        navigate('/EditPage'); // Navigate to EditPage
    };

    const navigateToDeletePage = () => {
        navigate('/DeletePage'); // Navigate to DeletePage
    };

    return (
        <nav className="nav">
            <Link to="/HomeAdminPage" className="site-title">
                Home
            </Link>
            <ul>
                <li>
                    <Link to="/AddPage" onClick={navigateToAddPage}>Add Data</Link> {/* Use Link for navigation */}
                </li>
                <li>
                    <Link to="/EditPage" onClick={navigateToEditPage}>Edit Data</Link> {/* Use Link for navigation */}
                </li>
                <li>
                    <Link to="/DeletePage" onClick={navigateToDeletePage}>Delete Data</Link> {/* Use Link for navigation */}
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;

