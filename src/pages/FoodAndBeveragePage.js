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
} from "lucide-react";
import { Link } from "react-router-dom";

// Keep all existing component definitions and implementations
// ...

// Update the WorkOrderDetailModal component with correct icon imports
const WorkOrderDetailModal = ({ isOpen, onClose, workOrder }) => {
  if (!isOpen || !workOrder) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Work Order {workOrder.id}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Active Issue Alert */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 text-amber-800">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-semibold">Active Issue: {workOrder.title}</h3>
          </div>
          <p className="mt-1 text-amber-700">Problem: {workOrder.problem}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Required Parts Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Box className="w-5 h-5" />
              Required Parts & Inventory
            </h3>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-blue-600 font-medium mb-2">
                Chocolate Pump Impeller (#IMP-2024-X789)
              </div>
              <div className="text-gray-600">
                Location: Aisle D, Bin 15-C, Shelf 3
              </div>
              <div className="mt-2 inline-flex items-center bg-green-100 text-green-800 px-2 py-1 rounded">
                In Stock: 2
              </div>
            </div>
            <button className="mt-4 w-full bg-gray-100 text-gray-700 hover:bg-gray-200 py-2 rounded-md">
              View Guided Procedure
            </button>
          </div>

          {/* PM Status Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Preventive Maintenance Status
            </h3>
            <div className="space-y-4">
              {/* Last PM Service */}
              <div>
                <h4 className="font-medium mb-2">Last PM Service</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-600">Date:</div>
                    <div className="font-medium">2024-11-20</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Hours:</div>
                    <div className="font-medium">850</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Work Order:</div>
                    <div className="font-medium">PM-2024-156</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Technician:</div>
                    <div className="font-medium">Mike Johnson</div>
                  </div>
                </div>
              </div>

              {/* Next PM Service */}
              <div>
                <h4 className="font-medium mb-2">Next PM Service</h4>
                <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Hours Until Next PM:</span>
                    <span className="font-medium">150 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Due Date:</span>
                    <span className="font-medium">2024-12-28</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Days Remaining:</span>
                    <span className="font-medium">11 days</span>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Progress to Next PM</span>
                      <span className="text-blue-600">85%</span>
                    </div>
                    <div className="w-full bg-blue-100 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Past Cases */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Similar Past Cases
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">WO-2024-045</span>
                <span className="text-gray-500">2024-11-15</span>
              </div>
              <p className="text-gray-600 mb-2">Replaced worn pump impeller</p>
              <div className="text-gray-500 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                2.5 hours
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">WO-2024-032</span>
                <span className="text-gray-500">2024-10-28</span>
              </div>
              <p className="text-gray-600 mb-2">Adjusted temperature controller settings</p>
              <div className="text-gray-500 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                1 hour
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">WO-2023-198</span>
                <span className="text-gray-500">2023-12-05</span>
              </div>
              <p className="text-gray-600 mb-2">Calibrated flow sensors and cleaned nozzles</p>
              <div className="text-gray-500 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                3 hours
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Keep main component and all other existing code
...