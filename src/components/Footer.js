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
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">About OxMaint.ai</h3>
            <p className="text-gray-300 text-sm">
              OxMaint.ai is a leading provider of AI-powered maintenance solutions, helping organizations
              achieve operational excellence through real-time monitoring and predictive insights.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-1">
              <li><a href="/about" className="text-gray-300 hover:text-white text-sm transition-colors">About Us</a></li>
              <li><a href="/services" className="text-gray-300 hover:text-white text-sm transition-colors">Our Services</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white text-sm transition-colors">Contact Us</a></li>
              <li><a href="/privacy-policy" className="text-gray-300 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
            <div className="space-y-1 text-sm">
              <p className="text-gray-300">440 N. Wolfe Road, Sunnyvale, CA 94085, USA</p>
              <p><a href="mailto:contact@oxmaint.com" className="text-gray-300 hover:text-white">contact@oxmaint.com</a></p>
              <p><a href="tel:+13158881995" className="text-gray-300 hover:text-white">+1 (315) 888-1995</a></p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-blue-800/50 border border-blue-700 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded text-sm transition-colors"
              >
                Subscribe
              </button>
              {subscribeStatus && (
                <p className="text-xs text-gray-300">{subscribeStatus}</p>
              )}
            </form>
          </div>
        </div>

        {/* Social Links and Copyright */}
        <div className="border-t border-blue-800 pt-4 mt-4">
          <div className="flex flex-col items-center space-y-3">
            <nav className="flex justify-center space-x-4">
              <a href="https://www.facebook.com/profile.php?id=100088709356711" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transform hover:scale-110 transition-all">
                <i className="uil uil-facebook-f text-xl"></i>
              </a>
              <a href="https://www.instagram.com/oxmaintapp/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-pink-400 transform hover:scale-110 transition-all">
                <i className="uil uil-instagram text-xl"></i>
              </a>
              <a href="https://www.linkedin.com/company/oxmaint/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transform hover:scale-110 transition-all">
                <i className="uil uil-linkedin text-xl"></i>
              </a>
              <a href="https://www.youtube.com/channel/UCcZOKgJbv0Qoey6R6LM8_Nw" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-400 transform hover:scale-110 transition-all">
                <i className="uil uil-youtube text-xl"></i>
              </a>
            </nav>
            <p className="text-gray-400 text-xs">&copy; {new Date().getFullYear()} OxMaint.ai. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;