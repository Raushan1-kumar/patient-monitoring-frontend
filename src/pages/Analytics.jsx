import { useState } from "react";
import { motion } from "motion/react";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import Sidebar from "../pages/component/SideBar";
import Header from "../pages/component/Header";
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  AlertTriangle, 
  Users, 
  Activity,
  ArrowUp,
  ArrowDown,
  Filter,
  Download
} from "lucide-react";

const kpiData = [
  {
    title: "Total Alerts Today",
    value: 47,
    change: +12,
    trend: "up",
    color: "bg-blue-500",
    icon: AlertTriangle
  },
  {
    title: "Critical Alerts",
    value: 8,
    change: +3,
    trend: "up",
    color: "bg-red-500",
    icon: TrendingUp
  },
  {
    title: "Patients at Risk",
    value: 15,
    change: -2,
    trend: "down",
    color: "bg-orange-500",
    icon: Users
  },
  {
    title: "Avg Response Time",
    value: "4.2m",
    change: -0.8,
    trend: "down",
    color: "bg-green-500",
    icon: Clock
  }
];

const alertsTableData = [
  {
    id: 1,
    patient: "Sarah Johnson",
    type: "Heart Rate",
    severity: "Critical",
    time: "14:32",
    status: "Active",
    value: "125 BPM"
  },
  {
    id: 2,
    patient: "Michael Chen",
    type: "SpO₂",
    severity: "Warning",
    time: "14:28",
    status: "Acknowledged",
    value: "89%"
  },
  {
    id: 3,
    patient: "Emily Rodriguez",
    type: "Blood Pressure",
    severity: "Warning",
    time: "14:15",
    status: "Resolved",
    value: "145/95"
  },
  {
    id: 4,
    patient: "David Thompson",
    type: "Temperature",
    severity: "Info",
    time: "14:10",
    status: "Resolved",
    value: "99.2°F"
  },
  {
    id: 5,
    patient: "Lisa Park",
    type: "Heart Rate",
    severity: "Warning",
    time: "13:55",
    status: "Active",
    value: "102 BPM"
  }
];

const alertFrequencyData = [
  { time: '00:00', alerts: 12 },
  { time: '04:00', alerts: 8 },
  { time: '08:00', alerts: 24 },
  { time: '12:00', alerts: 38 },
  { time: '16:00', alerts: 45 },
  { time: '20:00', alerts: 32 },
  { time: '24:00', alerts: 18 },
];

const vitalsDistributionData = [
  { name: 'Normal', value: 65, color: '#10B981' },
  { name: 'Warning', value: 25, color: '#F59E0B' },
  { name: 'Critical', value: 10, color: '#EF4444' },
];

const bedUtilizationData = [
  { ward: 'ICU-1', occupied: 8, total: 10 },
  { ward: 'ICU-2', occupied: 9, total: 10 },
  { ward: 'Ward-A', occupied: 15, total: 20 },
  { ward: 'Ward-B', occupied: 12, total: 20 },
  { ward: 'Ward-C', occupied: 18, total: 25 },
  { ward: 'Emergency', occupied: 6, total: 8 },
];

export default function Analytics() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState("Today");
  const [sortField, setSortField] = useState("time");
  const [sortDirection, setSortDirection] = useState("desc");

  const timeRanges = ["Today", "Yesterday", "Last 7 days", "Last 30 days"];

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'warning':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-red-100 text-red-800';
      case 'acknowledged':
        return 'bg-orange-100 text-orange-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
        transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 transition-transform duration-300 ease-in-out
      `}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          onMenuClick={() => setSidebarOpen(true)} 
          title="Analytics & Alerts"
        />

        <div className="flex-1 overflow-y-auto p-6">
          {/* Header with time range selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 font-inter">Hospital Analytics</h1>
              <p className="text-gray-600">Real-time insights and alert management</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex bg-gray-100 rounded-xl p-1">
                {timeRanges.map((range) => (
                  <motion.button
                    key={range}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTimeRange(range)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                      selectedTimeRange === range
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    {range}
                  </motion.button>
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
              >
                <Download size={16} />
                Export
              </motion.button>
            </div>
          </div>

          {/* KPI Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8"
          >
            {kpiData.map((kpi, index) => {
              const Icon = kpi.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${kpi.color} rounded-xl flex items-center justify-center`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${
                      kpi.trend === 'up' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {kpi.trend === 'up' ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                      {Math.abs(kpi.change)}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 font-inter mb-1">{kpi.value}</h3>
                  <p className="text-sm text-gray-600">{kpi.title}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            {/* Alert Frequency Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6 font-inter">Alert Frequency</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={alertFrequencyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="time" 
                      stroke="#6b7280"
                      fontSize={12}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#6b7280"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "12px",
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="alerts"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.2}
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Vitals Distribution Pie Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6 font-inter">Vitals Distribution</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={vitalsDistributionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {vitalsDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Bed Utilization Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg mb-8"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-6 font-inter">Hospital Bed Utilization</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bedUtilizationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="ward" 
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "12px",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Bar dataKey="occupied" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="total" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Alerts Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800 font-inter">Recent Alerts</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  <Filter size={16} />
                  Filter
                </motion.button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('patient')}
                    >
                      Patient
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('type')}
                    >
                      Alert Type
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('severity')}
                    >
                      Severity
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('time')}
                    >
                      Time
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('status')}
                    >
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {alertsTableData.map((alert, index) => (
                    <motion.tr
                      key={alert.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 font-inter">{alert.patient}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{alert.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-lg border ${getSeverityColor(alert.severity)}`}>
                          {alert.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {alert.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-lg ${getStatusColor(alert.status)}`}>
                          {alert.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {alert.value}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


