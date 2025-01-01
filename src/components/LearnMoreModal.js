import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRobot, 
  faChartLine, 
  faShieldHalved, 
  faGears,
  faBrain,
  faIndustry
} from '@fortawesome/free-solid-svg-icons';

const LearnMoreModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const sections = [
    {
      icon: faRobot,
      title: "AI-Powered Solution",
      content: "Our advanced AI algorithms analyze equipment data in real-time to predict and prevent failures before they occur."
    },
    {
      icon: faChartLine,
      title: "Performance Analytics",
      content: "Get detailed insights into your equipment performance with real-time monitoring and historical analysis."
    },
    {
      icon: faShieldHalved,
      title: "Enterprise Security",
      content: "Industry-leading security measures ensure your data is protected with end-to-end encryption."
    },
    {
      icon: faGears,
      title: "Smart Maintenance",
      content: "Optimize maintenance schedules and reduce downtime with predictive maintenance recommendations."
    },
    {
      icon: faBrain,
      title: "Machine Learning",
      content: "Our algorithms learn from your data to provide increasingly accurate predictions and insights."
    },
    {
      icon: faIndustry,
      title: "Industry Adaptable",
      content: "Flexible solution that adapts to various industries from manufacturing to healthcare."
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-900">Discover OxMaint.ai</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-8">
          {/* Introduction */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-blue-600 mb-4">
              Next Generation Maintenance Management
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experience the power of artificial intelligence in maintenance management.
              OxMaint.ai brings cutting-edge technology to streamline your operations.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {sections.map((section, index) => (
              <div 
                key={index}
                className="bg-blue-50 rounded-lg p-6 hover:bg-blue-100 transition-colors"
              >
                <FontAwesomeIcon 
                  icon={section.icon} 
                  className="text-3xl text-blue-600 mb-4"
                />
                <h4 className="text-xl font-semibold text-blue-900 mb-2">
                  {section.title}
                </h4>
                <p className="text-gray-600">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white mb-12">
            <h3 className="text-2xl font-bold mb-6">Why Choose OxMaint.ai?</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-center space-x-2">
                <span className="text-blue-200">✓</span>
                <span>Reduce maintenance costs by up to 30%</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-blue-200">✓</span>
                <span>Increase equipment lifespan by 25%</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-blue-200">✓</span>
                <span>Prevent 95% of equipment failures</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-blue-200">✓</span>
                <span>24/7 real-time monitoring</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button 
              onClick={() => {
                onClose();
                window.Calendly?.initPopupWidget({url: 'https://calendly.com/oxmaintapp/30min'});
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
            >
              <span>Schedule a Demo</span>
              <span className="text-xl">→</span>
            </button>
            <p className="mt-4 text-gray-500 text-sm">See how OxMaint.ai can transform your operations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMoreModal;