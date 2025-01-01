import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, 
  faClockRotateLeft, 
  faGears, 
  faMoneyBillTrendUp, 
  faBell
} from '@fortawesome/free-solid-svg-icons';
import DowntimeModal from '../components/DowntimeModal';
import PredictiveModal from '../components/PredictiveModal';

const BenefitCard = ({ icon, title, description, stats }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-800 to-blue-600 rounded-lg flex items-center justify-center mr-4">
            <FontAwesomeIcon icon={icon} className="text-2xl text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600 mb-6">{description}</p>
        {stats && (
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-blue-600 font-bold text-2xl">{stats.value}</p>
                <p className="text-sm text-gray-600">{stats.label}</p>
              </div>
              <div className="flex items-center text-green-500">
                <span className="text-lg font-semibold">↑ {stats.improvement}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
{title === "Downtime Reduction" && (
  <DowntimeModal 
    isOpen={isModalOpen} 
    onClose={() => setIsModalOpen(false)} 
  />
)}
{title === "Predictive Maintenance" && (
  <PredictiveModal 
    isOpen={isModalOpen} 
    onClose={() => setIsModalOpen(false)} 
  />
)}
    </>
  );
};

const BenefitsPage = () => {
  const benefits = [
    {
      icon: faChartLine,
      title: "Downtime Reduction",
      description: "Minimize unexpected equipment failures with our AI-powered predictive analytics, ensuring maximum operational efficiency.",
      stats: {
        value: "85%",
        label: "Reduced Downtime",
        improvement: "32% YoY"
      }
    },
    {
      icon: faGears,
      title: "Predictive Maintenance",
      description: "Leverage advanced AI algorithms to predict equipment failures before they occur, optimizing maintenance schedules.",
      stats: {
        value: "93%",
        label: "Failure Prediction Accuracy",
        improvement: "28% YoY"
      }
    },
    {
      icon: faMoneyBillTrendUp,
      title: "Cost Reduction",
      description: "Optimize maintenance costs through data-driven decisions and preventive measures, reducing unnecessary expenses.",
      stats: {
        value: "40%",
        label: "Cost Savings",
        improvement: "25% YoY"
      }
    },
    {
      icon: faBell,
      title: "Real-time Insights & Alerts",
      description: "Receive instant notifications and insights about your equipment performance, enabling immediate action when needed.",
      stats: {
        value: "< 1min",
        label: "Alert Response Time",
        improvement: "45% YoY"
      }
    },
    {
      icon: faClockRotateLeft,
      title: "Historic Insights & Prediction",
      description: "Analyze historical data patterns to make accurate predictions about future maintenance needs and potential issues.",
      stats: {
        value: "99.9%",
        label: "Data Accuracy",
        improvement: "15% YoY"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-800 to-blue-600">
      {/* Hero Section */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Transform Your Maintenance Operations
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Experience the power of AI-driven maintenance management with industry-leading benefits and ROI
          </p>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <button 
            onClick={() => window.Calendly?.initPopupWidget({url: 'https://calendly.com/oxmaintapp/30min'})}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center space-x-2"
          >
            <span>Schedule a Demo</span>
            <span className="text-xl">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BenefitsPage;
