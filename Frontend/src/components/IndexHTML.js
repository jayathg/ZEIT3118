// IndexHTML.js
import React, { useEffect } from 'react';

const IndexHTML = () => {
  useEffect(() => {
    // Create a new iframe element
    const iframe = document.createElement('iframe');
    
    // Set attributes for the iframe
    iframe.setAttribute('src', '/index.html'); // Update the src attribute to point to the correct location
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('scrolling', 'auto');
    iframe.style.width = '100%';
    iframe.style.height = '100vh';
    
    // Append the iframe to the document body
    document.body.appendChild(iframe);

    // Clean up function to remove the iframe when the component unmounts
    return () => {
      document.body.removeChild(iframe);
    };
  }, []);

  return null; // Render nothing directly from this component
};

export default IndexHTML;

