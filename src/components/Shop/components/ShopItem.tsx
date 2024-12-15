import React from 'react';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

interface ShopItemProps {
  name: string;
  description: string;
  price: number;
  icon: keyof typeof Icons;
  onPurchase: () => void;
}

export const ShopItem: React.FC<ShopItemProps> = ({
  name,
  description,
  price,
  icon,
  onPurchase,
}) => {
  const Icon = Icons[icon];

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between gap-4 border border-gray-100 relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#2ECB46]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="flex items-center gap-6 relative z-10">
        <motion.div
          whileHover={{ rotate: 12 }}
          className="w-16 h-16 rounded-2xl bg-[#2ECB46]/10 flex items-center justify-center transform transition-transform duration-300"
        >
          <Icon className="w-8 h-8 text-[#2ECB46]" />
        </motion.div>
        <div>
          <h3 className="font-bold text-lg text-gray-800 mb-1">{name}</h3>
          <p className="text-sm text-gray-600 leading-relaxed max-w-md">{description}</p>
        </div>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPurchase}
        className="px-6 py-3 bg-[#2ECB46] text-white rounded-xl font-semibold hover:bg-[#25B83C] transition-colors duration-300 flex items-center gap-2 shadow-lg hover:shadow-[#2ECB46]/20 relative z-10"
      >
        <Icons.Coins className="w-5 h-5" />
        <span>{price}</span>
      </motion.button>
    </motion.div>
  );
}