import React from 'react';
import { AlertTriangle, Timer, MoveUpRight } from 'lucide-react';

export const WorkOrderCard = ({ current, workOrders }) => {
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

export const ExceptionAlert = ({ type, data, action }) => {
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
      >
        {action}
      </button>
    </div>
  );
};