import { useState } from "react";
import { motion } from "motion/react";
import Sidebar from "../pages/component/SideBar";
import Header from "../pages/component/Header";
import { 
  AlertTriangle, 
  Heart, 
  Thermometer, 
  Droplets, 
  Gauge,
  Clock,
  User,
  Filter,
  Search,
  Bell,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  MoreVertical,
  RefreshCw
} from "lucide-react";

const alertsData = [
  {
    id: 1,
    patient: {
      name: "Sarah Johnson",
      id: "P001",
      ward: "ICU-1",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b550?w=50&h=50&fit=crop&crop=face"
    },
    type: "Heart Rate",
    severity: "critical",
    message: "Heart rate critically elevated at 145 BPM",
    value: "145 BPM",
    normalRange: "60-100 BPM",
    timestamp: "2024-08-30 14:32:15",
    status: "active",
    duration: "5 minutes",
    icon: Heart,
    color: "text-red-500"
  },
  {
    id: 2,
    patient: {
      name: "Michael Chen",
      id: "P002", 
      ward: "Ward-3A",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
    },
    type: "SpO₂",
    severity: "warning",
    message: "Oxygen saturation below normal range",
    value: "89%",
    normalRange: "95-100%",
    timestamp: "2024-08-30 14:28:42",
    status: "acknowledged",
    duration: "12 minutes",
    icon: Droplets,
    color: "text-blue-500"
  },
  {
    id: 3,
    patient: {
      name: "Emily Rodriguez",
      id: "P003",
      ward: "Ward-2B", 
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face"
    },
    type: "Blood Pressure",
    severity: "warning",
    message: "Systolic pressure elevated",
    value: "145/95 mmHg",
    normalRange: "120/80 mmHg",
    timestamp: "2024-08-30 14:15:23",
    status: "resolved",
    duration: "8 minutes",
    icon: Gauge,
    color: "text-purple-500"
  },
  {
    id: 4,
    patient: {
      name: "David Thompson",
      id: "P004",
      ward: "ICU-2",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
    },
    type: "Temperature",
    severity: "info",
    message: "Slight temperature elevation detected",
    value: "99.2°F",
    normalRange: "97.0-99.0°F",
    timestamp: "2024-08-30 14:10:18",
    status: "resolved",
    duration: "3 minutes",
    icon: Thermometer,
    color: "text-orange-500"
  },
  {
    id: 5,
    patient: {
      name: "Lisa Park",
      id: "P005",
      ward: "Ward-1A",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face"
    },
    type: "Heart Rate",
    severity: "warning",
    message: "Heart rate slightly elevated",
    value: "102 BPM",
    normalRange: "60-100 BPM",
    timestamp: "2024-08-30 13:55:07",
    status: "active",
    duration: "45 minutes",
    icon: Heart,
    color: "text-red-500"
  },
  {
    id: 6,
    patient: {
      name: "Robert Wilson",
      id: "P006",
      ward: "ICU-3",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=50&h=50&fit=crop&crop=face"
    },
    type: "SpO₂",
    severity: "critical",
    message: "Oxygen saturation critically low",
    value: "88%",
    normalRange: "95-100%",
    timestamp: "2024-08-30 13:45:33",
    status: "acknowledged",
    duration: "1 hour 2 minutes",
    icon: Droplets,
    color: "text-blue-500"
  }
];

export default function Alerts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAlert, setSelectedAlert] = useState(null);

  const severityOptions = [
    { value: "all", label: "All Severities", count: alertsData.length },
    { value: "critical", label: "Critical", count: alertsData.filter(a => a.severity === "critical").length },
    { value: "warning", label: "Warning", count: alertsData.filter(a => a.severity === "warning").length },
    { value: "info", label: "Info", count: alertsData.filter(a => a.severity === "info").length }
  ];

  const statusOptions = [
    { value: "all", label: "All Status", count: alertsData.length },
    { value: "active", label: "Active", count: alertsData.filter(a => a.status === "active").length },
    { value: "acknowledged", label: "Acknowledged", count: alertsData.filter(a => a.status === "acknowledged").length },
    { value: "resolved", label: "Resolved", count: alertsData.filter(a => a.status === "resolved").length }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
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
    switch (status) {
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <AlertCircle size={16} />;
      case 'acknowledged':
        return <Eye size={16} />;
      case 'resolved':
        return <CheckCircle size={16} />;
      default:
        return <XCircle size={16} />;
    }
  };

  const filteredAlerts = alertsData.filter(alert => {
    const matchesSeverity = selectedSeverity === "all" || alert.severity === selectedSeverity;
    const matchesStatus = selectedStatus === "all" || alert.status === selectedStatus;
    const matchesSearch = searchTerm === "" || 
      alert.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.patient.ward.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSeverity && matchesStatus && matchesSearch;
  });

  const handleAlertAction = (alertId, action) => {
    console.log(`${action} alert ${alertId}`);
    // Here you would typically update the alert status
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - alertTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
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
          title="Patient Alerts"
        />

        <div className="flex-1 overflow-y-auto p-6">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 font-inter">Alert Management</h1>
              <p className="text-gray-600">Monitor and manage patient alerts in real-time</p>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
              >
                <RefreshCw size={16} />
                Refresh
              </motion.button>
            </div>
          </div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            {[
              { label: "Total Alerts", value: alertsData.length, color: "bg-blue-500", change: "+3" },
              { label: "Critical", value: alertsData.filter(a => a.severity === "critical").length, color: "bg-red-500", change: "+1" },
              { label: "Active", value: alertsData.filter(a => a.status === "active").length, color: "bg-orange-500", change: "+2" },
              { label: "Resolved Today", value: alertsData.filter(a => a.status === "resolved").length, color: "bg-green-500", change: "+5" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-800 font-inter">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <Bell size={20} className="text-white" />
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-green-600 text-sm font-medium">{stat.change} from yesterday</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg mb-6"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search patients, alert types, or wards..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-400 transition-colors font-inter"
                />
              </div>

              {/* Severity Filter */}
              <div className="lg:w-48">
                <select
                  value={selectedSeverity}
                  onChange={(e) => setSelectedSeverity(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-400 transition-colors font-inter"
                >
                  {severityOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label} ({option.count})
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="lg:w-48">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-400 transition-colors font-inter"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label} ({option.count})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Alerts List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 font-inter">
                Active Alerts ({filteredAlerts.length})
              </h2>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredAlerts.map((alert, index) => {
                const Icon = alert.icon;
                
                return (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Alert Icon */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        alert.severity === 'critical' ? 'bg-red-100' :
                        alert.severity === 'warning' ? 'bg-orange-100' : 'bg-blue-100'
                      }`}>
                        <Icon size={20} className={alert.color} />
                      </div>

                      {/* Alert Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-gray-800 font-inter">{alert.type}</h3>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-lg border ${getSeverityColor(alert.severity)}`}>
                              {alert.severity.toUpperCase()}
                            </span>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-lg flex items-center gap-1 ${getStatusColor(alert.status)}`}>
                              {getStatusIcon(alert.status)}
                              {alert.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">{getTimeAgo(alert.timestamp)}</span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                              <MoreVertical size={16} className="text-gray-400" />
                            </motion.button>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-3">{alert.message}</p>

                        {/* Patient Info */}
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-2">
                            <img
                              src={alert.patient.photo}
                              alt={alert.patient.name}
                              className="w-8 h-8 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium text-gray-800 text-sm">{alert.patient.name}</p>
                              <p className="text-gray-500 text-xs">{alert.patient.ward} • {alert.patient.id}</p>
                            </div>
                          </div>
                        </div>

                        {/* Alert Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Current Value:</span>
                            <span className="ml-2 font-semibold text-gray-800">{alert.value}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Normal Range:</span>
                            <span className="ml-2 font-semibold text-gray-800">{alert.normalRange}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Duration:</span>
                            <span className="ml-2 font-semibold text-gray-800">{alert.duration}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        {alert.status === 'active' && (
                          <div className="flex items-center gap-3 mt-4">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleAlertAction(alert.id, 'acknowledge')}
                              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
                            >
                              Acknowledge
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleAlertAction(alert.id, 'resolve')}
                              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                            >
                              Resolve
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => window.location.href = `/patient/${alert.patient.id.slice(1)}`}
                              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                            >
                              View Patient
                            </motion.button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {filteredAlerts.length === 0 && (
              <div className="p-12 text-center">
                <AlertTriangle size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No alerts found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}


