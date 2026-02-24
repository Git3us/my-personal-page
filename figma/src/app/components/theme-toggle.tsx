import { Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      className="relative p-3 rounded-xl backdrop-blur-sm border transition-all duration-200 group"
      style={{
        background: 'var(--glass-bg)',
        borderColor: 'var(--glass-border)',
      }}
      aria-label={theme === 'light' ? '切换到暗色模式' : '切换到亮色模式'}
    >
      {/* 渐变背景（Hover效果） */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(56, 189, 248, 0.1))',
        }}
      />
      
      <div className="relative">
        {theme === 'light' ? (
          <Moon className="w-5 h-5 text-foreground transition-transform group-hover:rotate-12" />
        ) : (
          <Sun className="w-5 h-5 text-foreground transition-transform group-hover:rotate-45" />
        )}
      </div>
    </motion.button>
  );
}
