import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Github, Linkedin, Mail, MapPin, Download, Code, Layers, Cpu } from 'lucide-react'
import { ThemeToggle } from './components/ThemeToggle'
import { SectionCard } from './components/SectionCard'
import { Chip } from './components/Chip'
import { Badge } from './components/Badge'

const PROFILE_IMAGE =
  'https://images.unsplash.com/photo-1649962843028-54905316eb21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'

export default function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200 font-sans">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse-slow delay-1000" />
      </div>
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 py-8 md:px-12 lg:px-20">
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-cyan-500/20">A</div>
            <span className="text-xl font-semibold tracking-tight">Alex Dev</span>
          </div>
          <ThemeToggle theme={theme} toggleTheme={() => setTheme((v) => (v === 'dark' ? 'light' : 'dark'))} />
        </header>

        <main className="flex flex-col gap-8">
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <Badge label="Full Stack Developer" variant="accent" className="w-fit" />
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">Building digital <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">experiences</span> that matter.</h1>
              <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed">I craft high-performance web applications with a focus on user experience, clean code, and modern design principles. Based in San Francisco.</p>
              <div className="flex flex-wrap gap-4 mt-4">
                <button className="px-6 py-3 rounded-full bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/25 flex items-center gap-2 group"><Mail className="w-4 h-4" />Contact Me<span className="group-hover:translate-x-1 transition-transform">→</span></button>
                <button className="px-6 py-3 rounded-full border border-[var(--border-subtle)] hover:bg-[var(--bg-card-hover)] transition-colors flex items-center gap-2"><Download className="w-4 h-4" />Resume</button>
              </div>
            </div>
            <div className="lg:col-span-5 relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-[32px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                <img src={PROFILE_IMAGE} alt="Profile" className="w-full h-[460px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white text-sm">
                  <span className="font-medium">Alex Dev</span><span className="flex items-center gap-2"><MapPin className="w-4 h-4" />San Francisco</span>
                </div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <SectionCard title="About" icon={<Code className="w-6 h-6" />}>
              <p className="text-[var(--text-secondary)] leading-relaxed">I design and deliver scalable digital products from idea to production with strong design-engineering collaboration.</p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border-subtle)]"><div className="text-3xl font-bold text-cyan-400">8+</div><div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mt-1">Years</div></div>
                <div className="p-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border-subtle)]"><div className="text-3xl font-bold text-cyan-400">50+</div><div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mt-1">Projects</div></div>
              </div>
            </SectionCard>

            <SectionCard title="Tech Stack" icon={<Cpu className="w-6 h-6" />}>
              <div className="flex flex-col gap-4"><div className="flex flex-wrap gap-2"><Chip label="React" /><Chip label="TypeScript" variant="outline" /><Chip label="Tailwind" variant="outline" /><Chip label="Spring Boot" variant="outline" /></div></div>
            </SectionCard>

            <SectionCard title="Recent Work" icon={<Layers className="w-6 h-6" />}>
              <div className="flex flex-col gap-4">
                <a href="#" className="group block p-3 -mx-3 rounded-xl hover:bg-[var(--bg-secondary)]/50 transition-colors"><div className="flex justify-between items-center"><span className="font-medium group-hover:text-cyan-400 transition-colors">Fintech Dashboard</span></div></a>
                <a href="#" className="group block p-3 -mx-3 rounded-xl hover:bg-[var(--bg-secondary)]/50 transition-colors"><div className="flex justify-between items-center"><span className="font-medium group-hover:text-cyan-400 transition-colors">AI Content Generator</span></div></a>
              </div>
              <div className="flex gap-4 mt-8">
                <SocialLink icon={<Github className="w-5 h-5" />} />
                <SocialLink icon={<Linkedin className="w-5 h-5" />} />
                <SocialLink icon={<Code className="w-5 h-5" />} />
              </div>
            </SectionCard>
          </section>
        </main>
      </div>
    </div>
  )
}

function SocialLink({ icon }) {
  return <motion.a whileHover={{ y: -2 }} href="#" className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:bg-cyan-500 transition-all border border-[var(--border-subtle)]">{icon}</motion.a>
}
