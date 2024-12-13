import React from 'react';
import { Brain, Factory, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">AI Factory Assistant</h1>
          <p className="text-xl mb-12 max-w-3xl mx-auto">Revolutionizing factory operations through intelligent AI systems that predict, prevent, and optimize processes</p>
          <div className="flex justify-center gap-6">
            <Link to="/" className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">Back to Home</Link>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-500 transition-colors">Try Factory Demo</button>
          </div>
        </div>
      </header>

      {/* Dashboard Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Real-time Factory Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Plant OEE</h3>
                <span className="text-2xl font-bold text-green-600">87.2%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded">
                <div className="h-2 bg-green-600 rounded" style={{ width: '87.2%' }}></div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Current Downtime</h3>
                <span className="text-2xl font-bold text-yellow-600">12 min</span>
              </div>
              <p className="text-gray-600">Line 3 - Packaging Unit</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Equipment Health</h3>
                <span className="text-2xl font-bold text-blue-600">94%</span>
              </div>
              <p className="text-gray-600">28/30 Machines Optimal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Factory Assistant Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                icon: <Brain className="w-12 h-12 text-blue-600" />,
                title: 'AI Intelligence',
                description: 'Advanced algorithms predict maintenance needs before failures occur'
              },
              {
                icon: <LineChart className="w-12 h-12 text-purple-600" />,
                title: 'Performance Analytics',
                description: 'Real-time monitoring and analytics provide actionable insights'
              },
              {
                icon: <Factory className="w-12 h-12 text-indigo-600" />,
                title: 'Factory Integration',
                description: 'Seamless integration with your existing factory systems'
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

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Optimize Your Factory?</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">Experience the power of AI-driven factory management with our demo</p>
          <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">Start Demo</button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;