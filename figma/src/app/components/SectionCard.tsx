import React from 'react';
import { motion } from 'motion/react';
import { twMerge } from 'tailwind-merge';

interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  delay?: number;
}

export const SectionCard: React.FC<SectionCardProps> = ({ 
  children, 
  className, 
  title, 
  subtitle,
  icon,
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={twMerge(
        "glass-panel relative flex flex-col p-6 rounded-[var(--radius-lg)] overflow-hidden group",
        className
      )}
    >
      {/* Subtle Glow Effect on Hover */}
      <div className="absolute -inset-px rounded-[var(--radius-lg)] opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-cyan-500/10 to-transparent pointer-events-none" />
      
      {(title || icon) && (
        <div className="flex items-start justify-between mb-4 z-10">
          <div className="flex flex-col gap-1">
            {icon && <div className="text-cyan-400 mb-2">{icon}</div>}
            {title && <h3 className="text-xl font-semibold text-[var(--text-primary)] group-hover:text-cyan-300 transition-colors duration-300">{title}</h3>}
            {subtitle && <p className="text-sm text-[var(--text-secondary)]">{subtitle}</p>}
          </div>
        </div>
      )}
      
      <div className="z-10 relative h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};
