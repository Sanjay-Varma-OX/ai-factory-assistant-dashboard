import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      // Using mailto link as a fallback method
      const mailtoLink = `mailto:contact@oxmaint.com?subject=Newsletter Subscription&body=New newsletter subscription request from: ${email}`;
      window.location.href = mailtoLink;
      
      setSubscribeStatus('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      setSubscribeStatus('Subscription failed. Please try again.');
    }
  };

  return (
    <footer className="bg-[#1e3a8a] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About OxMaint.ai</h3>
            <p className="text-gray-300 text-sm">
              OxMaint.ai is a leading provider of AI-powered maintenance solutions, helping organizations achieve operational excellence through real-time monitoring and predictive insights.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-300 hover:text-white text-sm">About Us</a></li>
              <li><a href="/services" className="text-gray-300 hover:text-white text-sm">Our Services</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white text-sm">Contact Us</a></li>
              <li><a href="/privacy-policy" className="text-gray-300 hover:text-white text-sm">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center text-gray-300 text-sm">
                <i className="uil uil-location-point text-xl mr-2"></i>
                <span>440 N. Wolfe Road, Sunnyvale, CA 94085, USA</span>
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <i className="uil uil-envelope text-xl mr-2"></i>
                <a href="mailto:contact@oxmaint.com" className="hover:text-white">
                  contact@oxmaint.com
                </a>
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <i className="uil uil-phone text-xl mr-2"></i>
                <a href="tel:+13158881995" className="hover:text-white">
                  +1 (315) 888-1995
                </a>
              </div>
              
              {/* Social Media Links */}
              <nav className="nav social social-white flex space-x-4 mt-4">
                <a href="https://www.facebook.com/profile.php?id=100088709356711" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-gray-300 hover:text-white">
                  <i className="uil uil-facebook-f text-xl"></i>
                </a>
                <a href="https://www.instagram.com/oxmaintapp/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-gray-300 hover:text-white">
                  <i className="uil uil-instagram text-xl"></i>
                </a>
                <a href="https://www.linkedin.com/company/oxmaint/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-gray-300 hover:text-white">
                  <i className="uil uil-linkedin text-xl"></i>
                </a>
                <a href="https://www.youtube.com/channel/UCcZOKgJbv0Qoey6R6LM8_Nw" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-gray-300 hover:text-white">
                  <i className="uil uil-youtube text-xl"></i>
                </a>
              </nav>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-blue-900/50 border border-blue-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded text-sm transition-colors"
              >
                Subscribe
              </button>
              {subscribeStatus && (
                <p className="text-xs text-gray-300 mt-1">{subscribeStatus}</p>
              )}
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 pt-8 border-t border-blue-800">
          <p className="text-sm text-gray-300">&copy; {new Date().getFullYear()} OxMaint.ai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
