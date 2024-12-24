import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, CheckCircle, Clock, ArrowUpRight, Timer, MoveUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Keep all existing components (MetricCard, Alert, WorkOrderCard, ExceptionAlert)
// ...

// Keep timeFilterData configuration
// ...

export default function FoodAndBeveragePage() {
  // Keep existing state and data definitions
  // ...

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Keep existing header, time filter, and metrics grid */}
      {/* ... */}

      {/* Live PLC Monitoring */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Live PLC Monitoring & Automated Response</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {sensorData.map((sensor) => (
            <Alert
              key={sensor.name}
              status={sensor.status}
              title={sensor.name}
            >
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                  <span>Current Value:</span>
                  <span className="font-bold">
                    {sensor.currentValue} {sensor.unit}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span>Threshold:</span>
                  <span>
                    {sensor.threshold} {sensor.unit}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Last Updated:</span>
                  <span>{sensor.timestamp}</span>
                </div>
              </div>
            </Alert>
          ))}
        </div>
      </div>

      {/* Work Order Analysis & Exceptions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Work Order Analysis & Exceptions</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WorkOrderCard
            current={workOrderData.current}
            workOrders={workOrderData.historical}
          />
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-2">Exception Alerts</h3>
            {exceptionAlerts.map((alert, index) => (
              <ExceptionAlert
                key={index}
                type={alert.type}
                data={alert.data}
                action={alert.action}
                onActionClick={(type, data) => setAlertModalData({ type, data })}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Downtime Comparison Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Downtime Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeFilterData[timeFilter].downtimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="withAI" stroke="#3B82F6" name="With AI" />
              <Line type="monotone" dataKey="withoutAI" stroke="#EF4444" name="Without AI" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Cost Savings Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Cost Savings</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeFilterData[timeFilter].savingsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="actual" stroke="#10B981" name="Actual" />
              <Line type="monotone" dataKey="projected" stroke="#6B7280" name="Projected" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}