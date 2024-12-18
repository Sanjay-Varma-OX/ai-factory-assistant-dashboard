{/* Previous code remains the same... */}

      {/* Exception Alerts Configuration */}
      <Card className="p-4">
        <h2 className="text-xl font-bold mb-4">Exception Alerts Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <h3 className="font-semibold">Alert Thresholds</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>Critical Alerts</span>
                <span className="text-red-500">±20% deviation</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>Warning Alerts</span>
                <span className="text-yellow-500">±10% deviation</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>Notification Frequency</span>
                <span>Real-time</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold">Notification Settings</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>Email Alerts</span>
                <span className="text-green-500">Enabled</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>SMS Alerts</span>
                <span className="text-green-500">Enabled</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>Dashboard Alerts</span>
                <span className="text-green-500">Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Downtime Analysis */}
      <Card className="p-4">
        <h2 className="text-xl font-bold mb-4">Downtime Reduction Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* MTTR Improvement */}
          <div className="space-y-4">
            <h3 className="font-semibold">MTTR Improvement</h3>
            <div className="p-4 bg-green-50 rounded">
              <div className="text-xl font-bold text-green-700">50% Reduction in MTTR</div>
              <div className="text-sm text-green-600">Through predictive maintenance and faster response times</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm text-gray-600">Before AI</div>
                <div className="text-lg font-bold">240 minutes</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm text-gray-600">After AI</div>
                <div className="text-lg font-bold text-green-600">120 minutes</div>
              </div>
            </div>
          </div>

          {/* PM Schedule Optimization */}
          <div className="space-y-4">
            <h3 className="font-semibold">PM Schedule Optimization</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>Schedule Conflicts</span>
                <span className="text-red-500">-75%</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>PM Completion Rate</span>
                <span className="text-green-500">+35%</span>
              </div>
              <div className="p-4 bg-blue-50 rounded">
                <h4 className="font-semibold">Streamlined Planning</h4>
                <p>AI-optimized scheduling across 120 factories</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="h-64">
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
        </div>
      </Card>

      {/* Historical Performance Analysis */}
      <Card className="p-4">
        <h2 className="text-xl font-bold mb-4">Historical Performance Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="p-4 bg-gray-50 rounded">
            <h3 className="font-semibold mb-2">Downtime Events</h3>
            <div className="text-2xl font-bold text-blue-600">-65%</div>
            <div className="text-sm text-gray-600">Reduction since implementation</div>
          </div>
          <div className="p-4 bg-gray-50 rounded">
            <h3 className="font-semibold mb-2">Cost Impact</h3>
            <div className="text-2xl font-bold text-green-600">$3.1M</div>
            <div className="text-sm text-gray-600">Total savings to date</div>
          </div>
          <div className="p-4 bg-gray-50 rounded">
            <h3 className="font-semibold mb-2">AI Prevention Rate</h3>
            <div className="text-2xl font-bold text-purple-600">92%</div>
            <div className="text-sm text-gray-600">Of potential failures prevented</div>
          </div>
        </div>
      </Card>

      {/* Metric Detail Modal */}
      <Dialog open={selectedMetric !== null} onOpenChange={() => setSelectedMetric(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {selectedMetric === 'downtime' && 'Downtime Analysis'}
              {selectedMetric === 'savings' && 'Cost Savings Breakdown'}
              {selectedMetric === 'oee' && 'Plant OEE Trends'}
              {selectedMetric === 'health' && 'Equipment Health Statistics'}
            </DialogTitle>
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
    </div>
  );
}
