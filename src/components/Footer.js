import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-6">
        {/* About Us Section */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold mb-2">About Us</h3>
          <p className="text-sm text-gray-300 max-w-2xl mx-auto">
            OxMaint.ai is a leading provider of AI-powered maintenance solutions, helping organizations 
            achieve operational excellence through real-time monitoring, predictive insights, and intelligent alerts. 
            Our mission is to empower businesses with tools that optimize performance and enhance reliability.
          </p>
        </div>

        {/* Contact and Headquarters */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold mb-2">Headquarters</h3>
          <p>440 N. Wolfe Road, Sunnyvale, CA 94085, USA</p>
          <p>Email: <a href="mailto:contact@oxmaint.com" className="text-blue-300 hover:underline">contact@oxmaint.com</a></p>
          <p>Phone: <a href="tel:+13158881995" className="text-blue-300 hover:underline">+1 (315) 888-1995</a></p>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} OxMaint.ai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
