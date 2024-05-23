import React from 'react';
import GenUserNavBar from './GenUserNavBar'; // Import the SimpleNavbar component
import './HomeAdminPage.css';

function HomeGenUserPage() {
  return (
      <div>
          <GenUserNavBar /> {/* Add the SimpleNavbar component */}
          <div className="header">
              <img src="/logo.png" alt="Company Logo" className="company-logo" />
              <h1>This is the Home General User Page</h1>
          </div>
          <p>This is the content of the new page.</p>
      </div>
  );
}

export default HomeGenUserPage;
