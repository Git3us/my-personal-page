import { twMerge } from 'tailwind-merge'

export function Badge({ label, className, variant = 'primary' }) {
  const variants = {
    primary: 'bg-slate-800 text-slate-300 border border-slate-700',
    secondary: 'bg-slate-700 text-slate-200 border border-slate-600',
    accent: 'bg-cyan-900/30 text-cyan-300 border border-cyan-800/50 animate-pulse-slow'
  }

  return <span className={twMerge('inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider backdrop-blur-sm', variants[variant], className)}>{label}</span>
}
