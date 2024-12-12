import React, { useState } from 'react';
import { AlertCircle, Bell, Calendar, Play, Power, Search, Settings } from 'lucide-react';

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [activeAlerts] = useState([
    { id: 1, type: 'critical', message: 'Bearing temperature exceeding threshold' },
    { id: 2, type: 'warning', message: 'Maintenance schedule adjustment recommended' }
  ]);

  const metrics = {
    downtimeReduction: 78.5,
    preventedFailures: 12,
    costSavings: 125000
  };

  const [integrationStatus] = useState({
    nonOemDetection: 'active',
    maintenanceAlerts: 'active',
    anomalyDetection: 'warning',
    maintenanceIntervals: 'active'
  });

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: 'user', timestamp: new Date() }]);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: "I've analyzed the situation. Based on the current readings, I recommend scheduling preventive maintenance within the next 48 hours.",
          sender: 'ai',
          timestamp: new Date()
        }]);
      }, 1000);
      setInputMessage('');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">AI Factory Assistant</h1>
          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
            <Settings className="w-6 h-6 text-gray-600 cursor-pointer" />
          </div>
        </div>
      </header>

      <main className="flex-1 p-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow col-span-1">
            <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Downtime Reduction</p>
                <p className="text-2xl font-bold text-blue-600">{metrics.downtimeReduction}%</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Prevented Failures</p>
                <p className="text-2xl font-bold text-green-600">{metrics.preventedFailures}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">Cost Savings</p>
                <p className="text-2xl font-bold text-purple-600">${metrics.costSavings.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow col-span-1 lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">AI Assistant Chat</h2>
            <div className="h-96 flex flex-col">
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 rounded-lg max-w-[80%] ${
                      message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                    }`}>
                      <p>{message.text}</p>
                      <p className="text-xs mt-1 opacity-75">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={sendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 p-2 border rounded"
                  placeholder="Type your message..."
                />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Send
                </button>
              </form>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-blue-50 rounded-lg flex flex-col items-center hover:bg-blue-100">
                <Play className="w-6 h-6 text-blue-600 mb-2" />
                <span className="text-sm">Start Scan</span>
              </button>
              <button className="p-4 bg-green-50 rounded-lg flex flex-col items-center hover:bg-green-100">
                <Calendar className="w-6 h-6 text-green-600 mb-2" />
                <span className="text-sm">Schedule</span>
              </button>
              <button className="p-4 bg-yellow-50 rounded-lg flex flex-col items-center hover:bg-yellow-100">
                <Search className="w-6 h-6 text-yellow-600 mb-2" />
                <span className="text-sm">Analytics</span>
              </button>
              <button className="p-4 bg-red-50 rounded-lg flex flex-col items-center hover:bg-red-100">
                <Power className="w-6 h-6 text-red-600 mb-2" />
                <span className="text-sm">Emergency</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Active Alerts</h2>
            <div className="space-y-4">
              {activeAlerts.map(alert => (
                <div key={alert.id} className={`p-4 rounded-lg flex items-start gap-3 ${
                  alert.type === 'critical' ? 'bg-red-50' : 'bg-yellow-50'
                }`}>
                  <AlertCircle className={`w-6 h-6 ${
                    alert.type === 'critical' ? 'text-red-600' : 'text-yellow-600'
                  }`} />
                  <p className="text-sm">{alert.message}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Integration Status</h2>
            <div className="space-y-4">
              {Object.entries(integrationStatus).map(([key, status]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    status === 'active' ? 'bg-green-100 text-green-800' :
                    status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}