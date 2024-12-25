import React from 'react';
import { motion } from 'framer-motion';

export function Title() {
  return (
    <motion.h1 
      className="text-7xl font-bold text-center mb-24 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
    >
      Smart Learning Platform
    </motion.h1>
  );
}