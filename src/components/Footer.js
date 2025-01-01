import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faEnvelope, 
  faPhone 
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebookF, 
  faInstagram, 
  faLinkedinIn, 
  faYoutube 
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      const mailtoLink = `mailto:contact@oxmaint.com?subject=Newsletter Subscription&body=New newsletter subscription request from: ${email}`;
      window.location.href = mailtoLink;
      setSubscribeStatus('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      setSubscribeStatus('Subscription failed. Please try again.');
    }
  };

  return (
    <footer className="bg-[#1e3a8a] text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">About OxMaint.ai</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              OxMaint.ai is a leading provider of AI-powered maintenance solutions, helping organizations achieve operational excellence through real-time monitoring and predictive insights.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/about" className="text-gray-300 hover:text-white text-sm transition-colors duration-300">About Us</a></li>
              <li><a href="/services" className="text-gray-300 hover:text-white text-sm transition-colors duration-300">Our Services</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white text-sm transition-colors duration-300">Contact Us</a></li>
              <li><a href="/privacy-policy" className="text-gray-300 hover:text-white text-sm transition-colors duration-300">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300 text-sm">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5 mr-3" />
                <span>440 N. Wolfe Road, Sunnyvale, CA 94085, USA</span>
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 mr-3" />
                <a href="mailto:contact@oxmaint.com" className="hover:text-white transition-colors duration-300">
                  contact@oxmaint.com
                </a>
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <FontAwesomeIcon icon={faPhone} className="w-5 h-5 mr-3" />
                <a href="tel:+13158881995" className="hover:text-white transition-colors duration-300">
                  +1 (315) 888-1995
                </a>
              </div>
              
              {/* Social Media Links */}
              <div className="pt-4 mt-4 border-t border-blue-700">
                <div className="flex space-x-6">
                  <a href="https://www.facebook.com/profile.php?id=100088709356711" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-gray-300 hover:text-[#1877f2] transition-colors duration-300">
                    <FontAwesomeIcon icon={faFacebookF} className="w-5 h-5" />
                  </a>
                  <a href="https://www.instagram.com/oxmaintapp/" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-gray-300 hover:text-[#e4405f] transition-colors duration-300">
                    <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
                  </a>
                  <a href="https://www.linkedin.com/company/oxmaint/" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-gray-300 hover:text-[#0077b5] transition-colors duration-300">
                    <FontAwesomeIcon icon={faLinkedinIn} className="w-5 h-5" />
                  </a>
                  <a href="https://www.youtube.com/channel/UCcZOKgJbv0Qoey6R6LM8_Nw" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-gray-300 hover:text-[#ff0000] transition-colors duration-300">
                    <FontAwesomeIcon icon={faYoutube} className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Stay Updated</h3>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-blue-900/50 border border-blue-700 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm transition-colors duration-300"
              >
                Subscribe
              </button>
              {subscribeStatus && (
                <p className="text-xs text-gray-300 mt-2">{subscribeStatus}</p>
              )}
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-12 pt-8 border-t border-blue-700">
          <p className="text-sm text-gray-300">&copy; {new Date().getFullYear()} OxMaint.ai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
