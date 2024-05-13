import React, { useState } from 'react';
import './NumberPad.css'; // Import the CSS file

function NumberPad() {
  const [input, setInput] = useState(''); // State to keep track of the input

  const handleNumberClick = (number) => {
    setInput(input + number); // Append the clicked number to the current input
    console.log('Clicked number:', number);
  };

  const navigateToHomeAdminPage = () => {
    window.location.href = '/HomeAdminPage';
  };

  const handleDelete = () => {
    setInput(input.slice(0, -1)); // Remove the last character from the input
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
