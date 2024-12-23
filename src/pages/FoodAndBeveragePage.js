import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, CheckCircle, Clock, ArrowUpRight, AlertCircle, Timer, MoveUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// ... (previous component definitions remain the same) ...

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

const ExceptionAlert = ({ type, data, action }) => {
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
          icon: <AlertCircle className="text-gray-500" />,
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
      >
        {action}
      </button>
    </div>
  );
};

export default function FoodAndBeveragePage() {
  // ... (previous state and data definitions remain the same) ...

  // Sample work order data
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

  // Sample exception alerts data
  const exceptionAlerts = [
    {
      type: 'warranty',
      data: {
        'WO#': '2024-1201-0156',
        'Part': 'Control Module CM-456',
        'Warranty Valid Until': 'March 2025',
        'Potential Savings': '$2,450'
      },
      action: 'Initiate Claim'
    },
    {
      type: 'maintenance',
      data: {
        'WO#': '2024-1208-0198',
        'Equipment': 'Conveyor Belt B4',
        'Last Service': '15 days ago',
        'Expected Interval': '90 days'
      },
      action: 'Review Maintenance Schedule'
    },
    {
      type: 'pattern',
      data: {
        'Equipment': 'Packaging Unit 3',
        'Pattern': '3 similar failures in 30 days',
        'Recommendation': 'Root cause analysis needed'
      },
      action: 'View Analysis'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* ... (previous JSX remains the same until PLC Monitoring section) ... */}
      
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

        {/* New Work Order Analysis Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Work Order Analysis & Exceptions</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WorkOrderCard 
              current={workOrderData.current}
              workOrders={workOrderData.historical}
            />
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Exception Alerts</h3>
              {exceptionAlerts.map((alert, index) => (
                <ExceptionAlert
                  key={index}
                  type={alert.type}
                  data={alert.data}
                  action={alert.action}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ... (Modal component remains the same) ... */}
    </div>
  );
}