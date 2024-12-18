import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export function MetricCards({ currentData, onMetricClick }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4 cursor-pointer hover:shadow-lg transition-shadow" 
            onClick={() => onMetricClick('downtime')}>
        <CardContent>
          <h3 className="font-semibold mb-2">Total Downtime Reduction</h3>
          <div className="text-3xl font-bold">{currentData.metrics.reduction}</div>
          <div className="text-green-500">↑ 12.5% vs last period</div>
        </CardContent>
      </Card>

      <Card className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onMetricClick('savings')}>
        <CardContent>
          <h3 className="font-semibold mb-2">Cost Savings</h3>
          <div className="text-3xl font-bold">{currentData.metrics.savings}</div>
          <div className="text-green-500">↑ 8.4% vs target</div>
        </CardContent>
      </Card>

      <Card className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onMetricClick('oee')}>
        <CardContent>
          <h3 className="font-semibold mb-2">Plant OEE</h3>
          <div className="text-3xl font-bold">{currentData.metrics.oee}</div>
          <div className="text-green-500">↑ 2.1% vs target</div>
        </CardContent>
      </Card>

      <Card className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onMetricClick('health')}>
        <CardContent>
          <h3 className="font-semibold mb-2">Equipment Health</h3>
          <div className="text-3xl font-bold">{currentData.metrics.health}</div>
          <div className="text-green-500">112/120 Factories Optimal</div>
        </CardContent>
      </Card>
    </div>
  );
}