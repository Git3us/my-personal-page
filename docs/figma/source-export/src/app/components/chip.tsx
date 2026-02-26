import React from 'react';
import { motion } from 'motion/react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ChipProps {
  label: string;
  variant?: 'filled' | 'outline';
  className?: string;
  icon?: React.ReactNode;
}

export const Chip: React.FC<ChipProps> = ({ 
  label, 
  variant = 'filled', 
  className,
  icon
}) => {
  const baseClasses = "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300";
  
  const variants = {
    filled: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-500/40 backdrop-blur-sm",
    outline: "bg-transparent text-slate-400 border border-slate-700 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-cyan-500/5"
  };

  return (
    <motion.span 
      whileHover={{ y: -2 }}
      className={twMerge(baseClasses, variants[variant], className)}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {label}
    </motion.span>
  );
};
