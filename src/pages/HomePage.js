import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndustry, faBuilding, faTools, faCar, faHospital, faGraduationCap, faStore, faUtensils, faHardHat, faPlane, faTruck, faLaptop } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const IndustryCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 transition-all hover:shadow-xl cursor-pointer industry-card">
    <FontAwesomeIcon icon={icon} className="text-4xl text-blue-600 mb-4" />
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const openCalendlyModal = () => {
  if (!window.Calendly) {
    console.error('Calendly is not loaded');
    return;
  }

  // First clean up any existing modal state
  cleanupModal();

  // Add class to body
  document.body.classList.add('modal-open');

  // Initialize Calendly popup
  window.Calendly.initPopupWidget({
    url: 'https://calendly.com/oxmaintapp/30min',
    onClose: () => {
      cleanupModal();
    }
  });

  // Add custom close button
  setTimeout(() => {
    const closeBtn = document.createElement('button');
    closeBtn.id = 'custom-close-btn';
    closeBtn.innerHTML = '×';
    closeBtn.onclick = cleanupModal;
    document.body.appendChild(closeBtn);
  }, 100);
};

const cleanupModal = () => {
  // Remove classes first
  document.body.classList.remove('modal-open');

  // Remove all Calendly-related elements
  ['calendly-overlay', 'calendly-popup', 'calendly-popup-content', 'calendly-popup-close'].forEach(className => {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
      elements[0].remove();
    }
  });

  // Remove custom close button
  const closeBtn = document.getElementById('custom-close-btn');
  if (closeBtn) closeBtn.remove();

  // Reset body styles
  document.body.style = '';
  
  // Reset all element styles
  document.querySelectorAll('*').forEach(element => {
    if (element.style) {
      // Only remove specific styles we added
      element.style.removeProperty('filter');
      element.style.removeProperty('pointer-events');
      element.style.removeProperty('overflow');
    }
  });

  // Allow clicking everywhere again
  document.body.style.pointerEvents = 'auto';
  
  // Clear any remaining blur
  document.body.style.filter = 'none';
  
  // Force DOM update
  window.requestAnimationFrame(() => {
    document.body.style.filter = 'none';
    document.body.style.pointerEvents = 'auto';
  });
};

const HomePage = () => {
  const industries = [
    {
      icon: faIndustry,
      title: "Manufacturing",
      description: "Advanced AI-driven solutions for optimizing production processes and reducing downtime.",
      link: "/factory"
    },
    {
      icon: faBuilding,
      title: "Real Estate",
      description: "Smart building management and preventive maintenance for property portfolios.",
      link: "/real_estate"
    },
    {
      icon: faTools,
      title: "Maintenance",
      description: "Predictive maintenance solutions that prevent failures before they occur.",
      link: "/maintenance"
    },
    {
      icon: faCar,
      title: "Automotive",
      description: "AI-powered maintenance for vehicle fleets and automotive facilities.",
      link: "/automotive"
    },
    {
      icon: faHospital,
      title: "Healthcare",
      description: "Ensuring critical medical equipment reliability and facility maintenance.",
      link: "/healthcare"
    },
    {
      icon: faGraduationCap,
      title: "Education",
      description: "Facility management solutions for educational institutions.",
      link: "/education"
    },
    {
      icon: faStore,
      title: "Retail",
      description: "Store equipment maintenance and facility management optimization.",
      link: "/retail"
    },
    {
      icon: faUtensils,
      title: "Food & Beverage",
      description: "Maintain food safety standards with AI-powered equipment monitoring.",
      link: "/food_and_beverage"
    },
    {
      icon: faHardHat,
      title: "Construction",
      description: "Equipment maintenance and site safety management solutions.",
      link: "/construction"
    },
    {
      icon: faPlane,
      title: "Aviation",
      description: "Critical maintenance management for aviation facilities and equipment.",
      link: "/aviation"
    },
    {
      icon: faTruck,
      title: "Logistics",
      description: "Warehouse equipment maintenance and fleet management solutions.",
      link: "/logistics"
    },
    {
      icon: faLaptop,
      title: "Technology",
      description: "IT infrastructure and data center maintenance optimization.",
      link: "/technology"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Oxmaint AI</h1>
          <p className="text-2xl mb-8">Revolutionizing maintenance with artificial intelligence</p>
          <p className="text-xl mb-12">Predictive maintenance, real-time monitoring, and intelligent optimization for all industries</p>
          <div className="flex justify-center gap-4">
            <button
              className="bg-white text-blue-800 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              onClick={openCalendlyModal}
            >
              Request Demo
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4 text-center">Why Choose Oxmaint AI?</h2>
          <p className="text-xl text-gray-600 text-center mb-12">Our AI-powered CMMS brings intelligence to your maintenance operations</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Predictive Maintenance</h3>
              <p className="text-gray-600">Stop problems before they start with AI-driven predictive analytics</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Cost Reduction</h3>
              <p className="text-gray-600">Minimize downtime and optimize maintenance resources</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Real-time Insights</h3>
              <p className="text-gray-600">Make data-driven decisions with real-time monitoring and analytics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4 text-center">Industries We Serve</h2>
          <p className="text-xl text-gray-600 text-center mb-12">Tailored AI solutions for every sector</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
  {industries.map((industry, index) => (
    <div key={index} onClick={(e) => e.preventDefault()}>
      <IndustryCard {...industry} />
    </div>
  ))}
</div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-800 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Maintenance Operations?</h2>
          <p className="text-xl mb-8">Schedule a demo to see how Oxmaint AI can help your organization</p>
          <button
            className="bg-white text-blue-800 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            onClick={openCalendlyModal}
          >
            Try Factory Demo
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
