import React from 'react';
import { Card } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

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

export function PLCMonitoring() {
  return (
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
  );
}