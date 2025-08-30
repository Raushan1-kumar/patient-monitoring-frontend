import { useState } from "react";
import { motion } from "motion/react";
import Sidebar from "../components/healthcare/Sidebar";
import Header from "../components/healthcare/Header";
import PatientCard from "../components/healthcare/PatientCard";
import VitalsTrendChart from "../components/healthcare/VitalsTrendChart";

const dummyPatients = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 45,
    ward: "ICU-1",
    heartRate: 98,
    spo2: 97,
    bloodPressure: { systolic: 120, diastolic: 80 },
    temperature: 98.6,
    status: "stable",
    lastUpdated: "2 min ago"
  },
  {
    id: 2,
    name: "Michael Chen",
    age: 62,
    ward: "Ward-3A",
    heartRate: 125,
    spo2: 89,
    bloodPressure: { systolic: 145, diastolic: 95 },
    temperature: 99.2,
    status: "critical",
    lastUpdated: "1 min ago"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    age: 34,
    ward: "Ward-2B",
    heartRate: 78,
    spo2: 98,
    bloodPressure: { systolic: 115, diastolic: 75 },
    temperature: 98.1,
    status: "stable",
    lastUpdated: "5 min ago"
  },
  {
    id: 4,
    name: "David Thompson",
    age: 58,
    ward: "ICU-2",
    heartRate: 102,
    spo2: 94,
    bloodPressure: { systolic: 130, diastolic: 85 },
    temperature: 97.8,
    status: "monitoring",
    lastUpdated: "3 min ago"
  },
  {
    id: 5,
    name: "Lisa Park",
    age: 29,
    ward: "Ward-1A",
    heartRate: 72,
    spo2: 99,
    bloodPressure: { systolic: 110, diastolic: 70 },
    temperature: 98.4,
    status: "stable",
    lastUpdated: "7 min ago"
  },
  {
    id: 6,
    name: "Robert Wilson",
    age: 71,
    ward: "ICU-3",
    heartRate: 88,
    spo2: 91,
    bloodPressure: { systolic: 140, diastolic: 90 },
    temperature: 99.1,
    status: "monitoring",
    lastUpdated: "4 min ago"
  }
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handlePatientClick = (patient) => {
    window.location.href = `/patient/${patient.id}`;
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
          title="Patient Dashboard"
        />

        <div className="flex-1 overflow-y-auto p-6">
          {/* Dashboard Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Total Patients</p>
                  <p className="text-3xl font-bold text-blue-900">{dummyPatients.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">👥</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Stable</p>
                  <p className="text-3xl font-bold text-green-900">
                    {dummyPatients.filter(p => p.status === 'stable').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">✅</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-sm font-medium">Monitoring</p>
                  <p className="text-3xl font-bold text-orange-900">
                    {dummyPatients.filter(p => p.status === 'monitoring').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">⚠️</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-2xl border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 text-sm font-medium">Critical</p>
                  <p className="text-3xl font-bold text-red-900">
                    {dummyPatients.filter(p => p.status === 'critical').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">🚨</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Patient Cards Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-inter">Active Patients</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {dummyPatients.map((patient, index) => (
                <motion.div
                  key={patient.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handlePatientClick(patient)}
                  className="cursor-pointer"
                >
                  <PatientCard patient={patient} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Vitals Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <VitalsTrendChart />
          </motion.div>
        </div>
      </div>
    </div>
  );
}


