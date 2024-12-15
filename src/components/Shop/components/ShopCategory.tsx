import React from 'react';
import { motion } from 'framer-motion';
import { ShopItem } from './ShopItem';

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  icon: any;
}

interface ShopCategoryProps {
  name: string;
  items: Item[];
  onPurchase: (itemId: number) => void;
}

export const ShopCategory: React.FC<ShopCategoryProps> = ({
  name,
  items,
  onPurchase,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-[#2ECB46] rounded-full" />
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
      </div>
      <motion.div 
        className="space-y-4"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="hidden"
        animate="show"
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            variants={{
              hidden: { opacity: 0, x: -20 },
              show: { opacity: 1, x: 0 }
            }}
          >
            <ShopItem {...item} onPurchase={() => onPurchase(item.id)} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}