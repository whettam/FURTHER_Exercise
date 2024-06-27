// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GoogleScripts from './components/GoogleScripts';

// Render the application inside the root element in strict mode
ReactDOM.render(
  <React.StrictMode>
    <GoogleScripts />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

