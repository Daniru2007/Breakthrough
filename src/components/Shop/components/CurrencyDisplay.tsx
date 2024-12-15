import React from 'react';
import { Coins } from 'lucide-react';
import { motion } from 'framer-motion';

interface CurrencyDisplayProps {
  amount: number;
}

export const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({ amount }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl px-6 py-3 shadow-lg flex items-center gap-3 border border-gray-100 backdrop-blur-sm bg-white/80"
    >
      <div className="w-10 h-10 rounded-xl bg-[#2ECB46]/10 flex items-center justify-center">
        <Coins className="w-6 h-6 text-[#2ECB46]" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-gray-600">Balance</span>
        <span className="font-bold text-lg text-gray-800">{amount}</span>
      </div>
    </motion.div>
  );
}