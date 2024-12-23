import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, CheckCircle, Clock, ArrowUpRight, Timer, MoveUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Reusable Components
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

// Main Component
export default function FoodAndBeveragePage() {
  const [timeFilter, setTimeFilter] = useState('All');
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [workOrders, setWorkOrders] = useState([]);
  const [alertModalData, setAlertModalData] = useState(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Food & Beverage Dashboard</h1>
    </div>
  );
}