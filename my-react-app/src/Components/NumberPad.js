import React, { useState } from 'react';
import './NumberPad.css'; // Import the CSS file

function NumberPad() {
  // State to keep track of the entered PIN
  const [enteredPin, setEnteredPin] = useState('');

  const handleNumberClick = (number) => {
    // Handle number click logic here
    console.log('Clicked number:', number);
    setEnteredPin(prev => prev + number); // Append the clicked number to the current PIN
  };

  const handleDelete = () => {
    setEnteredPin(enteredPin.slice(0, -1)); // Remove the last character from the PIN
  };

  const navigateToHomeAdminPage = () => {
    window.location.href = '/HomeAdminPage';
  };

  return (
    <div className="number-pad-container">
      <div className="number-pad">
        <h1>Enter Your PIN</h1>
        {/* Display area for the entered PIN */}
        <div className="pin-display">
          {enteredPin}
        </div>
        <div className="buttons-grid"> {/* This div wraps the buttons in a grid */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(number => (
            <button key={number} onClick={() => handleNumberClick(number)}>
              {number}
            </button>
          ))}
          <button onClick={handleDelete} className="delete-button">Del</button> {/* Delete button */}
        </div>
      </div>
      <div className="submit-button-container">
        <button onClick={navigateToHomeAdminPage}>Go to Home Admin Page</button>
      </div>
    </div>
  );
}

export default NumberPad;
