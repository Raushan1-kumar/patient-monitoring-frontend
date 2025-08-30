import { useState } from "react";
import { motion } from "motion/react";
import { Search, Bell, Menu, User, MessageCircle } from "lucide-react";

export default function Header({ onMenuClick, title = "Dashboard" }) {
  const [searchValue, setSearchValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [notifications] = useState(3); // Mock notification count

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 flex-shrink-0 shadow-sm">
      {/* Left side - Mobile menu button and title */}
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg transition-all duration-150 hover:bg-gray-100 active:bg-gray-200"
        >
          <Menu size={20} className="text-gray-600" />
        </motion.button>

        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight font-inter">
            {title}
          </h1>
          <p className="text-sm text-gray-500 hidden md:block">
            Welcome back, Dr. Johnson
          </p>
        </div>
      </div>

      {/* Right side - Search, notifications and profile */}
      <div className="flex items-center space-x-3 md:space-x-4">
        {/* Search field */}
        <div className="relative hidden md:block">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            placeholder="Search patients..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className={`w-[250px] h-10 pl-10 pr-4 rounded-xl bg-gray-50 border transition-all duration-200 font-inter text-sm text-gray-700 placeholder-gray-500 ${
              isSearchFocused
                ? "border-blue-400 bg-white shadow-sm"
                : "border-gray-200 hover:border-gray-300"
            }`}
          />
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>

        {/* Mobile search button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="md:hidden w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center transition-all duration-150 hover:bg-gray-100"
        >
          <Search size={18} className="text-gray-600" />
        </motion.button>

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center transition-all duration-150 hover:bg-gray-100"
        >
          <Bell size={18} className="text-gray-600" />
          {notifications > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
            >
              {notifications}
            </motion.span>
          )}
        </motion.button>

        {/* Messages */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden sm:flex w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 items-center justify-center transition-all duration-150 hover:bg-gray-100"
        >
          <MessageCircle size={18} className="text-gray-600" />
        </motion.button>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face"
              alt="Dr. Johnson"
              className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-sm"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
          </motion.div>
          
          <div className="hidden lg:block">
            <p className="text-sm font-semibold text-gray-800 font-inter">Dr. Johnson</p>
            <p className="text-xs text-gray-500">Cardiologist</p>
          </div>
        </div>
      </div>
    </div>
  );
}


