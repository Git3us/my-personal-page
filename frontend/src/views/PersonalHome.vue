<template>
  <main class="page-shell" v-if="store.profile">
    <div class="ambient">
      <div class="blob blob-a"></div>
      <div class="blob blob-b"></div>
    </div>

    <header class="topbar">
      <div class="brand">
        <div class="brand-icon">A</div>
        <div>
          <div class="brand-name">Alex Dev</div>
          <small>Figma V2 作品集</small>
        </div>
      </div>
      <ThemeToggle :is-dark="isDark" @toggle="toggleTheme" />
    </header>

    <section class="hero">
      <div class="hero-content">
        <Chip label="全栈开发工程师" variant="solid" />
        <h1>
          打造真正有价值的
          <span>数字体验</span>
          与产品。
        </h1>
        <p>
          专注高性能 Web 应用开发，注重用户体验、工程质量与现代化设计落地。
        </p>

        <div class="actions">
          <button class="btn btn--primary">联系我 →</button>
          <button class="btn btn--ghost">下载简历</button>
        </div>
      </div>

      <div class="hero-image-wrap group">
        <div class="hero-glow"></div>
        <div class="hero-image glass-panel">
          <img :src="store.profile.avatarUrl" alt="avatar" loading="lazy" />
        </div>
      </div>
    </section>

    <p v-if="store.error" class="warning">{{ store.error }}</p>

    <section class="three-grid">
      <SectionCard title="关于我">
        <p class="muted">
          {{ store.profile.bio }}
        </p>
        <div class="stats">
          <div class="stat-box">
            <strong>5+</strong>
            <span>年经验</span>
          </div>
          <div class="stat-box">
            <strong>50+</strong>
            <span>项目</span>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="技术栈">
        <h4>前端</h4>
        <div class="chip-row">
          <Chip label="Vue" />
          <Chip label="TypeScript" variant="outline" />
          <Chip label="Tailwind" variant="outline" />
          <Chip label="Motion" variant="outline" />
        </div>

        <h4>后端与工具</h4>
        <div class="chip-row">
          <Chip v-for="skill in store.profile.skills" :key="skill" :label="skill" variant="outline" />
        </div>
      </SectionCard>

      <div class="column-stack">
        <SectionCard title="近期项目">
          <a href="#" class="work-item">
            <span>金融数据看板</span>
            <small>面向加密资产的实时分析平台。</small>
          </a>
          <a href="#" class="work-item">
            <span>AI 内容生成平台</span>
            <small>基于 OpenAI API 的 SaaS 应用。</small>
          </a>
        </SectionCard>

        <SectionCard title="联系渠道">
          <div class="socials">
            <a href="#">GitHub</a>
            <a href="#">LinkedIn</a>
            <a href="#">博客</a>
          </div>
          <p class="online"><i></i> 当前在线</p>
        </SectionCard>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useProfileStore } from '../stores/profile'
import ThemeToggle from '../components/ThemeToggle.vue'
import SectionCard from '../components/SectionCard.vue'
import Chip from '../components/Chip.vue'

const store = useProfileStore()
const isDark = ref(true)
const themeValue = computed(() => (isDark.value ? 'dark' : 'light'))

const applyTheme = () => {
  document.documentElement.setAttribute('data-theme', themeValue.value)
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  applyTheme()
}

onMounted(async () => {
  applyTheme()
  await store.fetchProfile()
})
</script>

<style scoped>
.ambient { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.blob { position: absolute; width: 36vw; height: 36vw; border-radius: 999px; filter: blur(120px); animation: pulse 6s ease-in-out infinite; }
.blob-a { top: -14%; left: -10%; background: rgb(34 211 238 / 15%); }
.blob-b { right: -10%; bottom: -16%; background: rgb(37 99 235 / 15%); animation-delay: 1.2s; }
@keyframes pulse { 0%,100% { opacity: .4 } 50% { opacity: 1 } }

.topbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 56px; }
.brand { display: flex; align-items: center; gap: 12px; }
.brand-icon { width: 42px; height: 42px; border-radius: 12px; display: grid; place-items: center; font-weight: 800; color: #fff; background: linear-gradient(140deg, var(--primary), var(--accent)); }
.brand-name { font-size: 20px; font-weight: 700; }
small { color: var(--text-secondary); }

.hero { display: grid; grid-template-columns: 1.25fr 1fr; gap: 28px; align-items: center; margin-bottom: 32px; }
.hero-content h1 { font-size: clamp(34px, 5vw, 72px); line-height: 1.08; margin: 12px 0; letter-spacing: -0.02em; }
.hero-content h1 span { background: linear-gradient(120deg, #22d3ee, #3b82f6); -webkit-background-clip: text; color: transparent; }
.hero-content p { color: var(--text-secondary); max-width: 640px; line-height: 1.8; font-size: 18px; }
.actions { display: flex; gap: 12px; margin-top: 18px; }

.hero-image-wrap { position: relative; }
.hero-glow { position: absolute; inset: -10px; border-radius: 32px; background: linear-gradient(145deg, rgb(34 211 238 / 25%), rgb(59 130 246 / 20%)); filter: blur(28px); opacity: .25; transition: opacity .5s ease; }
.hero-image-wrap:hover .hero-glow { opacity: .7; }
.hero-image { border-radius: 30px; padding: 10px; transform: rotate(2deg); transition: transform .45s ease; }
.hero-image img { width: 100%; aspect-ratio: 4/5; object-fit: cover; border-radius: 24px; }
.hero-image-wrap:hover .hero-image { transform: rotate(0); }

.three-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
.column-stack { display: grid; grid-template-rows: 1fr auto; gap: 18px; }

h4 { margin: 14px 0 8px; font-size: 12px; text-transform: uppercase; color: var(--text-secondary); letter-spacing: 0.1em; }
.muted { color: var(--text-secondary); line-height: 1.7; margin: 0 0 16px; }
.stats { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: auto; }
.stat-box { border: 1px solid var(--border-subtle); background: rgb(255 255 255 / 4%); border-radius: 12px; padding: 12px; }
.stat-box strong { display: block; color: var(--accent); font-size: 28px; }
.stat-box span { font-size: 12px; color: var(--text-secondary); text-transform: uppercase; }

.chip-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
.work-item { display: block; border-radius: 12px; padding: 10px; text-decoration: none; color: inherit; transition: background .22s ease; }
.work-item:hover { background: rgb(255 255 255 / 4%); }
.work-item span { display: block; margin-bottom: 4px; font-weight: 600; }
.work-item small { color: var(--text-secondary); }

.socials { display: flex; gap: 10px; flex-wrap: wrap; }
.socials a { border: 1px solid var(--border-subtle); padding: 8px 12px; border-radius: 999px; text-decoration: none; color: var(--text-secondary); transition: all .24s ease; }
.socials a:hover { color: white; background: linear-gradient(120deg, var(--primary), var(--accent)); border-color: transparent; }
.online { margin-top: 12px; color: #4ade80; display: flex; align-items: center; gap: 8px; }
.online i { width: 8px; height: 8px; border-radius: 999px; background: currentColor; display: inline-block; box-shadow: 0 0 10px currentColor; }

.warning { color: #f87171; margin-bottom: 12px; }

@media (max-width: 1100px) {
  .three-grid { grid-template-columns: 1fr 1fr; }
  .column-stack { grid-column: span 2; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr; }
}

@media (max-width: 900px) {
  .hero, .three-grid, .column-stack { grid-template-columns: 1fr; }
}
</style>
