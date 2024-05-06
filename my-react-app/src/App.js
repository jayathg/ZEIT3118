import './App.css';
import React from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Components/Login';
import HomeAdminPage from './Components/HomeAdminPage';
import NotFoundPage from './Components/NotFoundPage';
import AddPage from './Components/AddPage';
import DeletePage from './Components/DeletePage';
import EditPage from './Components/EditPage';
import SearchPage from './Components/SearchPageEdit';

const router = createBrowserRouter([
  {
    element: <Login />,
  },
  {
    path: '/HomeAdminPage',
    element: <HomeAdminPage />,
  },
  {
    path: '/AddPage',
    element: React.createElement(AddPage),
  },
  {
    path: '/DeletePage',
    element: React.createElement(DeletePage),
  },
  {
    path: '/EditPage',
    element: React.createElement(EditPage),
  },
  {
    path: '/SearchPage',
    element: React.createElement(SearchPage),
  },
  {
    path: '*',  
    element: React.createElement(NotFoundPage),
  }
]);

const App = () => { // Define App component
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <App /> // Render the App component
);

export default App;
