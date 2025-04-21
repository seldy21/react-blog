<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from 'context/AuthContext';
=======
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "context/AuthContext";
>>>>>>> 7ea940ccae91584eb13736b59fd02e14a61be98c

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
<<<<<<< HEAD
  <AuthContextProvider>
      <Router>
        <App />
      </Router>
  </AuthContextProvider>
=======
  // <React.StrictMode>
  <AuthContextProvider>
    <Router>
      <App />
    </Router>
  </AuthContextProvider>
  // </React.StrictMode>
>>>>>>> 7ea940ccae91584eb13736b59fd02e14a61be98c
);
