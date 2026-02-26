import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { twMerge } from 'tailwind-merge';
import {
  Github,
  Linkedin,
  Mail,
  Download,
  Code,
  Layers,
  Cpu,
  Globe,
  Moon,
  Sun
} from 'lucide-react';

interface BadgeProps {
  label: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent';
}

const Badge: React.FC<BadgeProps> = ({ label, className, variant = 'primary' }) => {
  const variants = {
    primary: 'bg-slate-800 text-slate-300 border border-slate-700',
    secondary: 'bg-slate-700 text-slate-200 border border-slate-600',
    accent: 'bg-cyan-900/30 text-cyan-300 border border-cyan-800/50 animate-pulse-slow'
  };
  return (
    <span className={twMerge('inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider backdrop-blur-sm', variants[variant], className)}>
      {label}
    </span>
  );
};

interface ChipProps {
  label: string;
  variant?: 'filled' | 'outline';
  className?: string;
  icon?: React.ReactNode;
}

const Chip: React.FC<ChipProps> = ({ label, variant = 'filled', className, icon }) => {
  const baseClasses = 'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300';
  const variants = {
    filled: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-500/40 backdrop-blur-sm',
    outline: 'bg-transparent text-slate-400 border border-slate-700 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-cyan-500/5'
  };
  return (
    <motion.span whileHover={{ y: -2 }} className={twMerge(baseClasses, variants[variant], className)}>
      {icon && <span className="w-4 h-4">{icon}</span>}
      {label}
    </motion.span>
  );
};

interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  delay?: number;
}

const SectionCard: React.FC<SectionCardProps> = ({ children, className, title, subtitle, icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={twMerge('glass-panel relative flex flex-col p-6 rounded-[var(--radius-lg)] overflow-hidden group', className)}
    >
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
      <div className="z-10 relative h-full flex flex-col">{children}</div>
    </motion.div>
  );
};

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative p-2 rounded-full overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors"
      aria-label="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180, scale: theme === 'dark' ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon className="w-5 h-5 text-cyan-400" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'light' ? 0 : -180, scale: theme === 'light' ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center"
      >
        <Sun className="w-5 h-5 text-orange-400" />
      </motion.div>
    </motion.button>
  );
};

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a href={href} className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:bg-cyan-500 hover:scale-110 transition-all duration-300 border border-[var(--border-subtle)]">
    {icon}
  </a>
);

const ArrowUpRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

const PROFILE_IMAGE = 'https://images.unsplash.com/photo-1649962843028-54905316eb21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWNoJTIwcG9ydHJhaXQlMjBtaW5pbWFsaXN0aWMlMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzE5Mjc3MTl8MA&ixlib=rb-4.1.0&q=80&w=1080';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 10 } }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200 font-sans">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse-slow delay-1000" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 py-8 md:px-12 lg:px-20">
        <header className="flex justify-between items-center mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-cyan-500/20">A</div>
            <span className="text-xl font-semibold tracking-tight">Alex Dev</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </motion.div>
        </header>

        <motion.main variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-8">
          <motion.section variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <Badge label="Full Stack Developer" variant="accent" className="w-fit" />
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
                Building digital <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">experiences</span> that matter.
              </h1>
              <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                I craft high-performance web applications with a focus on user experience, clean code, and modern design principles. Based in San Francisco.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <button className="px-6 py-3 rounded-full bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/25 flex items-center gap-2 group">
                  <Mail className="w-4 h-4" /> Contact Me <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <button className="px-6 py-3 rounded-full border border-[var(--border-subtle)] hover:bg-[var(--bg-card-hover)] transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" /> Resume
                </button>
              </div>
            </div>
            <div className="lg:col-span-5 relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-[32px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                <img src={PROFILE_IMAGE} alt="Profile" className="w-full h-auto object-cover aspect-[4/5] hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-60" />
              </div>
            </div>
          </motion.section>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div variants={itemVariants} className="flex flex-col gap-6">
              <SectionCard title="About Me" icon={<Globe className="w-6 h-6" />} className="h-full">
                <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                  With over 5 years of experience in shipping products, I bridge the gap between design and engineering. I specialize in React ecosystem and performant UI.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-auto">
                  <div className="p-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border-subtle)]">
                    <div className="text-3xl font-bold text-cyan-400">5+</div>
                    <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mt-1">Years Exp</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border-subtle)]">
                    <div className="text-3xl font-bold text-cyan-400">50+</div>
                    <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mt-1">Projects</div>
                  </div>
                </div>
              </SectionCard>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-6">
              <SectionCard title="Tech Stack" icon={<Cpu className="w-6 h-6" />} className="h-full">
                <div className="flex flex-col gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text-secondary)] mb-3 uppercase tracking-wider">Frontend</h4>
                    <div className="flex flex-wrap gap-2">
                      <Chip label="React" variant="filled" />
                      <Chip label="TypeScript" variant="outline" />
                      <Chip label="Tailwind" variant="outline" />
                      <Chip label="Next.js" variant="outline" />
                      <Chip label="Framer Motion" variant="outline" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text-secondary)] mb-3 uppercase tracking-wider">Backend & Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      <Chip label="Node.js" variant="outline" />
                      <Chip label="PostgreSQL" variant="outline" />
                      <Chip label="Figma" variant="filled" />
                      <Chip label="Git" variant="outline" />
                    </div>
                  </div>
                </div>
              </SectionCard>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-6">
              <SectionCard title="Recent Work" icon={<Layers className="w-6 h-6" />}>
                <div className="flex flex-col gap-4">
                  <a href="#" className="group block p-3 -mx-3 rounded-xl hover:bg-[var(--bg-secondary)]/50 transition-colors">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium group-hover:text-cyan-400 transition-colors">Fintech Dashboard</span>
                      <ArrowUpRightIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] line-clamp-1">Real-time analytics platform for crypto assets.</p>
                  </a>
                  <a href="#" className="group block p-3 -mx-3 rounded-xl hover:bg-[var(--bg-secondary)]/50 transition-colors">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium group-hover:text-cyan-400 transition-colors">AI Content Generator</span>
                      <ArrowUpRightIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] line-clamp-1">SaaS application utilizing OpenAI API.</p>
                  </a>
                </div>
              </SectionCard>
              <SectionCard className="flex-1 justify-center items-center gap-4">
                <div className="flex gap-4">
                  <SocialLink href="#" icon={<Github className="w-5 h-5" />} />
                  <SocialLink href="#" icon={<Linkedin className="w-5 h-5" />} />
                  <SocialLink href="#" icon={<Code className="w-5 h-5" />} />
                </div>
                <div className="text-center mt-2">
                  <p className="text-sm text-[var(--text-secondary)]">Available for freelance</p>
                  <p className="text-xs text-green-400 mt-1 flex items-center justify-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />Online Now</p>
                </div>
              </SectionCard>
            </motion.div>
          </div>
        </motion.main>

        <footer className="mt-20 py-8 border-t border-[var(--border-subtle)] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--text-secondary)]">
          <div>© 2024 Alex Dev. Built with React & Tailwind.</div>
          <div className="flex items-center gap-6 font-mono text-xs opacity-50 hover:opacity-100 transition-opacity cursor-help" title="Dev Mode Specs">
            <span>Grid: 8pt</span><span>Ease: cubic-bezier(0.4, 0, 0.2, 1)</span><span>Duration: 300ms</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
