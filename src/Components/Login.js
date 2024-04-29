import React from 'react';
import NumberPad from './NumberPad';
import './Login.css';

function Login() {
    // Callback function to handle number clicks
    const handleNumberClick = (number) => {
      console.log('Clicked number:', number);
      // Add your logic here to handle the clicked number
    };
    return (
      <div>
        <NumberPad onNumberClick={handleNumberClick} />
      </div>
  
    );
  }
  
  export default Login;