import React from 'react';
import { Card } from '@/components/ui/card';

export function HistoricalAnalysis() {
  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4">Historical Performance Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-semibold mb-2">Downtime Events</h3>
          <div className="text-2xl font-bold text-blue-600">-65%</div>
          <div className="text-sm text-gray-600">Reduction since implementation</div>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-semibold mb-2">Cost Impact</h3>
          <div className="text-2xl font-bold text-green-600">$3.1M</div>
          <div className="text-sm text-gray-600">Total savings to date</div>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-semibold mb-2">AI Prevention Rate</h3>
          <div className="text-2xl font-bold text-purple-600">92%</div>
          <div className="text-sm text-gray-600">Of potential failures prevented</div>
        </div>
      </div>
    </Card>
  );
}