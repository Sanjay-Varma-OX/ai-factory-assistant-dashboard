import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Calendar, AlertTriangle, CheckCircle, Clock, Mail } from 'lucide-react';

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
        { month: 'Week 1', withAI: 120, withoutAI: 240, factories: 120 },
        { month: 'Week 2', withAI: 110, withoutAI: 235, factories: 120 },
        { month: 'Week 3', withAI: 105, withoutAI: 230, factories: 120 },
        { month: 'Week 4', withAI: 95, withoutAI: 225, factories: 120 }
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
        { month: 'Jan', withAI: 130, withoutAI: 250, factories: 120 },
        { month: 'Feb', withAI: 115, withoutAI: 240, factories: 120 },
        { month: 'Mar', withAI: 100, withoutAI: 230, factories: 120 }
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
        { month: 'Jul', withAI: 140, withoutAI: 260, factories: 120 },
        { month: 'Aug', withAI: 130, withoutAI: 250, factories: 120 },
        { month: 'Sep', withAI: 120, withoutAI: 245, factories: 120 },
        { month: 'Oct', withAI: 110, withoutAI: 235, factories: 120 },
        { month: 'Nov', withAI: 100, withoutAI: 230, factories: 120 },
        { month: 'Dec', withAI: 90, withoutAI: 220, factories: 120 }
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
        { month: 'Q1 2023', withAI: 150, withoutAI: 270, factories: 120 },
        { month: 'Q2 2023', withAI: 130, withoutAI: 250, factories: 120 },
        { month: 'Q3 2023', withAI: 110, withoutAI: 235, factories: 120 },
        { month: 'Q4 2023', withAI: 90, withoutAI: 220, factories: 120 }
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'ALERT':
        return 'bg-red-50 border-red-200';
      case 'WARNING':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-green-50 border-green-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ALERT':
        return <AlertTriangle className="text-red-500" />;
      case 'WARNING':
        return <AlertTriangle className="text-yellow-500" />;
      default:
        return <CheckCircle className="text-green-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Food & Beverage Analytics</h1>
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
        <Card className="p-4 cursor-pointer hover:shadow-lg transition-shadow" 
              onClick={() => setSelectedMetric('downtime')}>
          <CardContent>
            <h3 className="font-semibold mb-2">Total Downtime Reduction</h3>
            <div className="text-3xl font-bold">{currentData.metrics.reduction}</div>
            <div className="text-green-500">↑ 12.5% vs last period</div>
          </CardContent>
        </Card>

        <Card className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedMetric('savings')}>
          <CardContent>
            <h3 className="font-semibold mb-2">Cost Savings</h3>
            <div className="text-3xl font-bold">{currentData.metrics.savings}</div>
            <div className="text-green-500">↑ 8.4% vs target</div>
          </CardContent>
        </Card>

        <Card className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedMetric('oee')}>
          <CardContent>
            <h3 className="font-semibold mb-2">Plant OEE</h3>
            <div className="text-3xl font-bold">87.2%</div>
            <div className="text-green-500">↑ 2.1% vs target</div>
          </CardContent>
        </Card>

        <Card className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedMetric('health')}>
          <CardContent>
            <h3 className="font-semibold mb-2">Equipment Health</h3>
            <div className="text-3xl font-bold">{currentData.metrics.health}</div>
            <div className="text-green-500">112/120 Factories Optimal</div>
          </CardContent>
        </Card>
      </div>

      {/* Live PLC Monitoring */}
      <div className="grid grid-cols-1 gap-4">
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">Live PLC Monitoring & Automated Response</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sensorData.map((sensor) => (
              <Alert
                key={sensor.name}
                className={getStatusColor(sensor.status)}
              >
                <AlertTitle className="flex items-center gap-2">
                  {getStatusIcon(sensor.status)}
                  {sensor.name}
                </AlertTitle>
                <AlertDescription>
                  <div className="mt-2">
                    <div>Current Value: {sensor.currentValue} {sensor.unit}</div>
                    <div>Threshold: {sensor.threshold} {sensor.unit}</div>
                    <div className="flex items-center gap-1 text-gray-500 mt-2">
                      <Clock className="w-4 h-4" />
                      Last Updated: {sensor.timestamp}
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </Card>
      </div>

      <Dialog open={selectedMetric !== null} onOpenChange={() => setSelectedMetric(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {selectedMetric === 'downtime' && 'Downtime Analysis'}
              {selectedMetric === 'savings' && 'Cost Savings Breakdown'}
              {selectedMetric === 'oee' && 'Plant OEE Trends'}
              {selectedMetric === 'health' && 'Equipment Health Statistics'}
            </DialogTitle>
          </DialogHeader>
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
        </DialogContent>
      </Dialog>
    </div>
  );
}
