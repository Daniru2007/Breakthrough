import React from 'react';
import { motion } from 'framer-motion';

interface FeatureBoxProps {
  title: string;
  description: string;
  buttonText: string;
  delay?: number;
}

export function FeatureBox({ title, description, buttonText, delay = 0 }: FeatureBoxProps) {
  return (
    <motion.div
      className="feature-box"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 100, delay }}
    >
      <div className="feature-content">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-500 to-green-300 bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-xl mb-8 text-gray-600 leading-relaxed">
          {description}
        </p>
        <motion.button
          className="feature-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {buttonText}
        </motion.button>
      </div>
    </motion.div>
  );
}