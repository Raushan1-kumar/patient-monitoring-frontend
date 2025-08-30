import { motion } from "motion/react";
import { Home, ArrowLeft, Search, Stethoscope } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Animated Medical Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center relative"
          >
            <Stethoscope size={48} className="text-blue-600" />
            
            {/* Floating medical symbols */}
            <motion.div
              animate={{ 
                y: [-10, 10, -10],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-4 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center"
            >
              <span className="text-red-500 text-xl">+</span>
            </motion.div>
            
            <motion.div
              animate={{ 
                y: [10, -10, 10],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute -bottom-2 -left-4 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center"
            >
              <span className="text-green-500 text-sm">♥</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* 404 Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold text-gray-800 mb-4 font-inter">404</h1>
          <h2 className="text-2xl font-bold text-gray-700 mb-3 font-inter">
            Patient Not Found
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            The page you're looking for seems to have been discharged from our system. 
            Let's get you back to the right ward.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="space-y-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/'}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center gap-3"
          >
            <Home size={20} />
            Return to Dashboard
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="w-full bg-white text-gray-700 py-4 px-6 rounded-xl font-semibold shadow-lg border border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
          >
            <ArrowLeft size={20} />
            Go Back
          </motion.button>
        </motion.div>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 text-sm text-gray-500"
        >
          <p>Need help? Contact your system administrator or</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors inline-flex items-center gap-1 mt-1"
          >
            <Search size={14} />
            Search the knowledge base
          </motion.button>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-blue-100 rounded-full opacity-20 blur-xl" />
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-green-100 rounded-full opacity-20 blur-xl" />
        <div className="absolute top-1/2 right-10 w-12 h-12 bg-red-100 rounded-full opacity-20 blur-xl" />
      </div>
    </div>
  );
}


