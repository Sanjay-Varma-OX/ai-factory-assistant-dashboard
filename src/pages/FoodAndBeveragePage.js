import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, CheckCircle, Clock, ArrowUpRight, Timer, MoveUpRight } from 'lucide-react';
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

  // Work order data
  const workOrderData = {
    current: {
      id: '2024-1211-0023',
      description: 'Motor Assembly - Line 2 (Vibration Issue)'
    },
    historical: [
      {
        id: '2024-0915-0187',
        daysAgo: 86,
        resolution: 'Bearing replacement',
        timeTaken: 4.5,
        partsUsed: 'BK-2344, ML-892',
        status: 'Successful Fix'
      },
      {
        id: '2024-0602-0092',
        daysAgo: 191,
        resolution: 'Alignment adjustment',
        timeTaken: 2.0,
        notes: 'Required follow-up after 2 weeks',
        status: 'Temporary Fix'
      }
    ]
  };

  useEffect(() => {
    // Monitor sensor data for threshold violations
    const checkThresholds = () => {
      sensorData.forEach(sensor => {
        if (sensor.currentValue > sensor.threshold) {
          // Create work order if threshold exceeded
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
          {['All', '1M', '3M', '6M'].map((filter) => (
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
    </div>
  );
}