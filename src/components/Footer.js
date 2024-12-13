import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} OxMaint.ai. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;