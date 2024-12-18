import React from 'react';
import { Card } from '@/components/ui/card';
import { Mail } from 'lucide-react';

const workOrder = {
  number: '2024-1217-0023',
  equipment: 'Motor Assembly - Line 2',
  priority: 'High',
  issue: 'Excessive vibration detected',
  requiredParts: 'Bearing kit #BK-2344',
  assignedTo: 'Team B - John Smith',
  generated: '2024-12-17 11:23:46'
};

const emailNotification = {
  to: 'maintenance.team@company.com',
  subject: 'URGENT: High Priority Maintenance Required - Line 2',
  details: {
    vibrationLevel: '12.8 mm/s (Threshold: 10.0 mm/s)',
    workOrder: '2024-1217-0023',
    location: 'Production Hall B',
    response: 'Within 2 hours'
  },
  attachments: [
    'Vibration_Analysis_Report.pdf',
    'Equipment_History.pdf',
    'Maintenance_Procedure.pdf'
  ]
};

export function WorkOrders() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-4">
        <h2 className="text-xl font-bold mb-4">Generated Work Order</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold">WO#:</span>
            <span>{workOrder.number}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Equipment:</span>
            <span>{workOrder.equipment}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Priority:</span>
            <span className="text-red-500">{workOrder.priority}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Issue:</span>
            <span>{workOrder.issue}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Required Parts:</span>
            <span>{workOrder.requiredParts}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Assigned To:</span>
            <span>{workOrder.assignedTo}</span>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h2 className="text-xl font-bold mb-4">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email Notification
          </div>
        </h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold">To:</span>
            <span>{emailNotification.to}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Subject:</span>
            <span className="text-red-500">{emailNotification.subject}</span>
          </div>
          <div className="space-y-2 mt-4">
            <h3 className="font-semibold">Details:</h3>
            <div className="pl-4 space-y-1">
              <div>Vibration Level: {emailNotification.details.vibrationLevel}</div>
              <div>Work Order: {emailNotification.details.workOrder}</div>
              <div>Location: {emailNotification.details.location}</div>
              <div>Required Response: {emailNotification.details.response}</div>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <h3 className="font-semibold">Attachments:</h3>
            <div className="pl-4 space-y-1">
              {emailNotification.attachments.map((attachment, index) => (
                <div key={index} className="text-blue-600">{attachment}</div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}