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
  Tool,
  ClipboardList,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// ... (keep all existing component definitions until WorkOrderCard)

const WorkOrderDetails = ({ workOrder }) => {
  return (
    <div className="space-y-6">
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
            <span className={`ml-2 font-medium ${
              workOrder.status === "Successful Fix"
                ? "text-green-600"
                : "text-yellow-600"
            }`}>
              {workOrder.status}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Tool className="w-4 h-4 text-gray-600" />
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
          <Dialog key={wo.id}>
            <DialogTrigger asChild>
              <div className="space-y-2 cursor-pointer hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div className="flex justify-between items-center">
                  <div className="font-medium">WO#: {wo.id}</div>
                  <div
                    className={`text-sm px-3 py-1 rounded-full ${
                      wo.status === "Successful Fix"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {wo.status}
                  </div>
                </div>
                <div className="text-gray-500">{wo.daysAgo} days ago</div>
                <div>
                  <span className="font-medium">Resolution:</span> {wo.resolution}
                </div>
                <div>
                  <span className="font-medium">Time Taken:</span> {wo.timeTaken} hours
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Work Order Details - {wo.id}</DialogTitle>
                <DialogDescription>
                  Detailed information about this maintenance work order
                </DialogDescription>
              </DialogHeader>
              <WorkOrderDetails workOrder={wo} />
              <DialogFooter>
                <Button variant="outline">Export Details</Button>
                <Button>Create Similar WO</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

// ... (keep all remaining code unchanged)
