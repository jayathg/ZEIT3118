import React from 'react';
import './NumberPad.css';
import axios from 'axios';


function NumberPad() {
  let employeeID = "";

  const handleNumberClick = (number) => {
    employeeID += number;
    console.log("Employee ID: ", employeeID)
  };

  const navigateToHomeAdminPage = async () => {
    console.log("Navigating to Home Admin Page")
    try {
      const response = await axios.post(`http://131.236.129.19:3001/login`, { userID: employeeID });
      console.log("Login response:", response.data);
      //navigate('/HomeAdminPage'); // Adjust route as necessary
    } catch (error) {
      console.error("Login failed:", error.response ? error.response.data.error : error.message);
    }
  };
  

  return (
    <div className="number-pad-container">
      <h1>Enter Your PIN</h1>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(number => (
        <button key={number} onClick={() => handleNumberClick(number)}>{number}</button>
      ))}
      <button onClick={navigateToHomeAdminPage}>Go to Home Admin Page</button>
    </div>
  );
}

export default NumberPad;
