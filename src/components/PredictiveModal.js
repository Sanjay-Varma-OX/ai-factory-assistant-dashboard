import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGears, 
  faCheck, 
  faRobot, 
  faChartPie,
  faClock,
  faToolbox
} from '@fortawesome/free-solid-svg-icons';

const PredictiveModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-lg">
                <FontAwesomeIcon icon={faGears} className="text-2xl text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-white">Predictive Maintenance</h2>
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
              <div className="text-3xl font-bold text-blue-600">93%</div>
              <div className="text-sm text-gray-600">Prediction Accuracy</div>
              <div className="text-green-500 text-sm">↑ 28% YoY</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">-45%</div>
              <div className="text-sm text-gray-600">Maintenance Costs</div>
              <div className="text-green-500 text-sm">Annual Savings</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">4-6 wks</div>
              <div className="text-sm text-gray-600">Early Detection</div>
              <div className="text-green-500 text-sm">Before Failure</div>
            </div>
          </div>

          {/* AI Capabilities Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">AI-Powered Predictive Analytics</h3>
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="text-center mb-6">
                <FontAwesomeIcon icon={faRobot} className="text-5xl text-blue-600 mb-4" />
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Our advanced machine learning algorithms analyze equipment data in real-time, 
                  identifying patterns and predicting potential failures weeks before they occur. 
                  This proactive approach allows for optimal maintenance scheduling and significant cost savings.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-blue-600 mb-2">Machine Learning Models</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-600">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                      Pattern Recognition
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                      Anomaly Detection
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                      Failure Prediction
                    </li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-blue-600 mb-2">Real-time Analysis</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-600">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                      Continuous Monitoring
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                      Performance Tracking
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                      Health Scoring
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Key Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <FontAwesomeIcon icon={faClock} className="text-3xl text-blue-600 mb-4" />
                <h4 className="font-semibold mb-2">Extended Equipment Life</h4>
                <p className="text-gray-600 text-sm">Increase equipment lifespan by up to 40% through optimized maintenance</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <FontAwesomeIcon icon={faChartPie} className="text-3xl text-blue-600 mb-4" />
                <h4 className="font-semibold mb-2">Cost Optimization</h4>
                <p className="text-gray-600 text-sm">Reduce maintenance costs by 45% through predictive scheduling</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <FontAwesomeIcon icon={faToolbox} className="text-3xl text-blue-600 mb-4" />
                <h4 className="font-semibold mb-2">Efficient Planning</h4>
                <p className="text-gray-600 text-sm">Better resource allocation with AI-driven maintenance scheduling</p>
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
            <p className="mt-4 text-gray-500 text-sm">Discover how our AI can transform your maintenance operations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveModal;
