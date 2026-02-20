import React from 'react';
import { motion } from 'framer-motion';

const SimpleLogo = ({ className = '', variant = 'default', alt = 'Ma part de soleil' }) => {
  const logos = {
    default: '/images/logo-mapartdesoleil.png',
    option1: '/images/logo-option1.svg',
    option2: '/images/logo-option2.svg',
    option3: '/images/logo-option3.svg',
    slice: '/images/logo-slice.svg',
    'slice-small': '/images/logo-slice-small-warm.svg',
    'slice-large': '/images/logo-slice-large-warm.svg',
    favicon: '/images/favicon.svg',
  };
  const src = logos[variant] || logos.default;

  return (
    <motion.div
      className={`flex items-center justify-center ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img src={src} alt={alt} className="h-10 w-auto" />
    </motion.div>
  );
};

export default SimpleLogo;