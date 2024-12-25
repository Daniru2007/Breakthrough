import React from 'react';
import { FeatureBox } from './FeatureBox';
import { features } from '../data/features';

export function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 px-12">
      {features.map((feature, index) => (
        <FeatureBox
          key={feature.title}
          {...feature}
          delay={index * 0.2}
        />
      ))}
    </div>
  );
}