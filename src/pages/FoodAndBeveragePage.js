import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { AlertTriangle, CheckCircle, Clock, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MetricCard = ({ title, value, trend, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
    <h3 className="font-semibold mb-2">{title}</h3>
    <div className="text-3xl font-bold">{value}</div>
    <div className="flex items-center text-green-500">
      <ArrowUpRight className="w-4 h-4 mr-1" />
      {trend}
    </div>
    {children}
  </div>
);

const Alert = ({ status, title, children }) => {
  const bgColor = {
    ALERT: 'bg-red-50 border-red-200',
    WARNING: 'bg-yellow-50 border-yellow-200',
    NORMAL: 'bg-green-50 border-green-200'
  }[status];

  const StatusIcon = {
    ALERT: () => <AlertTriangle className="text-red-500" />,
    WARNING: () => <AlertTriangle className="text-yellow-500" />,
    NORMAL: () => <CheckCircle className="text-green-500" />
  }[status];

  return (
    <div className={`${bgColor} p-4 rounded-lg border`}>
      <div className="flex items-center gap-2 font-semibold mb-2">
        {StatusIcon && <StatusIcon />}
        {title}
      </div>
      {children}
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default function FoodAndBeveragePage() {
  const [timeFilter, setTimeFilter] = useState('1M');
  const [selectedMetric, setSelectedMetric] = useState(null);

  // Sample sensor data with timestamps
  const sensorData = [
    {
      name: 'Motor Vibration - Line 2',
      currentValue: 12.8,
      threshold: 10.0,
      unit: 'mm/s',
      status: 'ALERT',
      timestamp: '2024-12-17 11:23:45'
    },
    {
      name: 'Bearing Temperature',
      currentValue: 82,
      threshold: 85,
      unit: '°C',
      status: 'WARNING',
      timestamp: '2024-12-17 11:23:45'
    },
    {
      name: 'Pressure Sensor',
      currentValue: 2.4,
      threshold: 3.0,
      unit: 'bar',
      status: 'NORMAL',
      timestamp: '2024-12-17 11:23:45'
    }
  ];

  // Time filter data
  const timeFilterData = {
    '1M': {
      downtimeData: [
        { month: 'Week 1', withAI: 120, withoutAI: 240 },
        { month: 'Week 2', withAI: 110, withoutAI: 235 },
        { month: 'Week 3', withAI: 105, withoutAI: 230 },
        { month: 'Week 4', withAI: 95, withoutAI: 225 }
      ],
      metrics: {
        reduction: '50%',
        savings: '$324,500',
        points: '120',
        health: '94%'
      }
    },
    '3M': {
      downtimeData: [
        { month: 'Jan', withAI: 130, withoutAI: 250 },
        { month: 'Feb', withAI: 115, withoutAI: 240 },
        { month: 'Mar', withAI: 100, withoutAI: 230 }
      ],
      metrics: {
        reduction: '55%',
        savings: '$892,000',
        points: '120',
        health: '92%'
      }
    },
    '6M': {
      downtimeData: [
        { month: 'Jul', withAI: 140, withoutAI: 260 },
        { month: 'Aug', withAI: 130, withoutAI: 250 },
        { month: 'Sep', withAI: 120, withoutAI: 245 },
        { month: 'Oct', withAI: 110, withoutAI: 235 },
        { month: 'Nov', withAI: 100, withoutAI: 230 },
        { month: 'Dec', withAI: 90, withoutAI: 220 }
      ],
      metrics: {
        reduction: '62%',
        savings: '$1,824,500',
        points: '120',
        health: '96%'
      }
    },
    'All': {
      downtimeData: [
        { month: 'Q1 2023', withAI: 150, withoutAI: 270 },
        { month: 'Q2 2023', withAI: 130, withoutAI: 250 },
        { month: 'Q3 2023', withAI: 110, withoutAI: 235 },
        { month: 'Q4 2023', withAI: 90, withoutAI: 220 }
      ],
      metrics: {
        reduction: '65%',
        savings: '$3,124,500',
        points: '120',
        health: '95%'
      }
    }
  };

  // Get current data based on time filter
  const currentData = timeFilterData[timeFilter];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link to="/" className="text-blue-600 mb-4 inline-block">&larr; Back to Industries</Link>
          <h1 className="text-3xl font-bold">Food & Beverage Analytics</h1>
        </div>
        <div className="flex gap-2">
          {['1M', '3M', '6M', 'All'].map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={timeFilter === filter ? "px-4 py-2 rounded bg-blue-600 text-white" : "px-4 py-2 rounded bg-gray-200"}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div onClick={() => setSelectedMetric('downtime')}>
          <MetricCard
            title="Total Downtime Reduction"
            value={currentData.metrics.reduction}
            trend="↑ 12.5% vs last period"
          />
        </div>

        <div onClick={() => setSelectedMetric('savings')}>
          <MetricCard
            title="Cost Savings"
            value={currentData.metrics.savings}
            trend="↑ 8.4% vs target"
          />
        </div>

        <div onClick={() => setSelectedMetric('oee')}>
          <MetricCard
            title="Plant OEE"
            value="87.2%"
            trend="↑ 2.1% vs target"
          />
        </div>

        <div onClick={() => setSelectedMetric('health')}>
          <MetricCard
            title="Equipment Health"
            value={currentData.metrics.health}
            trend="112/120 Factories Optimal"
          />
        </div>
      </div>

      {/* Live PLC Monitoring */}
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Live PLC Monitoring & Automated Response</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sensorData.map((sensor) => (
              <Alert
                key={sensor.name}
                status={sensor.status}
                title={sensor.name}
              >
                <div>
                  <div>Current Value: {sensor.currentValue} {sensor.unit}</div>
                  <div>Threshold: {sensor.threshold} {sensor.unit}</div>
                  <div className="flex items-center gap-1 text-gray-500 mt-2">
                    <Clock className="w-4 h-4" />
                    Last Updated: {sensor.timestamp}
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        </div>
      </div>

      <Modal 
        isOpen={selectedMetric !== null}
        onClose={() => setSelectedMetric(null)}
        title={
          selectedMetric === 'downtime' ? 'Downtime Analysis' :
          selectedMetric === 'savings' ? 'Cost Savings Breakdown' :
          selectedMetric === 'oee' ? 'Plant OEE Trends' :
          selectedMetric === 'health' ? 'Equipment Health Statistics' : ''
        }
      >
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentData.downtimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="withAI" 
                stroke="#4CAF50" 
                strokeWidth={2}
                name="With AI"
              />
              <Line 
                type="monotone" 
                dataKey="withoutAI" 
                stroke="#9e9e9e" 
                strokeDasharray="5 5"
                strokeWidth={2}
                name="Without AI"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Modal>
    </div>
  );
}
