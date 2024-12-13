import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-200' : 'hover:text-blue-200';
  };

  return (
    <nav className="bg-blue-900 text-white px-6 py-4 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center space-x-2">
            OxMaint.ai
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="#solutions" className="hover:text-blue-200">Solutions</Link>
            <Link to="#industries" className="hover:text-blue-200">Industries</Link>
            <Link to="#technology" className="hover:text-blue-200">Technology</Link>
            <Link to="/factory" className="bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-600">Factory Demo</Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-2">
            <div className="flex flex-col space-y-4">
              <Link to="/" className={isActive('/')} onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="#solutions" className="hover:text-blue-200" onClick={() => setIsOpen(false)}>Solutions</Link>
              <Link to="#industries" className="hover:text-blue-200" onClick={() => setIsOpen(false)}>Industries</Link>
              <Link to="#technology" className="hover:text-blue-200" onClick={() => setIsOpen(false)}>Technology</Link>
              <Link to="/factory" className="bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-600 inline-block" onClick={() => setIsOpen(false)}>Factory Demo</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;