import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-200' : 'hover:text-blue-200';
  };

  return (
    <nav className="bg-blue-900 text-white px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">OxMaint.ai</Link>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className={isActive('/')}>Home</Link>
          <a href="/#dashboard" className="hover:text-blue-200">Dashboard</a>
          <a href="/#capabilities" className="hover:text-blue-200">Capabilities</a>
          <a href="/#metrics" className="hover:text-blue-200">Metrics</a>
          <a href="/#actions" className="hover:text-blue-200">Actions</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;