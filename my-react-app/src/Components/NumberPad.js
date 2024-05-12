import React from 'react';
import './NumberPad.css';
import axios from 'axios';
import './NumberPad.css'; // Import the CSS file

function NumberPad() {
  let employeeID = "";

  const handleNumberClick = (number) => {
    employeeID += number;
    console.log("Employee ID: ", employeeID)
    console.log('Clicked number:', number);
  };

  const navigateToHomeAdminPage = async () => {
    console.log("Navigating to Home Admin Page")
    try {
      const response = await axios.post(`https://techsecuretaskforcefunction.azurewebsites.net/api/httpTrigger1?userID=${employeeID}`);
      console.log("Login response:", response.data);
      //navigate('/HomeAdminPage'); // Adjust route as necessary
    } catch (error) {
      console.error("Login failed:", error.response ? error.response.data.error : error.message);
    }
  };
  

  return (
    <div className="number-pad-container">
      <img src="/logo.png" alt="Company Logo" className="company-logo" />
      <div className="number-pad">
        <h1>Enter Your PIN</h1>
        <div className="buttons-grid"> {/* This div wraps the buttons in a grid */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(number => (
            <button key={number} onClick={() => handleNumberClick(number)}>
              {number}
            </button>
          ))}
        </div>
      </div>
      <div className="submit-button-container">
        <button className="submit-button" onClick={navigateToHomeAdminPage}>
          Go to Home Admin Page
        </button>
      </div>
    </div>
  );
}

export default NumberPad;
