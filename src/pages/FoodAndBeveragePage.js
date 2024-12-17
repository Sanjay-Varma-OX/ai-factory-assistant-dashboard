import React, { useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Dummy data for graphs
const salesData = [
  { month: 'Jan', actual: 4000, predicted: 4400 },
  { month: 'Feb', actual: 4500, predicted: 4800 },
  { month: 'Mar', actual: 5100, predicted: 5300 },
  { month: 'Apr', actual: 4800, predicted: 5100 },
  { month: 'May', actual: 5300, predicted: 5600 },
  { month: 'Jun', actual: 5800, predicted: 6200 },
];

const categoryData = [
  { name: 'Beverages', value: 35 },
  { name: 'Main Course', value: 30 },
  { name: 'Appetizers', value: 20 },
  { name: 'Desserts', value: 15 },
];

const inventoryData = [
  { item: 'Wine', current: 85, reorder: 50 },
  { item: 'Beer', current: 60, reorder: 40 },
  { item: 'Spirits', current: 45, reorder: 30 },
  { item: 'Soft Drinks', current: 75, reorder: 45 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const MetricCard = ({ title, value, trend, icon: Icon, onClick }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={onClick}>
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

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const ChartCard = ({ title, children, onClick }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={onClick}>
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

const FoodAndBeveragePage = () => {
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [modalContent, setModalContent] = useState(null);

  const handleMetricClick = (metric) => {
    setSelectedMetric(metric);
    setModalContent(
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="actual" stroke="#8884d8" name="Actual" />
            <Line type="monotone" dataKey="predicted" stroke="#82ca9d" name="Predicted" strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

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
            icon={({ size, className }) => <span className={className}>$</span>}
            onClick={() => handleMetricClick('sales')}
          />
          <MetricCard
            title="Profit Margin"
            value="32.8%"
            trend="+2.4% vs target"
            icon={({ size, className }) => <span className={className}>↗</span>}
            onClick={() => handleMetricClick('profit')}
          />
          <MetricCard
            title="Customer Satisfaction"
            value="4.8/5.0"
            trend="+0.3 this month"
            icon={({ size, className }) => <span className={className}>👥</span>}
            onClick={() => handleMetricClick('satisfaction')}
          />
          <MetricCard
            title="Food Cost %"
            value="28.5%"
            trend="-1.2% vs last month"
            icon={({ size, className }) => <span className={className}>📦</span>}
            onClick={() => handleMetricClick('cost')}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard 
            title="Sales & Demand Forecast"
            onClick={() => {
              setModalContent(
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="actual" stroke="#8884d8" name="Actual" />
                      <Line type="monotone" dataKey="predicted" stroke="#82ca9d" name="Predicted" strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              );
              setSelectedMetric('forecast');
            }}
          >
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="actual" stroke="#8884d8" name="Actual" />
                  <Line type="monotone" dataKey="predicted" stroke="#82ca9d" name="Predicted" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
          
          <ChartCard 
            title="Product Mix Analysis"
            onClick={() => {
              setModalContent(
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              );
              setSelectedMetric('mix');
            }}
          >
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Inventory & Operations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard 
            title="Inventory Levels"
            onClick={() => {
              setModalContent(
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={inventoryData}>
                      <XAxis dataKey="item" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="current" fill="#8884d8" name="Current Stock" />
                      <Bar dataKey="reorder" fill="#82ca9d" name="Reorder Point" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              );
              setSelectedMetric('inventory');
            }}
          >
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={inventoryData}>
                  <XAxis dataKey="item" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="current" fill="#8884d8" name="Current Stock" />
                  <Bar dataKey="reorder" fill="#82ca9d" name="Reorder Point" />
                </BarChart>
              </ResponsiveContainer>
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
      </div>

      <Modal 
        isOpen={selectedMetric !== null}
        onClose={() => {
          setSelectedMetric(null);
          setModalContent(null);
        }}
        title={selectedMetric ? `Detailed ${selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} Analysis` : ''}
      >
        {modalContent}
      </Modal>
    </div>
  );
};

export default FoodAndBeveragePage;