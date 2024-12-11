import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  icon: LucideIcon;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant, icon: Icon, children }) => {
  const baseClasses = "group relative w-full py-3 px-4 rounded-xl font-semibold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden";
  const variants = {
    primary: "bg-gradient-to-r from-[#2ECB46] to-[#25A939] text-white hover:shadow-xl hover:shadow-[#2ECB46]/20",
    secondary: "bg-white border-2 border-[#2ECB46] text-[#2ECB46] hover:bg-[#2ECB46]/5"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]}`}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%', opacity: 0 }}
        whileHover={{ x: '100%', opacity: 1 }}
        transition={{ duration: 0.6 }}
      />
      <motion.div
        className="relative flex items-center gap-2"
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Icon className="w-5 h-5 transition-all duration-300 group-hover:rotate-12" />
        {children}
      </motion.div>
    </motion.button>
  );
};