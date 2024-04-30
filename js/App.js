import './App.css';
import React from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './LoginFrontEnd';
import HomeAdminPage from './HomeAdminPage';
import NotFoundPage from './NotFoundPage';
import AddPage from './AddPage';
import DeletePage from './DeletePage';
import EditPage from './EditPage';
import SearchPage from './SearchPageEdit';

const router = createBrowserRouter([
  {
    path: '/',
    element: React.createElement(Login),
  },
  {
    path: '/HomeAdminPage',
    element: React.createElement(HomeAdminPage),
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
