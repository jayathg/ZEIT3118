import React from 'react';
import './NumberPad.css'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom';


function NumberPad() {
  const handleNumberClick = (number) => {
    // Handle number click logic here
    console.log('Clicked number:', number);
  };

  const navigate = useNavigate();

  const navigateToHomeAdminPage = () => {
    navigate('/HomeAdminPage');
  };

  return (
    <div className="number-pad-container">
      <div className="number-pad">
        <h1>Enter Your PIN</h1>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(number => (
          <button key={number} onClick={() => handleNumberClick(number)}>
            {number}
          </button>
        ))}
      </div>
      <div className="submit-button-container">
        <button onClick={navigateToHomeAdminPage}>Go to Home Admin Page</button>
      </div>
    </div>
  );
}

export default NumberPad;
