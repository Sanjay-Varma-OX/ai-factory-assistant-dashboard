import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRobot,
  faGaugeHigh,
  faChartPie,
  faCloudArrowUp,
  faPlug,
  faMobile,
  faCode,
  faShieldHalved,
} from '@fortawesome/free-solid-svg-icons';

const FeatureCard = ({ icon, title, description, highlights }) => (
  <div className="bg-white text-black backdrop-blur-lg rounded-xl p-6 hover:bg-gray-100 transition-all duration-300">
  <div className="flex items-center mb-4">
    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
      <FontAwesomeIcon icon={icon} className="text-xl text-white" />
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
  </div>
  <p className="mb-4">{description}</p>
  {highlights && (
    <ul className="space-y-2">
      {highlights.map((highlight, index) => (
        <li key={index} className="flex items-center text-sm">
          <span className="mr-2">•</span>
          {highlight}
        </li>
      ))}
    </ul>
  )}
</div>
);

const FeaturesPage = () => {
  const features = [
    {
      icon: faRobot,
      title: "AI-Powered Analytics",
      description: "Advanced machine learning algorithms analyze equipment data in real-time",
      highlights: [
        "Predictive failure analysis",
        "Pattern recognition",
        "Anomaly detection",
        "Smart maintenance scheduling"
      ]
    },
    {
      icon: faGaugeHigh,
      title: "Real-Time Monitoring",
      description: "Monitor equipment performance and health metrics in real-time",
      highlights: [
        "Live performance tracking",
        "Instant alerts",
        "Custom thresholds",
        "Performance trending"
      ]
    },
    {
      icon: faChartPie,
      title: "Advanced Analytics Dashboard",
      description: "Comprehensive analytics dashboard with actionable insights",
      highlights: [
        "Interactive visualizations",
        "Custom reporting",
        "KPI tracking",
        "Historical analysis"
      ]
    },
    {
      icon: faCloudArrowUp,
      title: "Cloud-Based Platform",
      description: "Secure, scalable, and accessible from anywhere",
      highlights: [
        "Automatic updates",
        "Data backup",
        "Multi-device access",
        "Real-time sync"
      ]
    },
    {
      icon: faPlug,
      title: "Integration Capabilities",
      description: "Seamless integration with existing systems and equipment",
      highlights: [
        "API support",
        "Third-party integrations",
        "Custom connectors",
        "Data import/export"
      ]
    },
    {
      icon: faMobile,
      title: "Mobile Access",
      description: "Complete functionality on mobile devices",
      highlights: [
        "Native mobile apps",
        "Push notifications",
        "Offline capabilities",
        "Mobile-optimized interface"
      ]
    },
    {
      icon: faCode,
      title: "Customization Options",
      description: "Tailor the platform to your specific needs",
      highlights: [
        "Custom workflows",
        "Configurable alerts",
        "Custom reporting",
        "Role-based access"
      ]
    },
    {
      icon: faShieldHalved,
      title: "Enterprise Security",
      description: "Industry-leading security measures",
      highlights: [
        "End-to-end encryption",
        "Role-based access control",
        "Audit logging",
        "Compliance certifications"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-800 to-blue-600">
      {/* Hero Section */}
      <div className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-30"></div>
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Powerful Features for Modern Maintenance
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Experience the next generation of maintenance management with our comprehensive feature set
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <button 
            onClick={() => window.Calendly?.initPopupWidget({url: 'https://calendly.com/oxmaintapp/30min'})}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors inline-flex items-center space-x-2"
          >
            <span>Start Your Free Trial</span>
            <span className="text-xl">→</span>
          </button>
          <p className="mt-4 text-blue-200 text-sm">No credit card required</p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
