import { useState } from "react";
import { motion } from "motion/react";
import Sidebar from "../pages/component/SideBar";
import Header from "../pages/component/Header";
import { 
  Search, 
  Filter, 
  Plus,
  Heart, 
  Droplets, 
  Thermometer, 
  Gauge,
  User,
  MapPin,
  Calendar,
  Clock,
  Phone,
  Mail,
  AlertTriangle,
  Eye,
  Edit,
  MoreVertical,
  Download,
  Upload,
  UserPlus,
  Activity,
  Stethoscope
} from "lucide-react";

const patientsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 45,
    gender: "Female",
    ward: "ICU-1",
    room: "101A",
    doctorAssigned: "Dr. Michael Chen",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b550?w=150&h=150&fit=crop&crop=face",
    heartRate: 98,
    spo2: 97,
    bloodPressure: { systolic: 120, diastolic: 80 },
    temperature: 98.6,
    status: "stable",
    lastUpdated: "2 min ago",
    admissionDate: "2024-08-28",
    condition: "Post-operative monitoring",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@email.com",
    emergencyContact: "John Johnson - Husband",
    emergencyPhone: "+1 (555) 123-4568",
    insurance: "Blue Cross Blue Shield",
    allergies: ["Penicillin", "Latex"],
    activeAlerts: 1
  },
  {
    id: 2,
    name: "Michael Chen",
    age: 62,
    gender: "Male",
    ward: "Ward-3A",
    room: "302B",
    doctorAssigned: "Dr. Sarah Williams",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    heartRate: 125,
    spo2: 89,
    bloodPressure: { systolic: 145, diastolic: 95 },
    temperature: 99.2,
    status: "critical",
    lastUpdated: "1 min ago",
    admissionDate: "2024-08-25",
    condition: "Cardiac monitoring",
    phone: "+1 (555) 234-5678",
    email: "m.chen@email.com",
    emergencyContact: "Lisa Chen - Wife",
    emergencyPhone: "+1 (555) 234-5679",
    insurance: "Medicare",
    allergies: ["Aspirin"],
    activeAlerts: 3
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    age: 34,
    gender: "Female",
    ward: "Ward-2B",
    room: "205C",
    doctorAssigned: "Dr. James Wilson",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    heartRate: 78,
    spo2: 98,
    bloodPressure: { systolic: 115, diastolic: 75 },
    temperature: 98.1,
    status: "stable",
    lastUpdated: "5 min ago",
    admissionDate: "2024-08-29",
    condition: "Routine checkup",
    phone: "+1 (555) 345-6789",
    email: "emily.rodriguez@email.com",
    emergencyContact: "Carlos Rodriguez - Brother",
    emergencyPhone: "+1 (555) 345-6790",
    insurance: "Aetna",
    allergies: ["None known"],
    activeAlerts: 0
  },
  {
    id: 4,
    name: "David Thompson",
    age: 58,
    gender: "Male",
    ward: "ICU-2",
    room: "102A",
    doctorAssigned: "Dr. Michael Chen",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    heartRate: 102,
    spo2: 94,
    bloodPressure: { systolic: 130, diastolic: 85 },
    temperature: 97.8,
    status: "monitoring",
    lastUpdated: "3 min ago",
    admissionDate: "2024-08-27",
    condition: "Respiratory observation",
    phone: "+1 (555) 456-7890",
    email: "david.thompson@email.com",
    emergencyContact: "Mary Thompson - Wife",
    emergencyPhone: "+1 (555) 456-7891",
    insurance: "United Healthcare",
    allergies: ["Shellfish"],
    activeAlerts: 1
  },
  {
    id: 5,
    name: "Lisa Park",
    age: 29,
    gender: "Female",
    ward: "Ward-1A",
    room: "108B",
    doctorAssigned: "Dr. Sarah Williams",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    heartRate: 72,
    spo2: 99,
    bloodPressure: { systolic: 110, diastolic: 70 },
    temperature: 98.4,
    status: "stable",
    lastUpdated: "7 min ago",
    admissionDate: "2024-08-30",
    condition: "Maternity care",
    phone: "+1 (555) 567-8901",
    email: "lisa.park@email.com",
    emergencyContact: "Kevin Park - Husband",
    emergencyPhone: "+1 (555) 567-8902",
    insurance: "Cigna",
    allergies: ["None known"],
    activeAlerts: 0
  },
  {
    id: 6,
    name: "Robert Wilson",
    age: 71,
    gender: "Male",
    ward: "ICU-3",
    room: "103C",
    doctorAssigned: "Dr. James Wilson",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    heartRate: 88,
    spo2: 91,
    bloodPressure: { systolic: 140, diastolic: 90 },
    temperature: 99.1,
    status: "monitoring",
    lastUpdated: "4 min ago",
    admissionDate: "2024-08-26",
    condition: "Geriatric care",
    phone: "+1 (555) 678-9012",
    email: "robert.wilson@email.com",
    emergencyContact: "Susan Wilson - Daughter",
    emergencyPhone: "+1 (555) 678-9013",
    insurance: "Medicare",
    allergies: ["Penicillin", "Iodine"],
    activeAlerts: 2
  }
];

export default function Patients() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWard, setSelectedWard] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDoctor, setSelectedDoctor] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [selectedPatient, setSelectedPatient] = useState(null);

  const wards = ["all", "ICU-1", "ICU-2", "ICU-3", "Ward-1A", "Ward-2B", "Ward-3A"];
  const statuses = ["all", "stable", "monitoring", "critical"];
  const doctors = ["all", "Dr. Michael Chen", "Dr. Sarah Williams", "Dr. James Wilson"];

  const filteredPatients = patientsData.filter(patient => {
    const matchesSearch = searchTerm === "" || 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.ward.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.room.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesWard = selectedWard === "all" || patient.ward === selectedWard;
    const matchesStatus = selectedStatus === "all" || patient.status === selectedStatus;
    const matchesDoctor = selectedDoctor === "all" || patient.doctorAssigned === selectedDoctor;
    
    return matchesSearch && matchesWard && matchesStatus && matchesDoctor;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'stable':
        return 'bg-green-100 text-green-800';
      case 'monitoring':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'stable':
        return '✅';
      case 'monitoring':
        return '⚠️';
      case 'critical':
        return '🚨';
      default:
        return '❓';
    }
  };

  const handlePatientClick = (patient) => {
    window.location.href = `/patient/${patient.id}`;
  };

  const PatientCard = ({ patient, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => handlePatientClick(patient)}
      className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
    >
      <div className="flex items-start gap-4">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={patient.photo}
          alt={patient.name}
          className="w-16 h-16 rounded-2xl object-cover shadow-md"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-bold text-gray-800 font-inter group-hover:text-blue-600 transition-colors">
                {patient.name}
              </h3>
              <p className="text-sm text-gray-600">{patient.age} years • {patient.gender}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 text-xs font-semibold rounded-xl ${getStatusColor(patient.status)}`}>
                {getStatusIcon(patient.status)} {patient.status.toUpperCase()}
              </span>
              {patient.activeAlerts > 0 && (
                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-lg flex items-center gap-1">
                  <AlertTriangle size={12} />
                  {patient.activeAlerts}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={14} />
              <span>{patient.ward} • {patient.room}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Stethoscope size={14} />
              <span>{patient.doctorAssigned}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={14} />
              <span>Admitted {patient.admissionDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock size={14} />
              <span>Updated {patient.lastUpdated}</span>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-700 font-medium">{patient.condition}</p>
          </div>

          {/* Vitals */}
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Heart size={14} className="text-red-500" />
                <span className="text-xs text-gray-500">HR</span>
              </div>
              <p className="text-sm font-bold text-gray-800">{patient.heartRate}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Droplets size={14} className="text-blue-500" />
                <span className="text-xs text-gray-500">SpO₂</span>
              </div>
              <p className="text-sm font-bold text-gray-800">{patient.spo2}%</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Gauge size={14} className="text-purple-500" />
                <span className="text-xs text-gray-500">BP</span>
              </div>
              <p className="text-sm font-bold text-gray-800">{patient.bloodPressure.systolic}/{patient.bloodPressure.diastolic}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Thermometer size={14} className="text-orange-500" />
                <span className="text-xs text-gray-500">Temp</span>
              </div>
              <p className="text-sm font-bold text-gray-800">{patient.temperature}°F</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const PatientListItem = ({ patient, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02 }}
      onClick={() => handlePatientClick(patient)}
      className="bg-white border border-gray-200 p-4 hover:bg-gray-50 transition-colors cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <img
          src={patient.photo}
          alt={patient.name}
          className="w-12 h-12 rounded-xl object-cover"
        />
        
        <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
          <div>
            <h4 className="font-semibold text-gray-800 font-inter">{patient.name}</h4>
            <p className="text-sm text-gray-600">{patient.age}y • {patient.gender}</p>
          </div>
          
          <div className="text-sm text-gray-600">
            <p className="font-medium">{patient.ward}</p>
            <p>{patient.room}</p>
          </div>
          
          <div className="text-sm text-gray-600">
            <p className="font-medium">{patient.doctorAssigned}</p>
            <p>{patient.condition}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 text-xs font-semibold rounded-lg ${getStatusColor(patient.status)}`}>
              {patient.status.toUpperCase()}
            </span>
            {patient.activeAlerts > 0 && (
              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-lg">
                {patient.activeAlerts} alerts
              </span>
            )}
          </div>
          
          <div className="text-sm text-gray-600">
            <p>{patient.heartRate} BPM</p>
            <p>{patient.spo2}% SpO₂</p>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                handlePatientClick(patient);
              }}
              className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <Eye size={16} className="text-blue-500" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <MoreVertical size={16} className="text-gray-400" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );

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
          title="Patient Management"
        />

        <div className="flex-1 overflow-y-auto p-6">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 font-inter">Patient Directory</h1>
              <p className="text-gray-600">Manage and monitor all patients in the facility</p>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
              >
                <UserPlus size={16} />
                Add Patient
              </motion.button>
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

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            {[
              { label: "Total Patients", value: patientsData.length, color: "bg-blue-500", icon: User },
              { label: "Stable", value: patientsData.filter(p => p.status === "stable").length, color: "bg-green-500", icon: Activity },
              { label: "Monitoring", value: patientsData.filter(p => p.status === "monitoring").length, color: "bg-orange-500", icon: Eye },
              { label: "Critical", value: patientsData.filter(p => p.status === "critical").length, color: "bg-red-500", icon: AlertTriangle }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
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
                      <Icon size={20} className="text-white" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg mb-6"
          >
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search patients, conditions, wards, or rooms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-400 transition-colors font-inter"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-3">
                <select
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-400 transition-colors font-inter"
                >
                  {wards.map(ward => (
                    <option key={ward} value={ward}>
                      {ward === "all" ? "All Wards" : ward}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-400 transition-colors font-inter"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-400 transition-colors font-inter"
                >
                  {doctors.map(doctor => (
                    <option key={doctor} value={doctor}>
                      {doctor === "all" ? "All Doctors" : doctor}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {filteredPatients.length} of {patientsData.length} patients
              </p>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">View:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      viewMode === "grid" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600"
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      viewMode === "list" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600"
                    }`}
                  >
                    List
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Patients Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPatients.map((patient, index) => (
                  <PatientCard key={patient.id} patient={patient} index={index} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800 font-inter">
                    Patient List ({filteredPatients.length})
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {filteredPatients.map((patient, index) => (
                    <PatientListItem key={patient.id} patient={patient} index={index} />
                  ))}
                </div>
              </div>
            )}

            {filteredPatients.length === 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-12 text-center">
                <User size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No patients found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}


