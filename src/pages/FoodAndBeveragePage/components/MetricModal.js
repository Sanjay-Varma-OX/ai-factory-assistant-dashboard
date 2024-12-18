import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function MetricModal({ selectedMetric, onClose, currentData }) {
  const getTitle = () => {
    switch (selectedMetric) {
      case 'downtime':
        return 'Downtime Analysis';
      case 'savings':
        return 'Cost Savings Breakdown';
      case 'oee':
        return 'Plant OEE Trends';
      case 'health':
        return 'Equipment Health Statistics';
      default:
        return '';
    }
  };

  return (
    <Dialog open={selectedMetric !== null} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>
        <div className="h-96">
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
      </DialogContent>
    </Dialog>
  );
}