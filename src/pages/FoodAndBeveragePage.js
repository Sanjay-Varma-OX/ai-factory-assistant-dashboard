import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Timer,
  MoveUpRight,
  Package2 as Box,
  CalendarDays as Calendar,
  Wrench,
  ClipboardList,
} from "lucide-react";

// Custom Dialog Components
const Dialog = ({ children, open, onOpenChange }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-lg w-full max-w-4xl p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const DialogContent = ({ children, className = "" }) => (
  <div className={`${className}`}>{children}</div>
);

const DialogHeader = ({ children }) => (
  <div className="mb-4">{children}</div>
);

const DialogTitle = ({ children }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);

const DialogDescription = ({ children }) => (
  <p className="text-sm text-gray-500 mt-1">{children}</p>
);

const DialogFooter = ({ children }) => (
  <div className="flex justify-end gap-3 mt-6">{children}</div>
);

const Button = ({ children, variant = "default", onClick }) => {
  const styles = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50"
  };
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md ${styles[variant]} transition-colors`}
    >
      {children}
    </button>
  );
};
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
    ALERT: "bg-red-50 border-red-200",
    WARNING: "bg-yellow-50 border-yellow-200",
    NORMAL: "bg-green-50 border-green-200",
  }[status];

  const textColor = {
    ALERT: "text-red-600",
    WARNING: "text-yellow-600",
    NORMAL: "text-green-600",
  }[status];

  const StatusIcon = {
    ALERT: () => <AlertTriangle className="text-red-500" />,
    WARNING: () => <AlertTriangle className="text-yellow-500" />,
    NORMAL: () => <CheckCircle className="text-green-500" />,
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
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);

  return (
    <div className="bg-white p-6 rounded-lg border">
      {/* Current WO Header */}
      <h3 className="text-lg font-semibold mb-4">Similar Historical Repairs</h3>
      <div className="border-l-4 border-blue-500 pl-4 mb-4">
        <div className="font-medium">Current WO#: {current.id}</div>
        <div className="text-gray-600">{current.description}</div>
      </div>

      {/* Historical Work Orders List */}
      <div className="space-y-4">
        {workOrders.map((wo) => (
          <div key={wo.id}>
            <div
              onClick={() => setSelectedWorkOrder(wo)}
              className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            >
              {/* Work Order Header */}
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">WO#: {wo.id}</span>
                <span 
                  className={`px-3 py-1 rounded-full text-sm ${
                    wo.status === "Successful Fix"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {wo.status}
                </span>
              </div>
              
              {/* Work Order Details */}
              <div className="text-gray-500 mb-2">{wo.daysAgo} days ago</div>
              <div className="mb-2">
                <span className="font-medium">Resolution: </span>
                {wo.resolution}
              </div>
              <div className="mb-2">
                <span className="font-medium">Time Taken: </span>
                {wo.timeTaken} hours
              </div>
              <div className="mb-2">
                <span className="font-medium">Parts Used: </span>
                {wo.partsUsed}
              </div>
              {wo.notes && (
                <div>
                  <span className="font-medium">Notes: </span>
                  {wo.notes}
                </div>
              )}
            </div>

            {/* Modal/Dialog for detailed view */}
            {selectedWorkOrder?.id === wo.id && (
              <Dialog 
                open={true} 
                onOpenChange={() => setSelectedWorkOrder(null)}
              >
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Work Order Details - {wo.id}</DialogTitle>
                    <DialogDescription>
                      Detailed maintenance information and history
                    </DialogDescription>
                  </DialogHeader>
                  
                  {/* Detailed Work Order Information */}
                  <WorkOrderDetails workOrder={wo} />
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setSelectedWorkOrder(null)}>
                      Close
                    </Button>
                    <Button>Export Details</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
const WorkOrderDetails = ({ workOrder }) => {
  return (
    <div className="space-y-6">
      {/* Current Issue Alert */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <ClipboardList className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Work Order Details</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-gray-600">Work Order #:</span>
            <span className="ml-2 font-medium">{workOrder.id}</span>
          </div>
          <div>
            <span className="text-gray-600">Status:</span>
            <span
              className={`ml-2 font-medium ${
                workOrder.status === "Successful Fix"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {workOrder.status}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Location:</span>
            <span className="ml-2 font-medium">{workOrder.location}</span>
          </div>
          <div>
            <span className="text-gray-600">Technician:</span>
            <span className="ml-2 font-medium">{workOrder.technician}</span>
          </div>
        </div>
      </div>

      {/* Maintenance Details & Parts */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="w-4 h-4 text-gray-600" />
            <h4 className="font-medium">Maintenance Details</h4>
          </div>
          <div className="space-y-2">
            <div>
              <span className="text-gray-600">Resolution:</span>
              <p className="font-medium">{workOrder.resolution}</p>
            </div>
            <div>
              <span className="text-gray-600">Time Taken:</span>
              <p className="font-medium">{workOrder.timeTaken} hours</p>
            </div>
            <div>
              <span className="text-gray-600">Tools Required:</span>
              <p className="font-medium">{workOrder.toolsRequired}</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Box className="w-4 h-4 text-gray-600" />
            <h4 className="font-medium">Parts & Notes</h4>
          </div>
          <div className="space-y-2">
            {workOrder.partsUsed && (
              <div>
                <span className="text-gray-600">Parts Used:</span>
                <p className="font-medium">{workOrder.partsUsed}</p>
              </div>
            )}
            {workOrder.notes && (
              <div>
                <span className="text-gray-600">Notes:</span>
                <p className="font-medium">{workOrder.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Procedure Details */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <ClipboardList className="w-4 h-4 text-gray-600" />
          <h4 className="font-medium">Maintenance Procedure</h4>
        </div>
        <div className="space-y-2">
          {workOrder.procedure?.map((step, index) => (
            <div key={index} className="p-2 bg-white rounded flex gap-2">
              <span className="text-gray-500">{index + 1}.</span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4 text-blue-600" />
          <h4 className="font-medium">Timeline</h4>
        </div>
        <div className="space-y-2">
          <div>
            <span className="text-gray-600">Created:</span>
            <p className="font-medium">{workOrder.daysAgo} days ago</p>
          </div>
          {workOrder.completedDate && (
            <div>
              <span className="text-gray-600">Completed:</span>
              <p className="font-medium">{workOrder.completedDate}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// const WorkOrderCard = ({ current, workOrders }) => {
//   return (
//     <div className="bg-white p-6 rounded-lg border">
//       <h3 className="text-lg font-semibold mb-4">Similar Historical Repairs</h3>
//       <div className="border-l-4 border-blue-500 pl-4 mb-4">
//         <div className="font-medium">Current WO#: {current.id}</div>
//         <div className="text-gray-600">{current.description}</div>
//       </div>

//       <div className="space-y-6">
//         {workOrders.map((wo) => (
//           <Dialog key={wo.id}>
//             <DialogTrigger asChild>
//               <div className="space-y-2 cursor-pointer hover:bg-gray-50 p-4 rounded-lg transition-colors">
//                 <div className="flex justify-between items-center">
//                   <div className="font-medium">WO#: {wo.id}</div>
//                   <div
//                     className={`text-sm px-3 py-1 rounded-full ${
//                       wo.status === "Successful Fix"
//                         ? "bg-green-100 text-green-800"
//                         : "bg-yellow-100 text-yellow-800"
//                     }`}
//                   >
//                     {wo.status}
//                   </div>
//                 </div>
//                 <div className="text-gray-500">{wo.daysAgo} days ago</div>
//                 <div>
//                   <span className="font-medium">Resolution:</span>{" "}
//                   {wo.resolution}
//                 </div>
//                 <div>
//                   <span className="font-medium">Time Taken:</span>{" "}
//                   {wo.timeTaken} hours
//                 </div>
//               </div>
//             </DialogTrigger>
//             <DialogContent className="max-w-4xl">
//               <DialogHeader>
//                 <DialogTitle>Work Order Details - {wo.id}</DialogTitle>
//                 <DialogDescription>
//                   Detailed information about this maintenance work order
//                 </DialogDescription>
//               </DialogHeader>
//               <WorkOrderDetails workOrder={wo} />
//               <DialogFooter>
//                 <Button variant="outline">Export Details</Button>
//                 <Button>Create Similar WO</Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         ))}
//       </div>
//     </div>
//   );
// };

const ExceptionAlert = ({ type, data, action, onActionClick }) => {
  const getTypeStyles = () => {
    switch (type) {
      case "warranty":
        return {
          icon: <AlertTriangle className="text-red-500" />,
          bg: "bg-red-50",
          border: "border-red-200",
          button: "bg-red-100 text-red-700 hover:bg-red-200",
        };
      case "maintenance":
        return {
          icon: <Timer className="text-yellow-500" />,
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          button: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
        };
      case "pattern":
        return {
          icon: <MoveUpRight className="text-blue-500" />,
          bg: "bg-blue-50",
          border: "border-blue-200",
          button: "bg-blue-100 text-blue-700 hover:bg-blue-200",
        };
      default:
        return {
          icon: null,
          bg: "bg-gray-50",
          border: "border-gray-200",
          button: "bg-gray-100 text-gray-700 hover:bg-gray-200",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className={`${styles.bg} ${styles.border} border rounded-lg p-4`}>
      <div className="flex items-center gap-2 mb-2">
        {styles.icon}
        <span className="font-semibold">
          {type === "warranty" && "Warranty Not Claimed"}
          {type === "maintenance" && "Premature Maintenance Alert"}
          {type === "pattern" && "Unusual Pattern Detected"}
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
      case "warranty":
  return {
    title: "Warranty Management Dashboard",
    content: (
      <div className="space-y-6">
        {/* Top Stats Section */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <h4 className="text-sm text-blue-600 font-medium">Potential Savings</h4>
            <div className="text-2xl font-bold text-blue-700">{data["Potential Savings"]}</div>
            <p className="text-xs text-blue-500">+15% from last month</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <h4 className="text-sm text-green-600 font-medium">Processing Time</h4>
            <div className="text-2xl font-bold text-green-700">2 hrs</div>
            <p className="text-xs text-green-500">-70% from 5 days</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <h4 className="text-sm text-purple-600 font-medium">Approval Rate</h4>
            <div className="text-2xl font-bold text-purple-700">100%</div>
            <p className="text-xs text-purple-500">+25% improvement</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <h4 className="text-sm text-orange-600 font-medium">Active Claims</h4>
            <div className="text-2xl font-bold text-orange-700">12</div>
            <p className="text-xs text-orange-500">3 pending review</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Current Warranty Details */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-lg">Current Warranty Details</h4>
              <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm">
                Active
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Part Number</span>
                <span className="font-medium">{data["Part"]}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Work Order</span>
                <span className="font-medium">{data["WO#"]}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Valid Until</span>
                <span className="font-medium">{data["Warranty Valid Until"]}</span>
              </div>
            </div>
          </div>

          {/* Historical Context */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h4 className="font-semibold text-lg mb-4">Quarterly Performance</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                <span>Claims Processed</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold">3</span>
                  <span className="text-green-500 text-sm">↑ 2</span>
                </div>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                <span>Average Processing Time</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold">2 hours</span>
                  <span className="text-green-500 text-sm">↓ 70%</span>
                </div>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                <span>Approval Rate</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold">100%</span>
                  <span className="text-green-500 text-sm">↑ 25%</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Features */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h4 className="font-semibold text-lg mb-4">AI-Powered Features</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="font-medium">Automated Tracking</span>
                </div>
                <p className="text-sm text-gray-600">24/7 warranty period monitoring</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Smart Docs</span>
                </div>
                <p className="text-sm text-gray-600">Automated documentation prep</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="font-medium">Predictive</span>
                </div>
                <p className="text-sm text-gray-600">Early issue detection</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="font-medium">Alerts</span>
                </div>
                <p className="text-sm text-gray-600">Real-time notifications</p>
              </div>
            </div>
          </div>

          {/* Action Items */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h4 className="font-semibold text-lg mb-4">Recommended Actions</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-yellow-600">⚡</span>
                  <span>Submit warranty claim for {data["Part"]}</span>
                </div>
                <button className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full hover:bg-yellow-200">
                  Action
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-blue-600">📋</span>
                  <span>Review maintenance history</span>
                </div>
                <button className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200">
                  View
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-green-600">📊</span>
                  <span>Generate savings report</span>
                </div>
                <button className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200">
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  };

      case "maintenance":
  return {
    title: "Maintenance Analytics Dashboard",
    content: (
      <div className="space-y-6">
        {/* Top Stats Section */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <h4 className="text-sm text-yellow-600 font-medium">Downtime Reduction</h4>
            <div className="text-2xl font-bold text-yellow-700">47%</div>
            <p className="text-xs text-yellow-500">vs. Traditional</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <h4 className="text-sm text-green-600 font-medium">Cost Reduction</h4>
            <div className="text-2xl font-bold text-green-700">68%</div>
            <p className="text-xs text-green-500">Annual Savings</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <h4 className="text-sm text-blue-600 font-medium">Equipment Lifespan</h4>
            <div className="text-2xl font-bold text-blue-700">3x</div>
            <p className="text-xs text-blue-500">Improvement</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <h4 className="text-sm text-purple-600 font-medium">Inspection Time</h4>
            <div className="text-2xl font-bold text-purple-700">-75%</div>
            <p className="text-xs text-purple-500">Time Saved</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* AI Detection Alert */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-lg">AI Detection Alert</h4>
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                Urgent Action Required
              </span>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg mb-4">
              <p className="text-gray-700">
                Oxmaint.ai has detected unusual wear patterns requiring early
                maintenance, potentially preventing a critical failure.
              </p>
            </div>
            <div className="flex justify-end">
              <button className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg hover:bg-yellow-200">
                View Details
              </button>
            </div>
          </div>

          {/* Approach Comparison */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h4 className="font-semibold text-lg mb-4">Maintenance Approach Comparison</h4>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Traditional Schedule</span>
                </div>
                <div className="ml-7 text-gray-600">
                  <div className="flex justify-between mb-1">
                    <span>Maintenance Interval</span>
                    <span className="font-medium">90 days</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>Inspection Time</span>
                    <span className="font-medium">4-6 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Approach</span>
                    <span className="font-medium text-red-500">Reactive</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="font-medium">Oxmaint.ai Schedule</span>
                </div>
                <div className="ml-7 text-gray-600">
                  <div className="flex justify-between mb-1">
                    <span>Maintenance Interval</span>
                    <span className="font-medium">Dynamic</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>Inspection Time</span>
                    <span className="font-medium">1-2 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Approach</span>
                    <span className="font-medium text-green-500">Predictive</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Historical Performance */}
          <div className="bg-white p-6 rounded-lg border shadow-sm col-span-2">
            <h4 className="font-semibold text-lg mb-4">Performance Metrics</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="font-medium">Downtime</span>
                </div>
                <div className="text-3xl font-bold text-blue-700 mb-1">47%</div>
                <p className="text-sm text-blue-600">Reduction in unexpected downtime</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Costs</span>
                </div>
                <div className="text-3xl font-bold text-green-700 mb-1">68%</div>
                <p className="text-sm text-green-600">Decrease in maintenance costs</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="font-medium">Equipment</span>
                </div>
                <div className="text-3xl font-bold text-purple-700 mb-1">3x</div>
                <p className="text-sm text-purple-600">Improvement in lifespan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  };
      case "pattern":
  return {
    title: "Pattern Analysis Dashboard",
    content: (
      <div className="space-y-6">
        {/* Top Stats Section */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <h4 className="text-sm text-red-600 font-medium">Similar Failures</h4>
            <div className="text-2xl font-bold text-red-700">3</div>
            <p className="text-xs text-red-500">Last 30 Days</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <h4 className="text-sm text-orange-600 font-medium">Avg Downtime</h4>
            <div className="text-2xl font-bold text-orange-700">4.5h</div>
            <p className="text-xs text-orange-500">Per Incident</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <h4 className="text-sm text-yellow-600 font-medium">Production Loss</h4>
            <div className="text-2xl font-bold text-yellow-700">$12k</div>
            <p className="text-xs text-yellow-500">Per Incident</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <h4 className="text-sm text-green-600 font-medium">Parameters</h4>
            <div className="text-2xl font-bold text-green-700">120+</div>
            <p className="text-xs text-green-500">Monitored 24/7</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* AI Pattern Recognition Alert */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-lg">AI Pattern Recognition</h4>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                Pattern Detected
              </span>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-gray-700">
                Oxmaint.ai has identified a recurring pattern that suggests an
                underlying systemic issue.
              </p>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-gray-600">Detection Accuracy</span>
                <span className="font-bold text-blue-600">98%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-gray-600">Pattern Type</span>
                <span className="font-bold text-blue-600">Cyclical Failure</span>
              </div>
            </div>
          </div>

          {/* Pattern Details */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h4 className="font-semibold text-lg mb-4">Impact Analysis</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Failures Detected</span>
                </div>
                <span className="font-bold text-red-700">3 in 30 days</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Average Downtime</span>
                </div>
                <span className="font-bold text-orange-700">4.5 hours</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Production Loss</span>
                </div>
                <span className="font-bold text-yellow-700">$12,000/incident</span>
              </div>
            </div>
          </div>

          {/* AI Solutions */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h4 className="font-semibold text-lg mb-4">Oxmaint.ai Solutions</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">24/7 Monitoring</span>
                </div>
                <p className="text-sm text-gray-600">120+ parameters tracked</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="font-medium">Real-time Analysis</span>
                </div>
                <p className="text-sm text-gray-600">Instant correlation detection</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span className="font-medium">Auto Work Orders</span>
                </div>
                <p className="text-sm text-gray-600">Automated generation</p>
              </div>
              <div className="bg-indigo-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="font-medium">Resource Optimization</span>
                </div>
                <p className="text-sm text-gray-600">Smart resource allocation</p>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h4 className="font-semibold text-lg mb-4">AI-Powered Benefits</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                <span>Repeat Failures</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold">85%</span>
                  <span className="text-green-500 text-sm">↓ Reduction</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                <span>Root Cause Analysis</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold">60%</span>
                  <span className="text-blue-500 text-sm">↑ Faster</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded">
                <span>Maintenance Costs</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold">40%</span>
                  <span className="text-purple-500 text-sm">↓ Decrease</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  };
default:
        return { title: "", content: null };
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
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default function FoodAndBeveragePage() {
  const [timeFilter, setTimeFilter] = useState("All");
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [workOrders, setWorkOrders] = useState([]);
  const [alertModalData, setAlertModalData] = useState(null);

  const sensorData = [
    {
      name: "Motor Vibration - Line 2",
      currentValue: 12.8,
      threshold: 10.0,
      unit: "mm/s",
      status: "ALERT",
      timestamp: new Date().toLocaleString(),
    },
    {
      name: "Bearing Temperature",
      currentValue: 82,
      threshold: 85,
      unit: "°C",
      status: "WARNING",
      timestamp: new Date().toLocaleString(),
    },
    {
      name: "Pressure Sensor",
      currentValue: 2.4,
      threshold: 3.0,
      unit: "bar",
      status: "NORMAL",
      timestamp: new Date().toLocaleString(),
    },
  ];

  // Work order data
  const workOrderData = {
  current: {
    id: "2024-1211-0023",
    description: "Motor Assembly - Line 2 (Vibration Issue)",
  },
  historical: [
    {
      id: "2024-0915-0187",
      daysAgo: 86,
      resolution: "Bearing replacement - Resolved excessive vibration in motor assembly",
      timeTaken: 4.5,
      partsUsed: "BK-2344 (Bearing Kit), ML-892 (Motor Lubricant)",
      status: "Successful Fix",
      location: "Line 2 - Motor Assembly",
      technician: "Mike Johnson",
      procedure: [
        "Lock out/tag out machine",
        "Remove motor housing cover",
        "Replace worn bearings",
        "Apply new lubricant",
        "Reassemble housing",
        "Test rotation and vibration"
      ],
      toolsRequired: "Torque wrench, Bearing puller, Alignment tools",
      notes: "Follow-up vibration test after 24 hours showed normal levels",
      completedDate: "2024-09-15"
    },
    {
      id: "2024-0602-0092",
      daysAgo: 191,
      resolution: "Alignment adjustment of motor shaft and coupling",
      timeTaken: 2.0,
      partsUsed: "Shaft coupling gasket SC-789",
      status: "Temporary Fix",
      location: "Line 2 - Drive System",
      technician: "Sarah Chen",
      procedure: [
        "Check alignment measurements",
        "Loosen mounting bolts",
        "Adjust alignment",
        "Retighten to spec",
        "Test operation"
      ],
      toolsRequired: "Laser alignment tool, Torque wrench",
      notes: "Required follow-up after 2 weeks - Schedule complete bearing replacement",
      completedDate: "2024-06-02"
    }
  ]
};

  // Exception alerts data
  const exceptionAlerts = [
    {
      type: "warranty",
      data: {
        "WO#": "2024-1201-0156",
        Part: "Control Module CM-456",
        "Warranty Valid Until": "March 2025",
        "Potential Savings": "$2,450",
      },
      action: "Initiate Claim",
    },
    {
      type: "maintenance",
      data: {
        "WO#": "2024-1208-0198",
        Equipment: "Conveyor Belt B4",
        "Last Service": "15 days ago",
        "Expected Interval": "90 days",
      },
      action: "Review Maintenance Schedule",
    },
    {
      type: "pattern",
      data: {
        Equipment: "Packaging Unit 3",
        Pattern: "3 similar failures in 30 days",
        Recommendation: "Root cause analysis needed",
      },
      action: "View Analysis",
    },
  ];

  // Time filter data
  // In the FoodAndBeveragePage component, update the timeFilterData object:

  const timeFilterData = {
    All: {
      downtimeData: [
        { month: "Jan", withAI: 130, withoutAI: 250 },
        { month: "Feb", withAI: 115, withoutAI: 240 },
        { month: "Mar", withAI: 100, withoutAI: 230 },
        { month: "Apr", withAI: 95, withoutAI: 225 },
        { month: "May", withAI: 90, withoutAI: 220 },
        { month: "Jun", withAI: 85, withoutAI: 215 },
        { month: "Jul", withAI: 82, withoutAI: 210 },
        { month: "Aug", withAI: 80, withoutAI: 205 },
        { month: "Sep", withAI: 78, withoutAI: 200 },
        { month: "Oct", withAI: 75, withoutAI: 195 },
        { month: "Nov", withAI: 73, withoutAI: 190 },
        { month: "Dec", withAI: 70, withoutAI: 185 },
      ],
      savingsData: [
        { month: "Jan", actual: 280000, projected: 220000 },
        { month: "Feb", actual: 310000, projected: 240000 },
        { month: "Mar", actual: 335000, projected: 260000 },
        { month: "Apr", actual: 350000, projected: 280000 },
        { month: "May", actual: 375000, projected: 300000 },
        { month: "Jun", actual: 390000, projected: 320000 },
        { month: "Jul", actual: 405000, projected: 340000 },
        { month: "Aug", actual: 420000, projected: 360000 },
        { month: "Sep", actual: 435000, projected: 380000 },
        { month: "Oct", actual: 450000, projected: 400000 },
        { month: "Nov", actual: 465000, projected: 420000 },
        { month: "Dec", actual: 480000, projected: 440000 },
      ],
      metrics: {
        reduction: "60%",
        savings: "$1,892,000",
        points: "120",
        health: "95%",
      },
    },
    "1M": {
      downtimeData: [
        { month: "Week 1", withAI: 120, withoutAI: 240 },
        { month: "Week 2", withAI: 110, withoutAI: 235 },
        { month: "Week 3", withAI: 105, withoutAI: 230 },
        { month: "Week 4", withAI: 95, withoutAI: 225 },
      ],
      savingsData: [
        { month: "Week 1", actual: 85000, projected: 65000 },
        { month: "Week 2", actual: 92000, projected: 70000 },
        { month: "Week 3", actual: 88000, projected: 75000 },
        { month: "Week 4", actual: 95000, projected: 80000 },
      ],
      metrics: {
        reduction: "50%",
        savings: "$324,500",
        points: "120",
        health: "94%",
      },
    },
    "3M": {
      downtimeData: [
        { month: "Jan", withAI: 130, withoutAI: 250 },
        { month: "Feb", withAI: 115, withoutAI: 240 },
        { month: "Mar", withAI: 100, withoutAI: 230 },
      ],
      savingsData: [
        { month: "Jan", actual: 280000, projected: 220000 },
        { month: "Feb", actual: 310000, projected: 240000 },
        { month: "Mar", actual: 335000, projected: 260000 },
      ],
      metrics: {
        reduction: "55%",
        savings: "$892,000",
        points: "120",
        health: "92%",
      },
    },
    "6M": {
      downtimeData: [
        { month: "Jan", withAI: 130, withoutAI: 250 },
        { month: "Feb", withAI: 115, withoutAI: 240 },
        { month: "Mar", withAI: 100, withoutAI: 230 },
        { month: "Apr", withAI: 95, withoutAI: 225 },
        { month: "May", withAI: 90, withoutAI: 220 },
        { month: "Jun", withAI: 85, withoutAI: 215 },
      ],
      savingsData: [
        { month: "Jan", actual: 280000, projected: 220000 },
        { month: "Feb", actual: 310000, projected: 240000 },
        { month: "Mar", actual: 335000, projected: 260000 },
        { month: "Apr", actual: 350000, projected: 280000 },
        { month: "May", actual: 375000, projected: 300000 },
        { month: "Jun", actual: 390000, projected: 320000 },
      ],
      metrics: {
        reduction: "58%",
        savings: "$1,292,000",
        points: "120",
        health: "93%",
      },
    },
  };

  useEffect(() => {
    // Monitor sensor data for threshold violations
    const checkThresholds = () => {
      sensorData.forEach((sensor) => {
        if (sensor.currentValue > sensor.threshold) {
          // Create work order if threshold exceeded
          const newWorkOrder = {
            id: `2024-${Math.floor(Math.random() * 10000)}`,
            description: `${sensor.name} exceeded threshold: ${sensor.currentValue} ${sensor.unit}`,
            timestamp: new Date().toLocaleString(),
            status: "Open",
          };
          setWorkOrders((prev) => [...prev, newWorkOrder]);
        }
      });
    };

    checkThresholds();
  }, [sensorData]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header and Time Filter */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Food & Beverage Analytics Dashboard
        </h1>
        {/* Update the time filter buttons section */}
        <div className="flex gap-4">
          {["All", "1M", "3M", "6M"].map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded ${
                timeFilter === filter
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
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
        <h2 className="text-2xl font-bold mb-4">
          Live PLC Monitoring & Automated Response
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {sensorData.map((sensor) => (
            <Alert key={sensor.name} status={sensor.status} title={sensor.name}>
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
        <h2 className="text-2xl font-bold mb-4">
          Work Order Analysis & Exceptions
        </h2>
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
                onActionClick={(type, data) =>
                  setAlertModalData({ type, data })
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* Alert Detail Modal */}
      <AlertDetailModal
        isOpen={!!alertModalData}
        onClose={() => setAlertModalData(null)}
        type={alertModalData?.type}
        data={alertModalData?.data}
      />

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
              <Line
                type="monotone"
                dataKey="withAI"
                stroke="#3B82F6"
                name="With AI"
              />
              <Line
                type="monotone"
                dataKey="withoutAI"
                stroke="#EF4444"
                name="Without AI"
              />
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
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#10B981"
                name="Actual"
              />
              <Line
                type="monotone"
                dataKey="projected"
                stroke="#6B7280"
                name="Projected"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
