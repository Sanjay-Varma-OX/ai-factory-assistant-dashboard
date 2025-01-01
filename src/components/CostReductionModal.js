import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMoneyBillTrendUp, 
  faCheck, 
  faChartLine,
  faPiggyBank,
  faCalculator,
  faHandHoldingDollar,
  faArrowTrendDown,
  faWrench
} from '@fortawesome/free-solid-svg-icons';

const CostReductionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-lg">
                <FontAwesomeIcon icon={faMoneyBillTrendUp} className="text-2xl text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-white">Cost Reduction Analysis</h2>
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
              <div className="text-3xl font-bold text-blue-600">40%</div>
              <div className="text-sm text-gray-600">Cost Savings</div>
              <div className="text-green-500 text-sm">↑ 25% YoY</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">$1.2M</div>
              <div className="text-sm text-gray-600">Average Annual Savings</div>
              <div className="text-green-500 text-sm">Per Facility</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">6 mo</div>
              <div className="text-sm text-gray-600">ROI Timeline</div>
              <div className="text-green-500 text-sm">Typical</div>
            </div>
          </div>

          {/* Cost Optimization Insights */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Smart Cost Optimization</h3>
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="text-center mb-6">
                <FontAwesomeIcon icon={faPiggyBank} className="text-5xl text-blue-600 mb-4" />
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Our AI-driven cost reduction system analyzes multiple factors to optimize maintenance spending 
                  and resource allocation. By predicting maintenance needs and preventing expensive failures, 
                  we help you achieve significant cost savings while improving operational efficiency.
                </p>
              </div>

              {/* Savings Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-blue-600 mb-2">Direct Cost Savings</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-600">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                      Reduced Emergency Repairs
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                      Optimized Spare Parts Inventory
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                      Extended Equipment Lifespan
                    </li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-blue-600 mb-2">Indirect Cost Benefits</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-600">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                      Reduced Production Downtime
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                      Lower Insurance Premiums
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                      Improved Resource Allocation
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Financial Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <FontAwesomeIcon icon={faCalculator} className="text-3xl text-blue-600 mb-4" />
                <h4 className="font-semibold mb-2">Budget Optimization</h4>
                <p className="text-gray-600 text-sm">Smart allocation of maintenance budget based on AI predictions</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <FontAwesomeIcon icon={faHandHoldingDollar} className="text-3xl text-blue-600 mb-4" />
                <h4 className="font-semibold mb-2">Resource Efficiency</h4>
                <p className="text-gray-600 text-sm">Optimal use of maintenance staff and resources</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <FontAwesomeIcon icon={faArrowTrendDown} className="text-3xl text-blue-600 mb-4" />
                <h4 className="font-semibold mb-2">Reduced Expenses</h4>
                <p className="text-gray-600 text-sm">Lower maintenance and replacement costs</p>
              </div>
            </div>
          </div>

          {/* ROI Calculator Preview */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Cost Savings Visualization</h3>
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <FontAwesomeIcon icon={faChartLine} className="text-5xl text-blue-600 mb-4" />
              <h4 className="text-lg font-semibold text-gray-800 mb-2">AI-Powered ROI Analysis</h4>
              <p className="text-gray-600 mb-4">
                Our advanced analytics provide detailed insights into potential cost savings
                across different maintenance scenarios and equipment types.
              </p>
              <div className="flex justify-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <FontAwesomeIcon icon={faWrench} className="mr-2" />
                  Maintenance Optimization
                </span>
                <span className="flex items-center">
                  <FontAwesomeIcon icon={faPiggyBank} className="mr-2" />
                  Cost Tracking
                </span>
                <span className="flex items-center">
                  <FontAwesomeIcon icon={faChartLine} className="mr-2" />
                  Savings Forecasting
                </span>
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
              Calculate Your Savings
            </button>
            <p className="mt-4 text-gray-500 text-sm">Get a personalized cost reduction analysis for your facility</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostReductionModal;
