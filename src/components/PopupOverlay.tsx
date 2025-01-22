
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Gamepad2, X } from 'lucide-react';
import { Button } from './Button';

interface PopupOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PopupOverlay: React.FC<PopupOverlayProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%', y: 100, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={{ x: '100%', y: 100, opacity: 0 }}
            transition={{ 
              type: "spring",
              damping: 25,
              stiffness: 300,
              mass: 0.8
            }}
            className="absolute bottom-6 right-6 bg-white rounded-2xl shadow-2xl p-6 w-[340px] transform"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 transition-colors"
              whileHover={{ rotate: 90 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={onClose}
            >
              <X className="w-5 h-5 text-gray-500" />
            </motion.button>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <motion.h2 
                  className="text-2xl font-bold bg-gradient-to-r from-[#2ECB46] to-[#25A939] bg-clip-text text-transparent"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Choose Your Adventure
                </motion.h2>
                <motion.div 
                  className="h-1 w-16 bg-gradient-to-r from-[#2ECB46] to-[#25A939] rounded-full mx-auto"
                  initial={{ width: 0 }}
                  animate={{ width: 64 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
              </div>
              
              <motion.div 
                className="grid gap-3"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                <motion.div
                  variants={{
                    hidden: { x: 20, opacity: 0 },
                    visible: { x: 0, opacity: 1 }
                  }}
                >
                  <Button variant="primary" icon={Brain}>
                    Play Our Quiz
                  </Button>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { x: -20, opacity: 0 },
                    visible: { x: 0, opacity: 1 }
                  }}
                >
                  <Button variant="secondary" icon={Gamepad2}>
                    Play Our Game
                  </Button>
                </motion.div>
              </motion.div>

              <motion.p 
                className="text-gray-500 text-sm text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Choose your preferred way to play!
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};