import React from 'react';

const NotFoundPage = () => {
  return (
    React.createElement('div', null,
      React.createElement('h1', null, 'Error 404 - Page Not Found'),
      React.createElement('p', null, 'Sorry, the page you are looking for does not exist.'),
      React.createElement('a', { href: '/' }, 'Take Me Back')
    )
  );
};

export default NotFoundPage;