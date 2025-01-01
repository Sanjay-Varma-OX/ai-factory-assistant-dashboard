import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Company Info Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6 border-b border-blue-600 pb-2 inline-block">
              About OxMaint.ai
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              OxMaint.ai is a leading provider of AI-powered maintenance solutions, helping organizations
              achieve operational excellence through real-time monitoring, predictive insights, and intelligent alerts.
            </p>
            <p className="text-gray-300 leading-relaxed text-sm">
              Our mission is to empower businesses with tools that optimize performance and enhance reliability.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6 border-b border-blue-600 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-sm">
                  Our Services
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-sm">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-sm">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6 border-b border-blue-600 pb-2 inline-block">
              Contact Us
            </h3>
            <div className="space-y-3">
              <p className="flex items-center text-gray-300 group cursor-pointer text-sm">
                <i className="uil uil-location-point mr-3 text-xl group-hover:text-blue-400 transition-colors"></i>
                <span className="group-hover:text-white transition-colors">
                  440 N. Wolfe Road, Sunnyvale, CA 94085, USA
                </span>
              </p>
              <p className="flex items-center text-gray-300 group text-sm">
                <i className="uil uil-envelope mr-3 text-xl group-hover:text-blue-400 transition-colors"></i>
                <a href="mailto:contact@oxmaint.com" className="group-hover:text-white transition-colors">
                  contact@oxmaint.com
                </a>
              </p>
              <p className="flex items-center text-gray-300 group text-sm">
                <i className="uil uil-phone mr-3 text-xl group-hover:text-blue-400 transition-colors"></i>
                <a href="tel:+13158881995" className="group-hover:text-white transition-colors">
                  +1 (315) 888-1995
                </a>
              </p>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6 border-b border-blue-600 pb-2 inline-block">
              Stay Updated
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-blue-800/50 border border-blue-700 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="border-t border-blue-800 pt-8 mt-8">
          <div className="flex flex-col items-center space-y-6">
            <nav className="nav social social-white flex justify-center space-x-6">
              <a 
                href="https://www.facebook.com/profile.php?id=100088709356711" 
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-125 hover:text-blue-400 transition-all duration-300"
              >
                <i className="uil uil-facebook-f text-2xl"></i>
              </a>
              <a 
                href="https://www.instagram.com/oxmaintapp/" 
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-125 hover:text-pink-500 transition-all duration-300"
              >
                <i className="uil uil-instagram text-2xl"></i>
              </a>
              <a 
                href="https://www.linkedin.com/company/oxmaint/" 
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-125 hover:text-blue-500 transition-all duration-300"
              >
                <i className="uil uil-linkedin text-2xl"></i>
              </a>
              <a 
                href="https://www.youtube.com/channel/UCcZOKgJbv0Qoey6R6LM8_Nw" 
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-125 hover:text-red-500 transition-all duration-300"
              >
                <i className="uil uil-youtube text-2xl"></i>
              </a>
            </nav>

            {/* Copyright */}
            <div className="text-center text-gray-400 text-sm">
              <p>&copy; {new Date().getFullYear()} OxMaint.ai. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;