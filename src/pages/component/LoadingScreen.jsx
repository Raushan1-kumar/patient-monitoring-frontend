import { motion } from "motion/react";
import { Heart, Activity, Droplets, Stethoscope } from "lucide-react";

export default function LoadingScreen({ message = "Loading patient data..." }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Medical Icons */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Central Circle */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 border-4 border-blue-200 rounded-full relative"
          >
            {/* Animated Border */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full"
            />
          </motion.div>

          {/* Center Icon */}
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Stethoscope size={32} className="text-blue-600" />
          </motion.div>

          {/* Floating Icons */}
          <motion.div
            animate={{ 
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-4 -right-4 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center"
          >
            <Heart size={20} className="text-red-500" />
          </motion.div>

          <motion.div
            animate={{ 
              y: [20, -20, 20],
              x: [10, -10, 10],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute -bottom-4 -left-4 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"
          >
            <Activity size={20} className="text-green-500" />
          </motion.div>

          <motion.div
            animate={{ 
              y: [10, -10, 10],
              x: [-5, 5, -5],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute top-0 -right-8 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"
          >
            <Droplets size={16} className="text-blue-500" />
          </motion.div>
        </div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.h2
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-2xl font-bold text-gray-800 mb-2 font-inter"
          >
            {message}
          </motion.h2>
          
          {/* Animated Dots */}
          <div className="flex items-center justify-center gap-1">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
                className="w-2 h-2 bg-blue-500 rounded-full"
              />
            ))}
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-64 h-2 bg-gray-200 rounded-full mx-auto mt-8 overflow-hidden"
        >
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="h-full w-1/3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
          />
        </motion.div>

        {/* Status Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-gray-600 mt-4 text-sm"
        >
          Syncing with hospital systems...
        </motion.p>
      </div>
    </div>
  );
}


