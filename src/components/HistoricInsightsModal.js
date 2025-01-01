import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClockRotateLeft, 
  faCheck, 
  faMagnifyingGlassChart,
  faBrain,
  faDatabase,
  faChartArea,
  faLineChart,
  faArrowTrendUp,
  faGears
} from '@fortawesome/free-solid-svg-icons';

const HistoricInsightsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-lg">
                <FontAwesomeIcon icon={faClockRotateLeft} className="text-2xl text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-white">Historic Insights & Prediction</h2>
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
              <div className="text-3xl font-bold text-blue-600">99.9%</div>
              <div className="text-sm text-gray-600">Data Accuracy</div>
              <div className="text-green-500 text-sm">↑ 15% YoY</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">5+ Years</div>
              <div className="text-sm text-gray-600">Historical Analysis</div>
              <div className="text-green-500 text-sm">Deep Learning</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">95%</div>
              <div className="text-sm text-gray-600">Prediction Accuracy</div>
              <div className="text-green-500 text-sm">ML-Powered</div>
            </div>
          </div>

          {/* AI Analysis Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Advanced Data Analysis</h3>
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="text-center mb-6">
                <FontAwesomeIcon icon={faBrain} className="text-5xl text-blue-600 mb-4" />
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Our AI-powered historical analysis engine processes years of equipment data to identify 
                  patterns, predict future trends, and provide actionable maintenance insights. By combining 
                  historical data with machine learning, we enable predictive decision-making.
                </p>
              </div>

              {/* Analysis Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-blue-600 mb-2">Data Processing</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-600">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                      Pattern Recognition
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                      Trend Analysis
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                      Anomaly Detection
                    </li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-blue-600 mb-2">Predictive Capabilities</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-600">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                      Future Trend Prediction
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                      Maintenance Forecasting
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                      Performance Optimization
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Comprehensive Analysis Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <FontAwesomeIcon icon={faDatabase} className="text-3xl text-blue-600 mb-4" />
                <h4 className="font-semibold mb-2">Data Repository</h4>
                <p className="text-gray-600 text-sm">Secure storage and processing of historical equipment data</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <FontAwesomeIcon icon={faChartArea} className="text-3xl text-blue-600 mb-4" />
                <h4 className="font-semibold mb-2">Trend Visualization</h4>
                <p className="text-gray-600 text-sm">Interactive charts and graphs for data analysis</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <FontAwesomeIcon icon={faMagnifyingGlassChart} className="text-3xl text-blue-600 mb-4" />
                <h4 className="font-semibold mb-2">Pattern Analysis</h4>
                <p className="text-gray-600 text-sm">Advanced pattern recognition and analysis</p>
              </div>
            </div>
          </div>

          {/* Data Processing Pipeline */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Intelligent Data Pipeline</h3>
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div>
                  <FontAwesomeIcon icon={faDatabase} className="text-3xl text-blue-600 mb-2" />
                  <h5 className="font-semibold">Data Collection</h5>
                  <p className="text-sm text-gray-600">Historical data gathering</p>
                </div>
                <div>
                  <FontAwesomeIcon icon={faGears} className="text-3xl text-blue-600 mb-2" />
                  <h5 className="font-semibold">Processing</h5>
                  <p className="text-sm text-gray-600">AI-powered analysis</p>
                </div>
                <div>
                  <FontAwesomeIcon icon={faArrowTrendUp} className="text-3xl text-blue-600 mb-2" />
                  <h5 className="font-semibold">Pattern Recognition</h5>
                  <p className="text-sm text-gray-600">Trend identification</p>
                </div>
                <div>
                  <FontAwesomeIcon icon={faLineChart} className="text-3xl text-blue-600 mb-2" />
                  <h5 className="font-semibold">Prediction</h5>
                  <p className="text-sm text-gray-600">Future insights</p>
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
              Request Demo Access
            </button>
            <p className="mt-4 text-gray-500 text-sm">See how historical insights can transform your maintenance strategy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricInsightsModal;
