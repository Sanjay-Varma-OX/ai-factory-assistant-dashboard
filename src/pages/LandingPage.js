import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faChartLine, faTools } from '@fortawesome/free-solid-svg-icons';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="bg-blue-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">AI-Powered Factory Maintenance</h1>
          <p className="text-xl mb-8">Real-time monitoring, predictive maintenance, and intelligent optimization for your factory floor</p>
        </div>
      </header>

      {/* Dashboard Section */}
      <section id="dashboard" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Real-time Factory Performance</h2>
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

      {/* Capabilities Section */}
      <section id="capabilities" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">AI Agent Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <FontAwesomeIcon icon={faRobot} className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Real-time Monitoring</h3>
              <p className="text-gray-600">Connected to PLCs and sensors for continuous monitoring of equipment performance and production metrics.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <FontAwesomeIcon icon={faChartLine} className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Predictive Analytics</h3>
              <p className="text-gray-600">Advanced algorithms predict potential failures and maintenance needs before they impact production.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <FontAwesomeIcon icon={faTools} className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Automated Maintenance</h3>
              <p className="text-gray-600">Intelligent scheduling and execution of maintenance tasks to optimize equipment reliability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Actions Section */}
      <section id="actions" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Recent AI Agent Actions</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4">2024-12-11 10:45 AM</td>
                  <td className="px-6 py-4">Predictive Maintenance Alert</td>
                  <td className="px-6 py-4">Assembly Line 2</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded">Completed</span></td>
                </tr>
                <tr>
                  <td className="px-6 py-4">2024-12-11 10:30 AM</td>
                  <td className="px-6 py-4">Temperature Threshold Adjustment</td>
                  <td className="px-6 py-4">Forming Machine 5</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded">Completed</span></td>
                </tr>
                <tr>
                  <td className="px-6 py-4">2024-12-11 10:15 AM</td>
                  <td className="px-6 py-4">Performance Optimization</td>
                  <td className="px-6 py-4">Packaging Unit</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">In Progress</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section id="metrics" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Area Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Assembly</span>
                    <span>92%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div className="h-2 bg-blue-600 rounded" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Packaging</span>
                    <span>88%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div className="h-2 bg-blue-600 rounded" style={{ width: '88%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Quality Control</span>
                    <span>95%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div className="h-2 bg-blue-600 rounded" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Monthly Downtime Analysis</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Planned Maintenance</span>
                  <span className="font-semibold">24h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Unplanned Stops</span>
                  <span className="font-semibold">6h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Setup & Adjustments</span>
                  <span className="font-semibold">12h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;