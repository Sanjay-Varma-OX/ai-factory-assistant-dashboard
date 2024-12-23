import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, CheckCircle, Clock, ArrowUpRight, Timer, MoveUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      {/* Placeholder for rest of the component */}
      <h1>Food & Beverage Analytics Dashboard</h1>
    </div>
  );
}