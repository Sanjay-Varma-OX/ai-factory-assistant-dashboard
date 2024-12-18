import React from 'react';
import { Card } from '@/components/ui/card';

export function ExceptionAlerts() {
  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4">Exception Alerts Configuration</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <h3 className="font-semibold">Alert Thresholds</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>Critical Alerts</span>
              <span className="text-red-500">±20% deviation</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>Warning Alerts</span>
              <span className="text-yellow-500">±10% deviation</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>Notification Frequency</span>
              <span>Real-time</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold">Notification Settings</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>Email Alerts</span>
              <span className="text-green-500">Enabled</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>SMS Alerts</span>
              <span className="text-green-500">Enabled</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>Dashboard Alerts</span>
              <span className="text-green-500">Enabled</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}