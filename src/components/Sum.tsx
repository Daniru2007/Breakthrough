import React from 'react';
import { motion } from 'framer-motion';
import { Title } from './Sum/components/Title';
import { FeatureGrid } from './Sum/components/FeatureGrid';
import { Background } from './Sum/components/Background';
import './Sum/styles/features.css';
import './Sum.css'

export default function Sum() {

  return (
    <>
      <Background />
      <div className="min-h-screen w-full py-24 px-8">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Title />
          <FeatureGrid />
        </motion.div>
      </div>
    </>
  );
}