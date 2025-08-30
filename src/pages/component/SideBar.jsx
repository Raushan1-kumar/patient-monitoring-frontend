import { useState } from "react";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  BarChart3,
  Settings,
  Heart,
  Activity,
  AlertTriangle,
  ChevronDown,
  Stethoscope,
} from "lucide-react";

export default function Sidebar({ onClose }) {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleSubmenu = (item) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const handleItemClick = (itemName, hasSubmenu, href) => {
    setActiveItem(itemName);
    if (hasSubmenu) {
      toggleSubmenu(itemName);
    } else if (href) {
      window.location.href = href;
    }
    // Close sidebar on mobile when item is clicked
    if (onClose && typeof window !== "undefined" && window.innerWidth < 1024) {
      onClose();
    }
  };

  const navigationItems = [
    { name: "Dashboard", icon: LayoutDashboard, hasSubmenu: false, href: "/" },
    { name: "Patients", icon: Users, hasSubmenu: false, href: "/patients" },
    {
      name: "Patient Detail",
      icon: UserCheck,
      hasSubmenu: false,
      href: "/patient/1",
    },
    {
      name: "Analytics",
      icon: BarChart3,
      hasSubmenu: false,
      href: "/analytics",
    },
    { name: "Alerts", icon: AlertTriangle, hasSubmenu: false, href: "/alerts" },
    { name: "Settings", icon: Settings, hasSubmenu: false, href: "/settings" },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-blue-50 to-blue-100 flex-shrink-0 flex flex-col h-full border-r border-blue-200">
      {/* Brand Logo */}
      <div className="p-6 flex items-center gap-3">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg"
        >
          <Stethoscope size={24} className="text-white" />
        </motion.div>
        <div>
          <h1 className="font-bold text-xl text-blue-900 font-inter">
            MedDash
          </h1>
          <p className="text-blue-600 text-sm">Healthcare Portal</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name;
            const isExpanded = expandedMenus[item.name];

            return (
              <div key={item.name}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    handleItemClick(item.name, item.hasSubmenu, item.href)
                  }
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-white shadow-md border border-blue-200 text-blue-700"
                      : "text-blue-700 hover:bg-white/50 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={20}
                      className={isActive ? "text-blue-600" : "text-blue-500"}
                    />
                    <span
                      className={`font-medium text-sm font-inter ${
                        isActive ? "text-blue-900" : "text-blue-700"
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                  {item.hasSubmenu && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      } ${isActive ? "text-blue-600" : "text-blue-500"}`}
                    />
                  )}
                </motion.button>
              </div>
            );
          })}
        </div>
      </nav>

      {/* Quick Stats */}
      <div className="p-4">
        <div className="bg-white rounded-xl p-4 border border-blue-200 shadow-sm">
          <h3 className="font-semibold text-blue-900 text-sm mb-3 font-inter">
            Quick Stats
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart size={16} className="text-red-500" />
                <span className="text-xs text-gray-600">Active Alerts</span>
              </div>
              <span className="text-sm font-bold text-red-600">3</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-green-500" />
                <span className="text-xs text-gray-600">Stable Patients</span>
              </div>
              <span className="text-sm font-bold text-green-600">24</span>
            </div>
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => (window.location.href = "/login")}
            className="w-full mt-4 px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            Login / Demo
          </motion.button>
        </div>
      </div>
    </div>
  );
}



