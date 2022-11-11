import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import AddCat from "./pages/AddCat";


export default function App() {
    return (
		<Home />
    );
  }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);