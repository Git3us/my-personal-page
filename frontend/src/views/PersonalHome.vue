<template>
  <main class="page-shell" v-if="store.profile">
    <header class="topbar">
      <div class="brand">
        <div class="brand-icon">P</div>
        <div>
          <div class="brand-name">Personal Page</div>
          <small>Figma Inspired UI</small>
        </div>
      </div>
      <ThemeToggle :is-dark="isDark" @toggle="toggleTheme" />
    </header>

    <section class="hero">
      <div class="hero-content">
        <Chip label="BACKEND ENGINEER" variant="solid" />
        <h1>
          Building reliable
          <span>digital experiences</span>
        </h1>
        <p>{{ store.profile.bio }}</p>

        <div class="actions">
          <button class="btn btn--primary">联系我</button>
          <button class="btn btn--ghost">下载简历</button>
        </div>
      </div>
      <div class="hero-image glass-panel">
        <img :src="store.profile.avatarUrl" alt="avatar" loading="lazy" />
        <div class="meta">
          <h2>{{ store.profile.fullName }}</h2>
          <p>{{ store.profile.title }}</p>
        </div>
      </div>
    </section>

    <p v-if="store.error" class="warning">{{ store.error }}</p>

    <section class="cards-grid">
      <SectionCard title="日常生活">
        <p>{{ store.profile.dailyLife }}</p>
      </SectionCard>

      <SectionCard title="核心技能">
        <div class="chip-row">
          <Chip v-for="skill in store.profile.skills" :key="skill" :label="skill" />
        </div>
      </SectionCard>

      <SectionCard title="兴趣爱好">
        <div class="chip-row">
          <Chip v-for="hobby in store.profile.hobbies" :key="hobby" :label="hobby" />
        </div>
      </SectionCard>

      <SectionCard title="后续扩展预留">
        <ul>
          <li>项目经历时间轴</li>
          <li>技术文章与分享</li>
          <li>证书与荣誉</li>
          <li>联系渠道与在线简历下载</li>
        </ul>
      </SectionCard>
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
.topbar { display:flex; justify-content:space-between; align-items:center; margin-bottom: 34px; }
.brand { display:flex; align-items:center; gap:12px; }
.brand-icon { width:42px; height:42px; border-radius:12px; display:grid; place-items:center; font-weight:700; color:#fff; background:linear-gradient(140deg, var(--primary), var(--accent)); }
.brand-name { font-size: 18px; font-weight: 700; }
small { color: var(--text-secondary); }

.hero { display:grid; grid-template-columns: 1.2fr 1fr; gap: 24px; margin-bottom: 24px; }
.hero-content h1 { font-size: clamp(32px, 5vw, 56px); line-height: 1.1; margin: 12px 0; }
.hero-content h1 span { background: linear-gradient(120deg, var(--accent), var(--primary)); -webkit-background-clip:text; color: transparent; }
.hero-content p { color: var(--text-secondary); max-width: 640px; line-height: 1.8; }
.actions { display:flex; gap:12px; margin-top: 20px; }

.hero-image { border-radius: 28px; padding: 12px; }
.hero-image img { width: 100%; height: 320px; object-fit: cover; border-radius: 20px; }
.meta { padding: 12px 8px 4px; }
.meta h2 { margin: 0; }
.meta p { margin: 6px 0 0; color: var(--text-secondary); }

.cards-grid { display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
.chip-row { display:flex; flex-wrap:wrap; gap: 8px; }
.warning { color: #f87171; margin-bottom: 12px; }

@media (max-width: 900px) {
  .hero, .cards-grid { grid-template-columns: 1fr; }
}
</style>
