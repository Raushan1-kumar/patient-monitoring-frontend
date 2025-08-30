import { useState } from "react";
import { motion } from "motion/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Sidebar from "../pages/component/SideBar";
import Header from "../pages/component/Header";
import { 
  Heart, 
  Droplets, 
  Thermometer, 
  Gauge, 
  AlertTriangle, 
  Save, 
  Edit,
  Calendar,
  MapPin,
  User,
  Clock
} from "lucide-react";

const patientData = {
  id: 1,
  name: "Sarah Johnson",
  age: 45,
  ward: "ICU-1",
  doctorAssigned: "Dr. Michael Chen",
  photo: "https://images.unsplash.com/photo-1494790108755-2616b612b550?w=150&h=150&fit=crop&crop=face",
  heartRate: 98,
  spo2: 97,
  bloodPressure: { systolic: 120, diastolic: 80 },
  temperature: 98.6,
  status: "stable",
  lastUpdated: "2 min ago",
  admissionDate: "2024-08-28",
  medicalHistory: ["Hypertension", "Diabetes Type 2"],
  allergies: ["Penicillin", "Latex"]
};

const vitalsHistory = {
  heartRate: [
    { time: '00:00', value: 98 },
    { time: '04:00', value: 92 },
    { time: '08:00', value: 105 },
    { time: '12:00', value: 98 },
    { time: '16:00', value: 94 },
    { time: '20:00', value: 96 },
    { time: '24:00', value: 98 },
  ],
  spo2: [
    { time: '00:00', value: 97 },
    { time: '04:00', value: 98 },
    { time: '08:00', value: 96 },
    { time: '12:00', value: 97 },
    { time: '16:00', value: 98 },
    { time: '20:00', value: 97 },
    { time: '24:00', value: 97 },
  ],
  temperature: [
    { time: '00:00', value: 98.6 },
    { time: '04:00', value: 98.4 },
    { time: '08:00', value: 99.1 },
    { time: '12:00', value: 98.8 },
    { time: '16:00', value: 98.5 },
    { time: '20:00', value: 98.6 },
    { time: '24:00', value: 98.6 },
  ],
  bloodPressure: [
    { time: '00:00', value: 120 },
    { time: '04:00', value: 118 },
    { time: '08:00', value: 125 },
    { time: '12:00', value: 122 },
    { time: '16:00', value: 119 },
    { time: '20:00', value: 121 },
    { time: '24:00', value: 120 },
  ]
};

const alerts = [
  {
    id: 1,
    type: "Heart Rate",
    message: "Heart rate elevated above normal range",
    severity: "warning",
    timestamp: "2024-08-30 14:32",
    resolved: false
  },
  {
    id: 2,
    type: "Blood Pressure",
    message: "Slight increase in systolic pressure",
    severity: "info",
    timestamp: "2024-08-30 12:15",
    resolved: true
  },
  {
    id: 3,
    type: "Temperature",
    message: "Temperature spike detected",
    severity: "critical",
    timestamp: "2024-08-30 08:20",
    resolved: true
  }
];

export default function ParticularPatientDetail({ params }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedVital, setSelectedVital] = useState("heartRate");
  const [doctorNotes, setDoctorNotes] = useState("Patient showing steady improvement. Vitals within acceptable ranges. Continue current medication regimen. Monitor for any signs of complications.");
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  const vitalOptions = [
    { key: "heartRate", label: "Heart Rate", color: "#EF4444", icon: Heart, unit: "BPM" },
    { key: "spo2", label: "SpO₂", color: "#3B82F6", icon: Droplets, unit: "%" },
    { key: "temperature", label: "Temperature", color: "#F59E0B", icon: Thermometer, unit: "°F" },
    { key: "bloodPressure", label: "Blood Pressure", color: "#8B5CF6", icon: Gauge, unit: "mmHg" },
  ];

  const currentVital = vitalOptions.find(v => v.key === selectedVital);

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

  const handleSaveNotes = () => {
    setIsEditingNotes(false);
    // Here you would typically save to backend
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
          title={`Patient: ${patientData.name}`}
        />

        <div className="flex-1 overflow-y-auto p-6">
          {/* Patient Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 p-6 mb-6 shadow-lg"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex items-center gap-4">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={patientData.photo}
                  alt={patientData.name}
                  className="w-20 h-20 rounded-2xl object-cover shadow-lg"
                />
                <div>
                  <h1 className="text-2xl font-bold text-blue-900 font-inter">{patientData.name}</h1>
                  <p className="text-blue-700 font-medium">Patient ID: {patientData.id}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-blue-600">
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      Age {patientData.age}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {patientData.ward}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      Admitted {patientData.admissionDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="md:ml-auto flex gap-6">
                <div className="text-center">
                  <p className="text-sm text-blue-600 font-medium">Assigned Doctor</p>
                  <p className="text-lg font-bold text-blue-900">{patientData.doctorAssigned}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-blue-600 font-medium">Status</p>
                  <span className={`px-4 py-2 rounded-xl text-sm font-bold capitalize ${
                    patientData.status === 'stable' ? 'bg-green-100 text-green-700' :
                    patientData.status === 'critical' ? 'bg-red-100 text-red-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {patientData.status}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Vitals Timeline - Takes 2/3 width */}
            <div className="xl:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg mb-6"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-6 font-inter">Vitals Timeline</h2>

                {/* Vital Type Selector */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {vitalOptions.map((vital) => {
                    const Icon = vital.icon;
                    const isSelected = selectedVital === vital.key;
                    
                    return (
                      <motion.button
                        key={vital.key}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedVital(vital.key)}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          isSelected
                            ? "border-blue-300 bg-blue-50"
                            : "border-gray-200 bg-gray-50 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon 
                            size={18} 
                            style={{ color: vital.color }}
                          />
                          <div className="text-left">
                            <p className={`text-sm font-medium ${
                              isSelected ? "text-blue-700" : "text-gray-700"
                            }`}>
                              {vital.label}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Chart */}
                <motion.div
                  key={selectedVital}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="h-80"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={vitalsHistory[selectedVital]}>
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
                        labelStyle={{ color: "#374151", fontWeight: "600" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={currentVital?.color}
                        strokeWidth={3}
                        dot={{
                          fill: currentVital?.color,
                          strokeWidth: 2,
                          stroke: "white",
                          r: 4,
                        }}
                        activeDot={{
                          r: 6,
                          stroke: currentVital?.color,
                          strokeWidth: 2,
                          fill: "white",
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>
              </motion.div>

              {/* Doctor's Notes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800 font-inter">Doctor's Notes</h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditingNotes(!isEditingNotes)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                  >
                    <Edit size={16} />
                    {isEditingNotes ? 'Cancel' : 'Edit'}
                  </motion.button>
                </div>

                {isEditingNotes ? (
                  <div>
                    <textarea
                      value={doctorNotes}
                      onChange={(e) => setDoctorNotes(e.target.value)}
                      className="w-full h-32 p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:border-blue-400 font-inter"
                      placeholder="Enter doctor's notes..."
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSaveNotes}
                      className="mt-3 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                    >
                      <Save size={16} />
                      Save Notes
                    </motion.button>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <p className="text-gray-700 leading-relaxed font-inter">{doctorNotes}</p>
                    <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                      <Clock size={14} />
                      <span>Last updated: {new Date().toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Alerts Panel - Takes 1/3 width */}
            <div className="xl:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-6 font-inter">Recent Alerts</h2>

                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl border ${getSeverityColor(alert.severity)} ${
                        alert.resolved ? 'opacity-60' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <AlertTriangle size={18} className="mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-sm">{alert.type}</h4>
                            <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                              alert.resolved ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {alert.resolved ? 'Resolved' : 'Active'}
                            </span>
                          </div>
                          <p className="text-sm mb-2">{alert.message}</p>
                          <p className="text-xs opacity-75">{alert.timestamp}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Medical History & Allergies */}
                <div className="mt-8 space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2 font-inter">Medical History</h3>
                    <div className="space-y-2">
                      {patientData.medicalHistory.map((condition, index) => (
                        <span
                          key={index}
                          className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm mr-2 mb-2"
                        >
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2 font-inter">Allergies</h3>
                    <div className="space-y-2">
                      {patientData.allergies.map((allergy, index) => (
                        <span
                          key={index}
                          className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm mr-2 mb-2"
                        >
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


