import React from 'react';
import { ArrowUpRight, TrendingUp, Package, Users, DollarSign, LineChart, BarChart2, PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const MetricCard = ({ title, value, trend, icon: Icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
      <Icon className="text-blue-600" size={24} />
    </div>
    <div className="flex items-center text-sm">
      <ArrowUpRight className="text-green-500 mr-1" size={16} />
      <span className="text-green-500 font-medium">{trend}</span>
    </div>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

const FoodAndBeveragePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="text-blue-600 mb-4 inline-block">&larr; Back to Industries</Link>
          <h1 className="text-4xl font-bold mb-4">Food & Beverage Analytics</h1>
          <p className="text-xl text-gray-600">AI-Powered Insights for Your F&B Business</p>
        </div>

        {/* Top Level KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Daily Sales"
            value="$24,589"
            trend="+12.5% vs last week"
            icon={DollarSign}
          />
          <MetricCard
            title="Profit Margin"
            value="32.8%"
            trend="+2.4% vs target"
            icon={TrendingUp}
          />
          <MetricCard
            title="Customer Satisfaction"
            value="4.8/5.0"
            trend="+0.3 this month"
            icon={Users}
          />
          <MetricCard
            title="Food Cost %"
            value="28.5%"
            trend="-1.2% vs last month"
            icon={Package}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard title="Sales & Demand Forecast">
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
              <LineChart className="text-blue-600" size={48} />
              <p className="ml-4 text-gray-500">Historical & Predicted Sales Trends</p>
            </div>
          </ChartCard>
          
          <ChartCard title="Product Mix Analysis">
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
              <PieChart className="text-blue-600" size={48} />
              <p className="ml-4 text-gray-500">Category Performance Breakdown</p>
            </div>
          </ChartCard>
        </div>

        {/* Inventory & Operations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard title="Inventory Levels">
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
              <BarChart2 className="text-blue-600" size={48} />
              <p className="ml-4 text-gray-500">Stock Levels & Reorder Points</p>
            </div>
          </ChartCard>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <p className="text-gray-600">Consider increasing inventory of high-margin beverages based on forecasted demand spike next week.</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <p className="text-gray-600">Schedule additional staff for predicted busy period this weekend.</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-semibold">3</span>
                </div>
                <p className="text-gray-600">Review pricing strategy for menu items in the "puzzle" category to optimize profitability.</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Key Metrics Explanation */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <h3 className="text-2xl font-bold mb-6">Key Performance Indicators</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-2">Sales Analytics</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Daily/Weekly/Monthly Revenue Tracking</li>
                <li>Sales Forecasting</li>
                <li>Peak Hours Analysis</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Inventory Management</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Stock Level Monitoring</li>
                <li>Waste Reduction Tracking</li>
                <li>Automated Reordering</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Customer Insights</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Satisfaction Scores</li>
                <li>Feedback Analysis</li>
                <li>Loyalty Program Metrics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodAndBeveragePage;