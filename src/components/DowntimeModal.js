import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faClock, faArrowTrendDown, faCheck } from '@fortawesome/free-solid-svg-icons';

const DowntimeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-lg">
                <FontAwesomeIcon icon={faChartLine} className="text-2xl text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-white">Downtime Reduction</h2>
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
              <div className="text-3xl font-bold text-blue-600">85%</div>
              <div className="text-sm text-gray-600">Reduced Downtime</div>
              <div className="text-green-500 text-sm">↑ 32% YoY</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">$2.5M</div>
              <div className="text-sm text-gray-600">Average Savings</div>
              <div className="text-green-500 text-sm">Per Year</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">24/7</div>
              <div className="text-sm text-gray-600">Monitoring</div>
              <div className="text-green-500 text-sm">Real-time</div>
            </div>
          </div>

         {/* Dashboard Preview */}
<div className="mb-8">
  <h3 className="text-xl font-bold text-gray-800 mb-4">Real-time Monitoring Dashboard</h3>
  <div className="bg-gray-50 rounded-lg p-8 text-center">
    <div className="flex flex-col items-center justify-center space-y-4">
      <FontAwesomeIcon icon={faChartLine} className="text-5xl text-blue-600 mb-2" />
      <h4 className="text-xl font-semibold text-gray-800">AI-Powered Intelligence</h4>
      <p className="text-gray-600 max-w-2xl">
        Our advanced AI algorithms process millions of data points in real-time to predict and prevent equipment failures. 
        The actual dashboard provides live monitoring of your equipment health, predictive maintenance alerts, and cost-saving insights.
      </p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="font-bold text-blue-600">500K+</div>
          <div className="text-sm text-gray-600">Data Points/Day</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="font-bold text-blue-600">99.9%</div>
          <div className="text-sm text-gray-600">Prediction Accuracy</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="font-bold text-blue-600">15min</div>
          <div className="text-sm text-gray-600">Early Warning</div>
        </div>
      </div>
    </div>
    <p className="text-sm text-gray-500 mt-6">
      * Preview purposes only. Actual dashboard contains sensitive operational data and advanced visualization tools.
    </p>
  </div>
</div>

          {/* Key Features */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <FontAwesomeIcon icon={faCheck} className="text-green-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Predictive Analytics</h4>
                  <p className="text-gray-600">AI-powered prediction of potential equipment failures</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <FontAwesomeIcon icon={faCheck} className="text-green-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Real-time Monitoring</h4>
                  <p className="text-gray-600">24/7 equipment performance tracking</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <FontAwesomeIcon icon={faCheck} className="text-green-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Smart Alerts</h4>
                  <p className="text-gray-600">Instant notifications for potential issues</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <FontAwesomeIcon icon={faCheck} className="text-green-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Trend Analysis</h4>
                  <p className="text-gray-600">Historical data analysis for better predictions</p>
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
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DowntimeModal;
