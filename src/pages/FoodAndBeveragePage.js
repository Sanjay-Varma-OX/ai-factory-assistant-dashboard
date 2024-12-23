import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, CheckCircle, Clock, ArrowUpRight, Timer, MoveUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Reusable Components [Previous components remain the same]
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

const WorkOrderCard = ({ current, workOrders }) => {
  return (
    <div className="bg-white p-6 rounded-lg border">
      <h3 className="text-lg font-semibold mb-4">Similar Historical Repairs</h3>
      <div className="border-l-4 border-blue-500 pl-4 mb-4">
        <div className="font-medium">Current WO#: {current.id}</div>
        <div className="text-gray-600">{current.description}</div>
      </div>
      
      <div className="space-y-6">
        {workOrders.map((wo) => (
          <div key={wo.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="font-medium">WO#: {wo.id}</div>
              <div className={`text-sm px-3 py-1 rounded-full ${
                wo.status === 'Successful Fix' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {wo.status}
              </div>
            </div>
            <div className="text-gray-500">{wo.daysAgo} days ago</div>
            <div><span className="font-medium">Resolution:</span> {wo.resolution}</div>
            <div><span className="font-medium">Time Taken:</span> {wo.timeTaken} hours</div>
            {wo.partsUsed && (
              <div><span className="font-medium">Parts Used:</span> {wo.partsUsed}</div>
            )}
            {wo.notes && (
              <div><span className="font-medium">Notes:</span> {wo.notes}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ExceptionAlert = ({ type, data, action, onActionClick }) => {
  const getTypeStyles = () => {
    switch(type) {
      case 'warranty':
        return {
          icon: <AlertTriangle className="text-red-500" />,
          bg: 'bg-red-50',
          border: 'border-red-200',
          button: 'bg-red-100 text-red-700 hover:bg-red-200'
        };
      case 'maintenance':
        return {
          icon: <Timer className="text-yellow-500" />,
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          button: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
        };
      case 'pattern':
        return {
          icon: <MoveUpRight className="text-blue-500" />,
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          button: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
        };
      default:
        return {
          icon: null,
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          button: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className={`${styles.bg} ${styles.border} border rounded-lg p-4`}>
      <div className="flex items-center gap-2 mb-2">
        {styles.icon}
        <span className="font-semibold">
          {type === 'warranty' && 'Warranty Not Claimed'}
          {type === 'maintenance' && 'Premature Maintenance Alert'}
          {type === 'pattern' && 'Unusual Pattern Detected'}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex justify-between">
            <span className="text-gray-600">{key}:</span>
            <span className="font-medium">{value}</span>
          </div>
        ))}
      </div>

      <button
        className={`${styles.button} w-full rounded-md py-2 text-center transition-colors`}
        onClick={() => onActionClick(type, data)}
      >
        {action}
      </button>
    </div>
  );
};

// Time filter data configuration
const timeFilterData = {
  'All': {
    downtimeData: [
      { month: 'Jan', withAI: 130, withoutAI: 250 },
      { month: 'Feb', withAI: 115, withoutAI: 240 },
      { month: 'Mar', withAI: 100, withoutAI: 230 },
      { month: 'Apr', withAI: 95, withoutAI: 225 },
      { month: 'May', withAI: 90, withoutAI: 220 },
      { month: 'Jun', withAI: 85, withoutAI: 215 }
    ],
    savingsData: [
      { month: 'Jan', actual: 280000, projected: 220000 },
      { month: 'Feb', actual: 310000, projected: 240000 },
      { month: 'Mar', actual: 335000, projected: 260000 },
      { month: 'Apr', actual: 350000, projected: 280000 },
      { month: 'May', actual: 375000, projected: 300000 },
      { month: 'Jun', actual: 390000, projected: 320000 }
    ],
    metrics: {
      reduction: '60%',
      savings: '$1,892,000',
      points: '120',
      health: '95%'
    }
  },
  '1M': {
    downtimeData: [
      { month: 'Week 1', withAI: 120, withoutAI: 240 },
      { month: 'Week 2', withAI: 110, withoutAI: 235 },
      { month: 'Week 3', withAI: 105, withoutAI: 230 },
      { month: 'Week 4', withAI: 95, withoutAI: 225 }
    ],
    savingsData: [
      { month: 'Week 1', actual: 85000, projected: 65000 },
      { month: 'Week 2', actual: 92000, projected: 70000 },
      { month: 'Week 3', actual: 88000, projected: 75000 },
      { month: 'Week 4', actual: 95000, projected: 80000 }
    ],
    metrics: {
      reduction: '50%',
      savings: '$324,500',
      points: '120',
      health: '94%'
    }
  }
};

// Main Component
export default function FoodAndBeveragePage() {
  const [timeFilter, setTimeFilter] = useState('All');
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [workOrders, setWorkOrders] = useState([]);
  const [alertModalData, setAlertModalData] = useState(null);

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

  useEffect(() => {
    // Monitor sensor data for threshold violations
    const checkThresholds = () => {
      sensorData.forEach(sensor => {
        if (sensor.currentValue > sensor.threshold) {
          const newWorkOrder = {
            id: `2024-${Math.floor(Math.random() * 10000)}`,
            description: `${sensor.name} exceeded threshold: ${sensor.currentValue} ${sensor.unit}`,
            timestamp: new Date().toLocaleString(),
            status: 'Open'
          };
          setWorkOrders(prev => [...prev, newWorkOrder]);
        }
      });
    };

    checkThresholds();
  }, [sensorData]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Food & Beverage Analytics Dashboard</h1>
        <div className="flex gap-4">
          {['All', '1M'].map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded ${
                timeFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => setTimeFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Object.entries(timeFilterData[timeFilter].metrics).map(([key, value]) => (
          <MetricCard
            key={key}
            title={key.charAt(0).toUpperCase() + key.slice(1)}
            value={value}
            trend="+8% from last month"
          />
        ))}
      </div>
    </div>
  );
}