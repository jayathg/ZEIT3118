import React from 'react';
import './NumberPad.css'; // Import CSS file for styling

function NumberPad() {
  const handleNumberClick = (number) => {
    console.log('Clicked number:', number);
  };

  const navigateToHomeAdminPage = () => {
    window.location.href = '/HomeAdminPage';
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
