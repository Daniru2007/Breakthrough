import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface BackButtonProps {
  onClick: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="flex items-center text-[#2ECB46] mb-8 hover:text-[#25A83C] transition-colors"
  >
    <ArrowLeft className="w-5 h-5 mr-2" />
    Back to Tutorials
  </motion.button>
);