import React from 'react';
import Navbar from './Navbar'; // Import your Navbar component
import './HomeAdminPage.css'

function HomeAdminPage() {
  return (
      <div>
          <Navbar />
          <div className="header">
          <img src="/logo.png" alt="Company Logo" className="company-logo" />
              <h1>This is the Home Admin Page</h1>
          </div>
          <p>This is the content of the new page.</p>
      </div>
  );
}

export default HomeAdminPage;