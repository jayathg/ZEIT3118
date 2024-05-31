import React from 'react';
import Cookies from 'js-cookie';
import Navbar from './Navbar'; 
import useNavigate  from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import './HomeAdminPage.css'; 
import './Logout.css';

function LogoutPage() {   
    const navigate = useNavigate();



    const logout = () => {
        Cookies.set('userRole', { expires: Date.now() });
        navigate('/');
        
    };


    return (
        <div>
            <Navbar />
            <div className="header">
                <img src="/logo.png" alt="Company Logo" className="company-logo" />
                <h1>This is the Logout Page</h1>
            </div>
            <div className="button-container">
                <button className="show-button" onClick={logout}>
                    Logout
                </button>
            </div>
            
            
        </div>
    );
}

export default LogoutPage;
