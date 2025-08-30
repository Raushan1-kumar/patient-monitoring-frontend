import { motion } from "motion/react";
import { Heart, Droplets, Gauge, Thermometer, Clock } from "lucide-react";

export default function PatientCard({ patient }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'critical':
        return 'border-red-200 bg-gradient-to-br from-red-50 to-red-100';
      case 'monitoring':
        return 'border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100';
      case 'stable':
        return 'border-green-200 bg-gradient-to-br from-green-50 to-green-100';
      default:
        return 'border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100';
    }
  };

  const getVitalStatus = (vital, type) => {
    switch (type) {
      case 'heartRate':
        if (vital > 120) return 'text-red-600';
        if (vital > 100) return 'text-orange-600';
        return 'text-green-600';
      case 'spo2':
        if (vital < 92) return 'text-red-600';
        if (vital < 95) return 'text-orange-600';
        return 'text-green-600';
      case 'temperature':
        if (vital > 99.5) return 'text-red-600';
        if (vital > 98.8) return 'text-orange-600';
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const isPulsingHeart = patient.heartRate > 120;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`p-6 rounded-2xl border-2 ${getStatusColor(patient.status)} shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
    >
      {/* Patient Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
            {patient.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800 font-inter">{patient.name}</h3>
            <p className="text-sm text-gray-600">Age {patient.age} • {patient.ward}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock size={12} />
          <span>{patient.lastUpdated}</span>
        </div>
      </div>

      {/* Vitals Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Heart Rate */}
        <motion.div 
          className="bg-white rounded-xl p-4 border border-gray-200"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <motion.div
              animate={isPulsingHeart ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart 
                size={20} 
                className={`${getVitalStatus(patient.heartRate, 'heartRate')} ${isPulsingHeart ? 'fill-current' : ''}`} 
              />
            </motion.div>
            <span className="text-xs text-gray-500 font-medium">BPM</span>
          </div>
          <p className={`text-2xl font-bold ${getVitalStatus(patient.heartRate, 'heartRate')} font-inter`}>
            {patient.heartRate}
          </p>
        </motion.div>

        {/* SpO2 */}
        <motion.div 
          className="bg-white rounded-xl p-4 border border-gray-200"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <Droplets size={20} className={getVitalStatus(patient.spo2, 'spo2')} />
            <span className="text-xs text-gray-500 font-medium">SpO₂</span>
          </div>
          <p className={`text-2xl font-bold ${getVitalStatus(patient.spo2, 'spo2')} font-inter`}>
            {patient.spo2}%
          </p>
        </motion.div>

        {/* Blood Pressure */}
        <motion.div 
          className="bg-white rounded-xl p-4 border border-gray-200"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <Gauge size={20} className="text-purple-600" />
            <span className="text-xs text-gray-500 font-medium">BP</span>
          </div>
          <p className="text-lg font-bold text-purple-600 font-inter">
            {patient.bloodPressure.systolic}/{patient.bloodPressure.diastolic}
          </p>
        </motion.div>

        {/* Temperature */}
        <motion.div 
          className="bg-white rounded-xl p-4 border border-gray-200"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <Thermometer size={20} className={getVitalStatus(patient.temperature, 'temperature')} />
            <span className="text-xs text-gray-500 font-medium">°F</span>
          </div>
          <p className={`text-xl font-bold ${getVitalStatus(patient.temperature, 'temperature')} font-inter`}>
            {patient.temperature}
          </p>
        </motion.div>
      </div>

      {/* Status Badge */}
      <div className="mt-4 flex justify-between items-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
            patient.status === 'critical' ? 'bg-red-100 text-red-700 border border-red-200' :
            patient.status === 'monitoring' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
            'bg-green-100 text-green-700 border border-green-200'
          }`}
        >
          {patient.status}
        </motion.span>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors"
        >
          View Details →
        </motion.button>
      </div>
    </motion.div>
  );
}


