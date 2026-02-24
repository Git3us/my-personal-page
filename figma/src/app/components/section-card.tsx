import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface SectionCardProps {
  title: string;
  children: ReactNode;
  theme: 'light' | 'dark';
}

export function SectionCard({ title, children, theme }: SectionCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="h-full rounded-[16px] p-6 backdrop-blur-xl border transition-all duration-200"
      style={{
        background: 'var(--glass-bg)',
        borderColor: 'var(--glass-border)',
        boxShadow: theme === 'dark'
          ? '0 4px 24px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(148, 163, 184, 0.08) inset'
          : '0 4px 24px rgba(15, 23, 42, 0.06), 0 0 0 1px rgba(15, 23, 42, 0.04) inset',
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget as HTMLElement;
        target.style.boxShadow = theme === 'dark'
          ? '0 12px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(148, 163, 184, 0.12) inset'
          : '0 12px 48px rgba(15, 23, 42, 0.1), 0 0 0 1px rgba(15, 23, 42, 0.06) inset';
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget as HTMLElement;
        target.style.boxShadow = theme === 'dark'
          ? '0 4px 24px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(148, 163, 184, 0.08) inset'
          : '0 4px 24px rgba(15, 23, 42, 0.06), 0 0 0 1px rgba(15, 23, 42, 0.04) inset';
      }}
    >
      <h3 className="text-lg font-semibold mb-4 text-foreground">
        {title}
      </h3>
      <div className="text-foreground/90">
        {children}
      </div>
    </motion.div>
  );
}
