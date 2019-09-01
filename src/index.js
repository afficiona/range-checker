/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';

// Import root app
import App from './containers/App';
import './App.scss';

const MOUNT_NODE = document.getElementById('root');

const render = () => {
  ReactDOM.render(
    <App />,
    MOUNT_NODE,
  );
};

render();
