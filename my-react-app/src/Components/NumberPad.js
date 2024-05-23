import React, { useState, useEffect } from 'react';
import './NumberPad.css'; // Import the CSS file

function NumberPad() {
  const [input, setInput] = useState(''); // State to keep track of the input
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);

  // Function to shuffle numbers
  const shuffleNumbers = () => {
    const shuffled = numbers.sort(() => Math.random() - 0.5);
    setNumbers([...shuffled]);
  };

  // Shuffle numbers on component mount
  useEffect(() => {
    shuffleNumbers();
  }, []);

  const handleNumberClick = (number) => {
    setInput(input + number); // Append the clicked number to the current input
    shuffleNumbers(); // Shuffle numbers after each click
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
        <div className="display-panel">{input}</div>
        <div className="buttons-grid">
          {numbers.map(number => (
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
