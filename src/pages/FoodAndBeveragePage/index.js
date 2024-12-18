import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowTrendingUp } from 'lucide-react';
import { MetricCards } from './components/MetricCards';
import { PLCMonitoring } from './components/PLCMonitoring';
import { WorkOrders } from './components/WorkOrders';
import { ExceptionAlerts } from './components/ExceptionAlerts';
import { DowntimeAnalysis } from './components/DowntimeAnalysis';
import { HistoricalAnalysis } from './components/HistoricalAnalysis';
import { MetricModal } from './components/MetricModal';
import { TimeFilter } from './components/TimeFilter';
import { timeFilterData } from './data';

export default function FoodAndBeveragePage() {
  const [timeFilter, setTimeFilter] = useState('1M');
  const [selectedMetric, setSelectedMetric] = useState(null);
  const currentData = timeFilterData[timeFilter];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link to="/industries" className="text-blue-600 mb-4 flex items-center gap-2">
            <ArrowTrendingUp className="w-4 h-4" />
            Back to Industries
          </Link>
          <h1 className="text-3xl font-bold">Food & Beverage Analytics</h1>
          <p className="text-gray-600">AI-Powered Insights for Your F&B Business</p>
        </div>
        <TimeFilter currentFilter={timeFilter} onFilterChange={setTimeFilter} />
      </div>

      <MetricCards currentData={currentData} onMetricClick={setSelectedMetric} />
      <PLCMonitoring />
      <WorkOrders />
      <ExceptionAlerts />
      <DowntimeAnalysis currentData={currentData} />
      <HistoricalAnalysis />

      <MetricModal 
        selectedMetric={selectedMetric} 
        onClose={() => setSelectedMetric(null)} 
        currentData={currentData}
      />
    </div>
  );
}