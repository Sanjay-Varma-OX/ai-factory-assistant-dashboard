import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import FactoryDemo from './pages/FactoryDemo.js';
//import FoodAndBeveragePage from './pages/FoodAndBeveragePage';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/factory_demo" element={<FactoryDemo />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
