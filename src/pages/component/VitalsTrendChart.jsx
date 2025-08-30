import { useState } from "react";
import { motion } from "motion/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Calendar, Heart, Droplets, Thermometer, Gauge } from "lucide-react";

const dummyData = [
  { time: '00:00', heartRate: 72, spo2: 98, temperature: 98.2, systolic: 120 },
  { time: '02:00', heartRate: 68, spo2: 97, temperature: 98.1, systolic: 118 },
  { time: '04:00', heartRate: 70, spo2: 96, temperature: 98.3, systolic: 122 },
  { time: '06:00', heartRate: 75, spo2: 98, temperature: 98.4, systolic: 125 },
  { time: '08:00', heartRate: 82, spo2: 97, temperature: 98.6, systolic: 128 },
  { time: '10:00', heartRate: 88, spo2: 96, temperature: 98.5, systolic: 130 },
  { time: '12:00', heartRate: 92, spo2: 95, temperature: 98.8, systolic: 135 },
  { time: '14:00', heartRate: 89, spo2: 97, temperature: 98.7, systolic: 132 },
  { time: '16:00', heartRate: 85, spo2: 98, temperature: 98.6, systolic: 128 },
  { time: '18:00', heartRate: 80, spo2: 97, temperature: 98.4, systolic: 125 },
  { time: '20:00', heartRate: 76, spo2: 98, temperature: 98.3, systolic: 122 },
  { time: '22:00', heartRate: 74, spo2: 97, temperature: 98.2, systolic: 120 },
];

export default function VitalsTrendChart() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h");
  const [selectedVital, setSelectedVital] = useState("heartRate");

  const vitalOptions = [
    { key: "heartRate", label: "Heart Rate", color: "#EF4444", icon: Heart, unit: "BPM" },
    { key: "spo2", label: "SpO₂", color: "#3B82F6", icon: Droplets, unit: "%" },
    { key: "temperature", label: "Temperature", color: "#F59E0B", icon: Thermometer, unit: "°F" },
    { key: "systolic", label: "Blood Pressure", color: "#8B5CF6", icon: Gauge, unit: "mmHg" },
  ];

  const timeRanges = ["6h", "12h", "24h", "7d"];

  const currentVital = vitalOptions.find(v => v.key === selectedVital);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <TrendingUp size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 font-inter">Vitals Trend</h2>
            <p className="text-sm text-gray-500">Last 24 hours overview</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Time Range Selector */}
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
        </div>
      </div>

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
              className={`p-4 rounded-xl border-2 transition-all ${
                isSelected
                  ? "border-blue-300 bg-blue-50"
                  : "border-gray-200 bg-gray-50 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon 
                  size={20} 
                  style={{ color: vital.color }}
                />
                <div className="text-left">
                  <p className={`text-sm font-medium ${
                    isSelected ? "text-blue-700" : "text-gray-700"
                  }`}>
                    {vital.label}
                  </p>
                  <p className="text-xs text-gray-500">{vital.unit}</p>
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
          <LineChart data={dummyData}>
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
              dataKey={selectedVital}
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

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600 font-inter">
            {Math.min(...dummyData.map(d => d[selectedVital]))}
          </p>
          <p className="text-sm text-gray-500">Minimum</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600 font-inter">
            {Math.round(dummyData.reduce((acc, d) => acc + d[selectedVital], 0) / dummyData.length)}
          </p>
          <p className="text-sm text-gray-500">Average</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-red-600 font-inter">
            {Math.max(...dummyData.map(d => d[selectedVital]))}
          </p>
          <p className="text-sm text-gray-500">Maximum</p>
        </div>
      </div>
    </motion.div>
  );
}


