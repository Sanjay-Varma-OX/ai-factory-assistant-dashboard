import React from 'react';
import { Brain, Factory, BadgeDollarSign, LineChart, Clock, Shield } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">AI-Powered Maintenance Solutions</h1>
          <p className="text-xl mb-12 max-w-3xl mx-auto">Revolutionizing maintenance operations through intelligent AI systems that predict, prevent, and optimize across industries</p>
          <div className="flex justify-center gap-6">
            <a href="#industries" className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">Explore Industries</a>
            <a href="/factory" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-500 transition-colors">Try Demo</a>
          </div>
        </div>
      </header>

      {/* Key Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose OxMaint AI</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                icon: <Brain className="w-12 h-12 text-blue-600" />,
                title: 'Predictive Intelligence',
                description: 'Advanced AI algorithms predict maintenance needs before failures occur, reducing downtime by up to 50%'
              },
              {
                icon: <BadgeDollarSign className="w-12 h-12 text-green-600" />,
                title: 'Cost Reduction',
                description: 'Optimize maintenance schedules and resources, leading to 30-40% reduction in maintenance costs'
              },
              {
                icon: <LineChart className="w-12 h-12 text-purple-600" />,
                title: 'Performance Analytics',
                description: 'Real-time monitoring and analytics provide actionable insights for continuous improvement'
              },
              {
                icon: <Clock className="w-12 h-12 text-orange-600" />,
                title: 'Time Efficiency',
                description: 'Automated scheduling and resource allocation improve maintenance efficiency by 45%'
              },
              {
                icon: <Shield className="w-12 h-12 text-red-600" />,
                title: 'Risk Mitigation',
                description: 'Proactive maintenance strategies reduce safety risks and compliance issues'
              },
              {
                icon: <Factory className="w-12 h-12 text-indigo-600" />,
                title: 'Industry Adaptability',
                description: 'Flexible solutions that adapt to various industrial environments and requirements'
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Industries We Serve</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Manufacturing',
                link: '/factory',
                description: 'Optimize factory operations with predictive maintenance and real-time monitoring',
                available: true
              },
              {
                title: 'Energy & Utilities',
                link: '#',
                description: 'Maintain critical infrastructure and optimize resource distribution',
                available: false
              },
              {
                title: 'Healthcare',
                link: '#',
                description: 'Ensure medical equipment reliability and regulatory compliance',
                available: false
              },
              {
                title: 'Transportation',
                link: '#',
                description: 'Keep fleets running efficiently with predictive maintenance',
                available: false
              },
              {
                title: 'Construction',
                link: '#',
                description: 'Monitor equipment health and optimize maintenance schedules',
                available: false
              },
              {
                title: 'Agriculture',
                link: '#',
                description: 'Maintain farming equipment and optimize operational efficiency',
                available: false
              }
            ].map((industry, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg relative overflow-hidden group">
                <h3 className="text-xl font-semibold mb-3">{industry.title}</h3>
                <p className="text-gray-600 mb-4">{industry.description}</p>
                {industry.available ? (
                  <a href={industry.link} className="text-blue-600 font-semibold group-hover:text-blue-800">Try Demo →</a>
                ) : (
                  <span className="text-gray-400">Coming Soon</span>
                )}
                {industry.available && (
                  <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Available</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Our AI Technology</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <div className="bg-blue-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Machine Learning Core</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600">•</span>
                    <span>Advanced anomaly detection algorithms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600">•</span>
                    <span>Predictive maintenance models with 94% accuracy</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600">•</span>
                    <span>Real-time pattern recognition and analysis</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Data Processing</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600">•</span>
                    <span>Processing over 1 million data points per minute</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600">•</span>
                    <span>Real-time sensor data integration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600">•</span>
                    <span>Advanced signal processing algorithms</span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Integration & Security</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-600">•</span>
                    <span>Seamless integration with existing systems</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-600">•</span>
                    <span>Enterprise-grade security protocols</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-600">•</span>
                    <span>99.9% system reliability</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Transform Your Maintenance Operations?</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">Experience the power of AI-driven maintenance with our factory demo</p>
          <a href="/factory" className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block">Try Factory Demo</a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;