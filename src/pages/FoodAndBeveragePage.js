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
              <Wrenchtip />
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
              <Wrenchtip />
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