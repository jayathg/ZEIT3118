// LandingPage.js
import React, { useState, useEffect } from 'react';

const LandingPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      const jsonData = await response.json();
      setData(jsonData);
      console.log('Fetched data:', jsonData); // Log the fetched data to the console
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Landing Page</h1>
      <button onClick={fetchData}>Fetch Data</button>
      {data && <p>{data.message}</p>}
    </div>
  );
};

export default LandingPage;

