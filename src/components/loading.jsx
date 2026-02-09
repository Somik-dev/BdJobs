"use client";

import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <motion.div
        className="relative w-24 h-24"
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={{ scale: [1, 1.1, 1], rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
      >
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-transparent"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />

        {/* Inner ring */}
        <motion.div
          className="absolute inset-4 rounded-full border-4 border-t-red-400 border-transparent"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        />
      </motion.div>

      <motion.p
        className="text-gray-600 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default Loading;
