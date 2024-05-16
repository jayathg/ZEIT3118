import React from 'react';
import Navbar from './Navbar'; // Import your Navbar component
import './HomeAdminPage.css';

function SearchPage() {
  return (
    <div>
       <Navbar />
      <img src="/logo.png" alt="Company Logo" className="company-logo" />
      <h1>Welcome to Search</h1>
    </div>
  );
}

export default SearchPage;

