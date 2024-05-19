import React from 'react';
import './NumberPad.css';
import axios from 'axios';
import './NumberPad.css'; // Import the CSS file
import Cookies from 'js-cookie';
import { useState } from 'react';

function NumberPad() {
  const [employeeID, setEmployeeID] = useState(''); // Correct use of useState
  const [input, setInput] = useState('');

  const handleNumberClick = (number) => {
    const newInput = input + number;
    setInput(newInput); // Append the clicked number to the current input
    setEmployeeID(newInput); // Update employeeID with the new input
    console.log("Employee ID: ", newInput);

    console.log('Clicked number:', number);
  };


  const navigateToHomeAdminPage = async () => {
    console.log("Navigating to Home Admin Page")
    try {
      const response = await axios.post(`https://techsecuretaskforcefunction.azurewebsites.net/api/httpTrigger1?userID=${employeeID}`);
      console.log("Login response:", response.data);
      Cookies.set('authState', response.data.state);
      //navigate('/HomeAdminPage'); // Adjust route as necessary
    } catch (error) {
      console.error("Login failed:", error.response ? error.response.data.error : error.message);
    }
  };
  

  const handleDelete = () => {
    const newInput = input.slice(0, -1);
    setInput(newInput); // Remove the last character from the input
    setEmployeeID(newInput); // Update employeeID with the new input
  };

  return (
    <div className="number-pad-container">
      <img src="/logo.png" alt="Company Logo" className="company-logo" />
      <div className="number-pad">
        <h1>Enter Your PIN</h1>
        <div className="display-panel">{input}</div> {/* Display panel to show entered numbers */}
        <div className="buttons-grid">

          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(number => (
            <button key={number} onClick={() => handleNumberClick(number)}>
              {number}
            </button>
          ))}
        </div>
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>

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
