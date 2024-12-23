import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, CheckCircle, Clock, ArrowUpRight, Timer, MoveUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';


const MetricCard = ({ title, value, trend, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
    <h3 className="font-semibold mb-2">{title}</h3>
    <div className="text-3xl font-bold">{value}</div>
    <div className="flex items-center text-green-500">
      <ArrowUpRight className="w-4 h-4 mr-1" />
      {trend}
    </div>
    {children}
  </div>
);

const Alert = ({ status, title, children }) => {
  const bgColor = {
    ALERT: 'bg-red-50 border-red-200',
    WARNING: 'bg-yellow-50 border-yellow-200',
    NORMAL: 'bg-green-50 border-green-200'
  }[status];

  const textColor = {
    ALERT: 'text-red-600',
    WARNING: 'text-yellow-600',
    NORMAL: 'text-green-600'
  }[status];

  const StatusIcon = {
    ALERT: () => <AlertTriangle className="text-red-500" />,
    WARNING: () => <AlertTriangle className="text-yellow-500" />,
    NORMAL: () => <CheckCircle className="text-green-500" />
  }[status];

  return (
    <div className={`${bgColor} p-4 rounded-lg border`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 font-semibold">
          {StatusIcon && <StatusIcon />}
          {title}
        </div>
        <span className={`${textColor} font-bold`}>{status}</span>
      </div>
      {children}
    </div>
  );
};

const WorkOrderCard = ({ current, workOrders }) => {
  return (
    <div className="bg-white p-6 rounded-lg border">
      <h3 className="text-lg font-semibold mb-4">Similar Historical Repairs</h3>
      <div className="border-l-4 border-blue-500 pl-4 mb-4">
        <div className="font-medium">Current WO#: {current.id}</div>
        <div className="text-gray-600">{current.description}</div>
      </div>
      
      <div className="space-y-6">
        {workOrders.map((wo) => (
          <div key={wo.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="font-medium">WO#: {wo.id}</div>
              <div className={`text-sm px-3 py-1 rounded-full ${
                wo.status === 'Successful Fix' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {wo.status}
              </div>
            </div>
            <div className="text-gray-500">{wo.daysAgo} days ago</div>
            <div><span className="font-medium">Resolution:</span> {wo.resolution}</div>
            <div><span className="font-medium">Time Taken:</span> {wo.timeTaken} hours</div>
            {wo.partsUsed && (
              <div><span className="font-medium">Parts Used:</span> {wo.partsUsed}</div>
            )}
            {wo.notes && (
              <div><span className="font-medium">Notes:</span> {wo.notes}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ExceptionAlert = ({ type, data, action }) => {
  const getTypeStyles = () => {
    switch(type) {
      case 'warranty':
        return {
          icon: <AlertTriangle className="text-red-500" />,
          bg: 'bg-red-50',
          border: 'border-red-200',
          button: 'bg-red-100 text-red-700 hover:bg-red-200'
        };
      case 'maintenance':
        return {
          icon: <Timer className="text-yellow-500" />,
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          button: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
        };
      case 'pattern':
        return {
          icon: <MoveUpRight className="text-blue-500" />,
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          button: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
        };
      default:
        return {
          icon: null,
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          button: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className={`${styles.bg} ${styles.border} border rounded-lg p-4`}>
      <div className="flex items-center gap-2 mb-2">
        {styles.icon}
        <span className="font-semibold">
          {type === 'warranty' && 'Warranty Not Claimed'}
          {type === 'maintenance' && 'Premature Maintenance Alert'}
          {type === 'pattern' && 'Unusual Pattern Detected'}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex justify-between">
            <span className="text-gray-600">{key}:</span>
            <span className="font-medium">{value}</span>
          </div>
        ))}
      </div>

      <button
        className={`${styles.button} w-full rounded-md py-2 text-center transition-colors`}
        onClick={() => onActionClick(type, data)}
      >
        {action}
      </button>
    </div>
  );
};

const AlertDetailModal = ({ isOpen, onClose, type, data }) => {
  const getModalContent = () => {
    switch (type) {
      case 'warranty':
        return {
          title: 'Warranty Claim Details',
          content: (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">AI-Powered Savings Analysis</h4>
                <p>Oxmaint.ai has identified potential warranty savings of {data['Potential Savings']} by automatically tracking and managing warranty claims.</p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Historical Context</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>3 similar warranty claims processed in the last quarter</li>
                  <li>Average processing time reduced from 5 days to 2 hours</li>
                  <li>100% claim approval rate with AI-assisted documentation</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold">Oxmaint.ai Advantage</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Automated warranty period tracking</li>
                  <li>Smart documentation preparation</li>
                  <li>Predictive maintenance to prevent future issues</li>
                  <li>24/7 monitoring and instant alerts</li>
                </ul>
              </div>
            </div>
          )
        };

      case 'maintenance':
        return {
          title: 'Premature Maintenance Analysis',
          content: (
            <div className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">AI Detection Details</h4>
                <p>Oxmaint.ai has detected unusual wear patterns requiring early maintenance, potentially preventing a critical failure.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Traditional Approach</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>90-day fixed maintenance schedule</li>
                    <li>4-6 hours of downtime per inspection</li>
                    <li>Reactive to failures</li>
                  </ul>
                </div>

                <div className="border p-4 rounded-lg bg-green-50">
                  <h4 className="font-semibold mb-2">Oxmaint.ai Approach</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Dynamic maintenance scheduling</li>
                    <li>1-2 hours of planned downtime</li>
                    <li>Predictive failure prevention</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold">Historical Performance</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>47% reduction in unexpected downtime</li>
                  <li>68% decrease in maintenance costs</li>
                  <li>3x improvement in equipment lifespan</li>
                </ul>
              </div>
            </div>
          )
        };

      case 'pattern':
        return {
          title: 'Pattern Analysis Insights',
          content: (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">AI Pattern Recognition</h4>
                <p>Oxmaint.ai has identified a recurring pattern that suggests an underlying systemic issue.</p>
              </div>

              <div className="border p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Pattern Details</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>3 similar failures detected in 30 days</li>
                  <li>Average downtime: 4.5 hours per incident</li>
                  <li>Estimated production loss: $12,000 per incident</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold">Oxmaint.ai Solutions</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>24/7 automated monitoring of 120+ parameters</li>
                  <li>Real-time correlation analysis</li>
                  <li>Predictive maintenance recommendations</li>
                  <li>Automated work order generation</li>
                  <li>Resource optimization suggestions</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold">AI-Powered Benefits</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>85% reduction in repeat failures</li>
                  <li>60% faster root cause identification</li>
                  <li>40% decrease in maintenance costs</li>
                  <li>Replaces manual analysis of 4+ human operators</li>
                </ul>
              </div>
            </div>
          )
        };
      default:
        return { title: '', content: null };
    }
  };

  if (!isOpen) return null;

  const modalContent = getModalContent();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{modalContent.title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        {modalContent.content}
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default function FoodAndBeveragePage() {
  const [timeFilter, setTimeFilter] = useState('All');
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [workOrders, setWorkOrders] = useState([]);
  const [alertModalData, setAlertModalData] = useState(null);

  const sensorData = [
    {
      name: 'Motor Vibration - Line 2',
      currentValue: 12.8,
      threshold: 10.0,
      unit: 'mm/s',
      status: 'ALERT',
      timestamp: new Date().toLocaleString()
    },
    {
      name: 'Bearing Temperature',
      currentValue: 82,
      threshold: 85,
      unit: '°C',
      status: 'WARNING',
      timestamp: new Date().toLocaleString()
    },
    {
      name: 'Pressure Sensor',
      currentValue: 2.4,
      threshold: 3.0,
      unit: 'bar',
      status: 'NORMAL',
      timestamp: new Date().toLocaleString()
    }
  ];

  // Work order data
  const workOrderData = {
    current: {
      id: '2024-1211-0023',
      description: 'Motor Assembly - Line 2 (Vibration Issue)'
    },
    historical: [
      {
        id: '2024-0915-0187',
        daysAgo: 86,
        resolution: 'Bearing replacement',
        timeTaken: 4.5,
        partsUsed: 'BK-2344, ML-892',
        status: 'Successful Fix'
      },
      {
        id: '2024-0602-0092',
        daysAgo: 191,
        resolution: 'Alignment adjustment',
        timeTaken: 2.0,
        notes: 'Required follow-up after 2 weeks',
        status: 'Temporary Fix'
      }
    ]
  };

  // Exception alerts data
  const exceptionAlerts = [
    {
      type: 'warranty',
      data: {
        'WO#': '2024-1201-0156',
        'Part': 'Control Module CM-456',
        'Warranty Valid Until': 'March 2025',
        'Potential Savings': '$2,450'
      },
      action: 'Initiate Claim'
    },
    {
      type: 'maintenance',
      data: {
        'WO#': '2024-1208-0198',
        'Equipment': 'Conveyor Belt B4',
        'Last Service': '15 days ago',
        'Expected Interval': '90 days'
      },
      action: 'Review Maintenance Schedule'
    },
    {
      type: 'pattern',
      data: {
        'Equipment': 'Packaging Unit 3',
        'Pattern': '3 similar failures in 30 days',
        'Recommendation': 'Root cause analysis needed'
      },
      action: 'View Analysis'
    }
  ];

  // Time filter data
  // In the FoodAndBeveragePage component, update the timeFilterData object:

const timeFilterData = {
  'All': {
    downtimeData: [
      { month: 'Jan', withAI: 130, withoutAI: 250 },
      { month: 'Feb', withAI: 115, withoutAI: 240 },
      { month: 'Mar', withAI: 100, withoutAI: 230 },
      { month: 'Apr', withAI: 95, withoutAI: 225 },
      { month: 'May', withAI: 90, withoutAI: 220 },
      { month: 'Jun', withAI: 85, withoutAI: 215 },
      { month: 'Jul', withAI: 82, withoutAI: 210 },
      { month: 'Aug', withAI: 80, withoutAI: 205 },
      { month: 'Sep', withAI: 78, withoutAI: 200 },
      { month: 'Oct', withAI: 75, withoutAI: 195 },
      { month: 'Nov', withAI: 73, withoutAI: 190 },
      { month: 'Dec', withAI: 70, withoutAI: 185 }
    ],
    savingsData: [
      { month: 'Jan', actual: 280000, projected: 220000 },
      { month: 'Feb', actual: 310000, projected: 240000 },
      { month: 'Mar', actual: 335000, projected: 260000 },
      { month: 'Apr', actual: 350000, projected: 280000 },
      { month: 'May', actual: 375000, projected: 300000 },
      { month: 'Jun', actual: 390000, projected: 320000 },
      { month: 'Jul', actual: 405000, projected: 340000 },
      { month: 'Aug', actual: 420000, projected: 360000 },
      { month: 'Sep', actual: 435000, projected: 380000 },
      { month: 'Oct', actual: 450000, projected: 400000 },
      { month: 'Nov', actual: 465000, projected: 420000 },
      { month: 'Dec', actual: 480000, projected: 440000 }
    ],
    metrics: {
      reduction: '60%',
      savings: '$1,892,000',
      points: '120',
      health: '95%'
    }
  },
  '1M': {
    downtimeData: [
      { month: 'Week 1', withAI: 120, withoutAI: 240 },
      { month: 'Week 2', withAI: 110, withoutAI: 235 },
      { month: 'Week 3', withAI: 105, withoutAI: 230 },
      { month: 'Week 4', withAI: 95, withoutAI: 225 }
    ],
    savingsData: [
      { month: 'Week 1', actual: 85000, projected: 65000 },
      { month: 'Week 2', actual: 92000, projected: 70000 },
      { month: 'Week 3', actual: 88000, projected: 75000 },
      { month: 'Week 4', actual: 95000, projected: 80000 }
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
      { month: 'Jan', withAI: 130, withoutAI: 250 },
      { month: 'Feb', withAI: 115, withoutAI: 240 },
      { month: 'Mar', withAI: 100, withoutAI: 230 }
    ],
    savingsData: [
      { month: 'Jan', actual: 280000, projected: 220000 },
      { month: 'Feb', actual: 310000, projected: 240000 },
      { month: 'Mar', actual: 335000, projected: 260000 }
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
      { month: 'Jan', withAI: 130, withoutAI: 250 },
      { month: 'Feb', withAI: 115, withoutAI: 240 },
      { month: 'Mar', withAI: 100, withoutAI: 230 },
      { month: 'Apr', withAI: 95, withoutAI: 225 },
      { month: 'May', withAI: 90, withoutAI: 220 },
      { month: 'Jun', withAI: 85, withoutAI: 215 }
    ],
    savingsData: [
      { month: 'Jan', actual: 280000, projected: 220000 },
      { month: 'Feb', actual: 310000, projected: 240000 },
      { month: 'Mar', actual: 335000, projected: 260000 },
      { month: 'Apr', actual: 350000, projected: 280000 },
      { month: 'May', actual: 375000, projected: 300000 },
      { month: 'Jun', actual: 390000, projected: 320000 }
    ],
    metrics: {
      reduction: '58%',
      savings: '$1,292,000',
      points: '120',
      health: '93%'
    }
  }
};

  useEffect(() => {
    // Monitor sensor data for threshold violations
    const checkThresholds = () => {
      sensorData.forEach(sensor => {
        if (sensor.currentValue > sensor.threshold) {
          // Create work order if threshold exceeded
          const newWorkOrder = {
            id: `2024-${Math.floor(Math.random() * 10000)}`,
            description: `${sensor.name} exceeded threshold: ${sensor.currentValue} ${sensor.unit}`,
            timestamp: new Date().toLocaleString(),
            status: 'Open'
          };
          setWorkOrders(prev => [...prev, newWorkOrder]);
        }
      });
    };

    checkThresholds();
  }, [sensorData]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header and Time Filter */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Food & Beverage Analytics Dashboard</h1>
        {/* Update the time filter buttons section */}
<div className="flex gap-4">
  {['All', '1M', '3M', '6M'].map((filter) => (
    <button
      key={filter}
      className={`px-4 py-2 rounded ${
        timeFilter === filter
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 hover:bg-gray-200'
      }`}
      onClick={() => setTimeFilter(filter)}
    >
      {filter}
    </button>
  ))}
</div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Downtime Reduction"
          value={timeFilterData[timeFilter].metrics.reduction}
          trend="+12% from last month"
        />
        <MetricCard
          title="Cost Savings"
          value={timeFilterData[timeFilter].metrics.savings}
          trend="+8% from last month"
        />
        <MetricCard
          title="Monitored Points"
          value={timeFilterData[timeFilter].metrics.points}
          trend="+5 from last month"
        />
        <MetricCard
          title="Equipment Health"
          value={timeFilterData[timeFilter].metrics.health}
          trend="+3% from last month"
        />
      </div>

      {/* Live PLC Monitoring & Automated Response */}
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
          {/* Similar Historical Repairs */}
          <WorkOrderCard
            current={workOrderData.current}
            workOrders={workOrderData.historical}
          />
          
          {/* Exception Alerts */}
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

{/* Alert Detail Modal */}
<AlertDetailModal
  isOpen={!!alertModalData}
  onClose={() => setAlertModalData(null)}
  type={alertModalData?.type}
  data={alertModalData?.data}
/>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      {/* Modal for detailed analysis */}
      {selectedMetric && (
        <Modal
          isOpen={!!selectedMetric}
          onClose={() => setSelectedMetric(null)}
          title={selectedMetric}
        >
          <p>Detailed analysis for {selectedMetric}</p>
        </Modal>
      )}
    </div>
  );
}
