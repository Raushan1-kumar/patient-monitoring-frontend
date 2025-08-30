import { useState } from "react";
import { motion } from "motion/react";
import Sidebar from "../pages/component/SideBar";
import Header from "../pages/component/Header";
import { 
  User, 
  Mail, 
  Lock, 
  Camera, 
  Moon, 
  Sun, 
  Bell, 
  Heart, 
  Thermometer, 
  Droplets, 
  Gauge,
  Globe,
  Clock,
  Save,
  Upload
} from "lucide-react";

export default function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@hospital.com",
    phone: "+1 (555) 123-4567",
    department: "Cardiology",
    license: "MD123456789"
  });

  const [notifications, setNotifications] = useState({
    heartRate: true,
    bloodPressure: true,
    temperature: false,
    spo2: true,
    criticalAlerts: true,
    emailNotifications: true,
    smsNotifications: false
  });

  const [systemPreferences, setSystemPreferences] = useState({
    timezone: "America/New_York",
    refreshRate: "30",
    language: "English",
    dateFormat: "MM/DD/YYYY"
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const handleProfileUpdate = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationToggle = (setting) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSystemUpdate = (field, value) => {
    setSystemPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswords(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Here you would implement actual dark mode toggle
  };

  const timezones = [
    "America/New_York",
    "America/Chicago", 
    "America/Denver",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Asia/Tokyo"
  ];

  const refreshRates = [
    { value: "10", label: "10 seconds" },
    { value: "30", label: "30 seconds" },
    { value: "60", label: "1 minute" },
    { value: "300", label: "5 minutes" }
  ];

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
          title="Settings"
        />

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Profile Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white font-inter flex items-center gap-3">
                  <User size={24} />
                  Profile Settings
                </h2>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Profile Photo */}
                  <div className="lg:col-span-1">
                    <div className="text-center">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative inline-block"
                      >
                        <img
                          src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
                          alt="Profile"
                          className="w-32 h-32 rounded-2xl object-cover mx-auto shadow-lg"
                        />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute bottom-2 right-2 w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg hover:bg-blue-600 transition-colors"
                        >
                          <Camera size={16} />
                        </motion.button>
                      </motion.div>
                      <p className="text-sm text-gray-600 mt-3">
                        Click to upload new photo
                      </p>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => handleProfileUpdate('name', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-400 transition-colors font-inter"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleProfileUpdate('email', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-400 transition-colors font-inter"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-400 transition-colors font-inter"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                        <input
                          type="text"
                          value={profileData.department}
                          onChange={(e) => handleProfileUpdate('department', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-400 transition-colors font-inter"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Medical License</label>
                      <input
                        type="text"
                        value={profileData.license}
                        onChange={(e) => handleProfileUpdate('license', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-400 transition-colors font-inter"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Theme Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white font-inter flex items-center gap-3">
                  <Moon size={24} />
                  Theme Settings
                </h2>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      darkMode ? 'bg-gray-800' : 'bg-yellow-100'
                    }`}>
                      {darkMode ? <Moon size={24} className="text-white" /> : <Sun size={24} className="text-yellow-600" />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 font-inter">Dark Mode</h3>
                      <p className="text-sm text-gray-600">Switch between light and dark themes</p>
                    </div>
                  </div>
                  
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleDarkMode}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      darkMode ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <motion.span
                      layout
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        darkMode ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Notification Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white font-inter flex items-center gap-3">
                  <Bell size={24} />
                  Notification Settings
                </h2>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  <h3 className="font-semibold text-gray-800 font-inter">Vital Signs Alerts</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { key: 'heartRate', label: 'Heart Rate Alerts', icon: Heart, color: 'text-red-500' },
                      { key: 'bloodPressure', label: 'Blood Pressure Alerts', icon: Gauge, color: 'text-purple-500' },
                      { key: 'temperature', label: 'Temperature Alerts', icon: Thermometer, color: 'text-orange-500' },
                      { key: 'spo2', label: 'SpO₂ Alerts', icon: Droplets, color: 'text-blue-500' }
                    ].map((alert) => {
                      const Icon = alert.icon;
                      return (
                        <div key={alert.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <Icon size={20} className={alert.color} />
                            <span className="font-medium text-gray-800">{alert.label}</span>
                          </div>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleNotificationToggle(alert.key)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              notifications[alert.key] ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                          >
                            <motion.span
                              layout
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                notifications[alert.key] ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </motion.button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-semibold text-gray-800 font-inter mb-4">General Notifications</h3>
                    <div className="space-y-4">
                      {[
                        { key: 'criticalAlerts', label: 'Critical Patient Alerts' },
                        { key: 'emailNotifications', label: 'Email Notifications' },
                        { key: 'smsNotifications', label: 'SMS Notifications' }
                      ].map((setting) => (
                        <div key={setting.key} className="flex items-center justify-between">
                          <span className="font-medium text-gray-800">{setting.label}</span>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleNotificationToggle(setting.key)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              notifications[setting.key] ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                          >
                            <motion.span
                              layout
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                notifications[setting.key] ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </motion.button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* System Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white font-inter flex items-center gap-3">
                  <Globe size={24} />
                  System Preferences
                </h2>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                    <select
                      value={systemPreferences.timezone}
                      onChange={(e) => handleSystemUpdate('timezone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-400 transition-colors font-inter"
                    >
                      {timezones.map((tz) => (
                        <option key={tz} value={tz}>{tz}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Data Refresh Rate</label>
                    <select
                      value={systemPreferences.refreshRate}
                      onChange={(e) => handleSystemUpdate('refreshRate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-400 transition-colors font-inter"
                    >
                      {refreshRates.map((rate) => (
                        <option key={rate.value} value={rate.value}>{rate.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <select
                      value={systemPreferences.language}
                      onChange={(e) => handleSystemUpdate('language', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-400 transition-colors font-inter"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                    <select
                      value={systemPreferences.dateFormat}
                      onChange={(e) => handleSystemUpdate('dateFormat', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-400 transition-colors font-inter"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Password Change */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white font-inter flex items-center gap-3">
                  <Lock size={24} />
                  Change Password
                </h2>
              </div>

              <div className="p-6">
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <input
                      type="password"
                      value={passwords.current}
                      onChange={(e) => handlePasswordChange('current', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-400 transition-colors font-inter"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <input
                      type="password"
                      value={passwords.new}
                      onChange={(e) => handlePasswordChange('new', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-400 transition-colors font-inter"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      value={passwords.confirm}
                      onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-400 transition-colors font-inter"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium"
                  >
                    <Lock size={16} />
                    Update Password
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Save Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-end"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-8 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-semibold text-lg shadow-lg"
              >
                <Save size={20} />
                Save All Changes
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}


