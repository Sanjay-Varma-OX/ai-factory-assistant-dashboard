import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBell, 
  faCheck, 
  faMobileScreen,
  faGauge,
  faBoltLightning,
  faChartSimple,
  faCircleExclamation,
  faComputer,
  faServer
} from '@fortawesome/free-solid-svg-icons';

const RealTimeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-lg">
                <FontAwesomeIcon icon={faBell} className="text-2xl text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-white">Real-time Insights & Alerts</h2>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">< 1min</div>
              <div className="text-sm text-gray-600">Alert Response Time</div>
              <div className="text-green-500 text-sm">↑ 45% YoY</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">99.9%</div>
              <div className="text-sm text-gray-600">Alert Accuracy</div>
              <div className="text-green-500 text-sm">Real-time</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">24/7</div>
              <div className="text-sm text-gray-600">Monitoring</div>
              <div className="text-green-500 text-sm">Multi-platform</div>
            </div>
          </div>

          {/* Alert System Overview */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Intelligent Alert System</h3>
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="text-center mb-6">
                <FontAwesomeIcon icon={faBoltLightning} className="text-5xl text-blue-600 mb-4" />
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Our AI-powered alert system continuously monitors your equipment and processes, 
                  providing instant notifications and actionable insights. With smart filtering and 
                  priority-based alerts, you'll never miss critical events while avoiding alert fatigue.
                </p>
              </div>

              {/* Alert Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-blue-600 mb-2">Alert Types</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-600">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                      Predictive Alerts
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                      Performance Thresholds
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                      Anomaly Detection
                    </li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-blue-600 mb-2">Delivery Channels</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-600">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                      Mobile Notifications
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                      Email Alerts
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                      SMS Updates
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Insights Dashboard Preview */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Real-time Monitoring Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <FontAwesomeIcon icon={faMobileScreen} className="text-3xl text-blue-600 mb-4" />
                <h4 className="font-semibold mb-2">Mobile Access</h4>
                <p className="text-gray-600 text-sm">Monitor your equipment status from anywhere, anytime</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <FontAwesomeIcon icon={faGauge} className="text-3xl text-blue-600 mb-4" />
                <h4 className="font-semibold mb-2">Performance Metrics</h4>
                <p className="text-gray-600 text-sm">Real-time performance tracking and analysis</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <FontAwesomeIcon icon={faChartSimple} className="text-3xl text-blue-600 mb-4" />
                <h4 className="font-semibold mb-2">Trend Analysis</h4>
                <p className="text-gray-600 text-sm">Instant insights into performance patterns</p>
              </div>
            </div>
          </div>

          {/* Integration Capabilities */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Smart Integration</h3>
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <FontAwesomeIcon icon={faServer} className="text-3xl text-blue-600 mb-2" />
                  <h5 className="font-semibold">Data Collection</h5>
                  <p className="text-sm text-gray-600">Automated sensor data collection</p>
                </div>
                <div>
                  <FontAwesomeIcon icon={faComputer} className="text-3xl text-blue-600 mb-2" />
                  <h5 className="font-semibold">Processing</h5>
                  <p className="text-sm text-gray-600">Real-time data analysis</p>
                </div>
                <div>
                  <FontAwesomeIcon icon={faCircleExclamation} className="text-3xl text-blue-600 mb-2" />
                  <h5 className="font-semibold">Alert Generation</h5>
                  <p className="text-sm text-gray-600">Intelligent alert prioritization</p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <button 
              onClick={() => {
                onClose();
                window.Calendly?.initPopupWidget({url: 'https://calendly.com/oxmaintapp/30min'});
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              See Live Demo
            </button>
            <p className="mt-4 text-gray-500 text-sm">Experience real-time monitoring in action</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeModal;
