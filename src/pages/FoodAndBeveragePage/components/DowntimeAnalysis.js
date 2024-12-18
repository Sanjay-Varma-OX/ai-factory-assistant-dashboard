import React from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function DowntimeAnalysis({ currentData }) {
  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4">Downtime Reduction Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* MTTR Improvement */}
        <div className="space-y-4">
          <h3 className="font-semibold">MTTR Improvement</h3>
          <div className="p-4 bg-green-50 rounded">
            <div className="text-xl font-bold text-green-700">50% Reduction in MTTR</div>
            <div className="text-sm text-green-600">Through predictive maintenance and faster response times</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded">
              <div className="text-sm text-gray-600">Before AI</div>
              <div className="text-lg font-bold">240 minutes</div>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <div className="text-sm text-gray-600">After AI</div>
              <div className="text-lg font-bold text-green-600">120 minutes</div>
            </div>
          </div>
        </div>

        {/* PM Schedule Optimization */}
        <div className="space-y-4">
          <h3 className="font-semibold">PM Schedule Optimization</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>Schedule Conflicts</span>
              <span className="text-red-500">-75%</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>PM Completion Rate</span>
              <span className="text-green-500">+35%</span>
            </div>
            <div className="p-4 bg-blue-50 rounded">
              <h4 className="font-semibold">Streamlined Planning</h4>
              <p>AI-optimized scheduling across 120 factories</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="h-64">
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
      </div>
    </Card>
  );
}