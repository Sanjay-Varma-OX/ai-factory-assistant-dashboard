import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, CheckCircle, Clock, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MetricCard = ({ title, value, trend, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
    <h3 className="font-semibold mb-2">{title}</h3>
    <div className="text-3xl font-bold">{value || 'N/A'}</div>
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

  const textColor = {
    ALERT: 'text-red-600',
    WARNING: 'text-yellow-600',
    NORMAL: 'text-green-600'
  }[status];

  const StatusIcon = {
    ALERT: () => <AlertTriangle className="text-red-500" />,
    WARNING: () => <AlertTriangle className="text-yellow-500" />,
    NORMAL: () => <CheckCircle className="text-green-500" />
  }[status];

  return (
    <div className={`${bgColor} p-4 rounded-lg border`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 font-semibold">
          {StatusIcon && <StatusIcon />}
          {title}
        </div>
        <span className={`${textColor} font-bold`}>{status}</span>
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

  const sensorData = [
    {
      name: 'Motor Vibration - Line 2',
      currentValue: 12.8,
      threshold: 10.0,
      unit: 'mm/s',
      status: 'ALERT',
      timestamp: new Date().toLocaleString()
    },
    {
      name: 'Bearing Temperature',
      currentValue: 82,
      threshold: 85,
      unit: '°C',
      status: 'WARNING',
      timestamp: new Date().toLocaleString()
    },
    {
      name: 'Pressure Sensor',
      currentValue: 2.4,
      threshold: 3.0,
      unit: 'bar',
      status: 'NORMAL',
      timestamp: new Date().toLocaleString()
    }
  ];

  const defaultData = {
    metrics: {
      reduction: 'N/A',
      savings: 'N/A',
      points: 'N/A',
      health: 'N/A'
    },
    downtimeData: [],
    savingsData: [],
    oeeData: [],
    healthData: []
  };

  const generateMonthlyData = (months) => {
    return Array.from({ length: months }, (_, index) => ({
      month: `Month ${index + 1}`,
      withAI: 100 - index * 5,
      withoutAI: 200 - index * 3,
      actual: 300000 + index * 20000,
      projected: 250000 + index * 15000,
      oee: 85 + index,
      target: 85,
      optimal: 110 + index,
      total: 120
    }));
  };

  const timeFilterData = {
    '1M': {
      downtimeData: generateMonthlyData(4).map(d => ({ ...d, month: `Week ${d.month.split(' ')[1]}` })),
      savingsData: generateMonthlyData(4).map(d => ({ ...d, month: `Week ${d.month.split(' ')[1]}` })),
      oeeData: generateMonthlyData(4).map(d => ({ ...d, month: `Week ${d.month.split(' ')[1]}` })),
      healthData: generateMonthlyData(4).map(d => ({ ...d, month: `Week ${d.month.split(' ')[1]}` })),
      metrics: {
        reduction: '50%',
        savings: '$324,500',
        points: '120',
        health: '94%'
      }
    },
    '3M': {
      downtimeData: generateMonthlyData(3),
      savingsData: generateMonthlyData(3),
      oeeData: generateMonthlyData(3),
      healthData: generateMonthlyData(3),
      metrics: {
        reduction: '55%',
        savings: '$892,000',
        points: '120',
        health: '92%'
      }
    },
    '6M': {
      downtimeData: generateMonthlyData(6),
      savingsData: generateMonthlyData(6),
      oeeData: generateMonthlyData(6),
      healthData: generateMonthlyData(6),
      metrics: {
        reduction: '60%',
        savings: '$1,892,000',
        points: '120',
        health: '95%'
      }
    },
    'All': {
      downtimeData: generateMonthlyData(12).map(d => ({
        ...d,
        month: `Q${Math.floor((parseInt(d.month.split(' ')[1]) - 1) / 3) + 1}`
      })),
      savingsData: generateMonthlyData(12).map(d => ({
        ...d,
        month: `Q${Math.floor((parseInt(d.month.split(' ')[1]) - 1) / 3) + 1}`
      })),
      oeeData: generateMonthlyData(12).map(d => ({
        ...d,
        month: `Q${Math.floor((parseInt(d.month.split(' ')[1]) - 1) / 3) + 1}`
      })),
      healthData: generateMonthlyData(12).map(d => ({
        ...d,
        month: `Q${Math.floor((parseInt(d.month.split(' ')[1]) - 1) / 3) + 1}`
      })),
      metrics: {
        reduction: '65%',
        savings: '$4,892,000',
        points: '120',
        health: '97%'
      }
    }
  };

  const currentData = timeFilterData[timeFilter] || defaultData;

  const getMetricData = () => {
    switch (selectedMetric) {
      case 'downtime':
        return currentData.downtimeData;
      case 'savings':
        return currentData.savingsData;
      case 'oee':
        return currentData.oeeData;
      case 'health':
        return currentData.healthData;
      default:
        return [];
    }
  };

  const getLineConfig = () => {
    switch (selectedMetric) {
      case 'downtime':
        return [
          { key: 'withAI', name: 'With AI', color: '#4CAF50' },
          { key: 'withoutAI', name: 'Without AI', color: '#9e9e9e', dash: '5 5' }
        ];
      case 'savings':
        return [
          { key: 'actual', name: 'Actual Savings', color: '#2196F3' },
          { key: 'projected', name: 'Projected', color: '#9e9e9e', dash: '5 5' }
        ];
      case 'oee':
        return [
          { key: 'oee', name: 'OEE', color: '#FF9800' },
          { key: 'target', name: 'Target', color: '#9e9e9e', dash: '5 5' }
        ];
      case 'health':
        return [
          { key: 'optimal', name: 'Optimal Units', color: '#673AB7' },
          { key: 'total', name: 'Total Units', color: '#9e9e9e', dash: '5 5' }
        ];
      default:
        return [];
    }
  };

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
            <LineChart data={getMetricData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              {getLineConfig().map(line => (
                <Line
                  key={line.key}
                  type="monotone"
                  dataKey={line.key}
                  stroke={line.color}
                  strokeWidth={2}
                  name={line.name}
                  strokeDasharray={line.dash || '0'}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Modal>
    </div>
  );
}