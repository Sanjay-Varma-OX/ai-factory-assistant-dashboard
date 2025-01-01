import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 border-b border-blue-700 pb-2">About OxMaint.ai</h3>
            <p className="text-gray-300 leading-relaxed">
              OxMaint.ai is a leading provider of AI-powered maintenance solutions, helping organizations
              achieve operational excellence through real-time monitoring, predictive insights, and intelligent alerts.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our mission is to empower businesses with tools that optimize performance and enhance reliability.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 border-b border-blue-700 pb-2">Contact Us</h3>
            <div className="space-y-2">
              <p className="flex items-center text-gray-300">
                <i className="uil uil-location-point mr-2 text-xl"></i>
                440 N. Wolfe Road, Sunnyvale, CA 94085, USA
              </p>
              <p className="flex items-center text-gray-300">
                <i className="uil uil-envelope mr-2 text-xl"></i>
                <a href="mailto:contact@oxmaint.com" className="hover:text-blue-300 transition-colors">
                  contact@oxmaint.com
                </a>
              </p>
              <p className="flex items-center text-gray-300">
                <i className="uil uil-phone mr-2 text-xl"></i>
                <a href="tel:+13158881995" className="hover:text-blue-300 transition-colors">
                  +1 (315) 888-1995
                </a>
              </p>
            </div>
          </div>

          {/* Social Media & Connect */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 border-b border-blue-700 pb-2">Connect With Us</h3>
            <div className="flex space-x-6 mb-6">
              <a
                href="https://www.linkedin.com/company/oxmaint/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <i className="uil uil-linkedin text-3xl"></i>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100088709356711"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <i className="uil uil-facebook-f text-3xl"></i>
              </a>
              <a
                href="https://www.instagram.com/oxmaintapp/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <i className="uil uil-instagram text-3xl"></i>
              </a>
              <a
                href="https://www.youtube.com/channel/UCcZOKgJbv0Qoey6R6LM8_Nw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <i className="uil uil-youtube text-3xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-blue-700 text-center">
          <p className="text-gray-300">
            &copy; {new Date().getFullYear()} OxMaint.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;