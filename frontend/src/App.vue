<template>
  <div class="page" :class="theme">
    <div class="ambient ambient-a"></div>
    <div class="ambient ambient-b"></div>

    <main class="container">
      <header class="header">
        <div class="brand">
          <div class="logo">A</div>
          <span>Alex Dev</span>
        </div>
        <ThemeToggle :theme="theme" @toggle="toggleTheme" />
      </header>

      <section class="hero">
        <div class="hero-content">
          <small class="hero-tag">Full Stack Developer</small>
          <h1>
            Building digital
            <span>experiences</span>
            that matter.
          </h1>
          <p>
            专注高性能 Web 应用开发，注重用户体验、工程质量与现代化设计落地。
          </p>
          <div class="actions">
            <button class="btn btn-primary">Contact Me</button>
            <button class="btn btn-outline">Resume</button>
          </div>
        </div>

        <SectionCard class="hero-card">
          <img
            class="profile"
            src="https://images.unsplash.com/photo-1649962843028-54905316eb21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="profile"
          />
          <div class="meta">
            <span>Alex Dev</span>
            <span>San Francisco</span>
          </div>
        </SectionCard>
      </section>

      <section class="grid">
        <SectionCard title="About">
          <p>8+ 年开发经验，覆盖前后端与云原生交付。</p>
        </SectionCard>

        <SectionCard title="Tech Stack">
          <div class="chips">
            <Chip label="Vue" />
            <Chip label="Spring Boot" variant="outline" />
            <Chip label="MySQL" variant="outline" />
            <Chip label="Redis" variant="outline" />
          </div>
        </SectionCard>

        <SectionCard title="Recent Work">
          <ul class="work-list">
            <li>Fintech Dashboard</li>
            <li>AI Content Generator</li>
          </ul>
        </SectionCard>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ThemeToggle from './components/ThemeToggle.vue'
import SectionCard from './components/SectionCard.vue'
import Chip from './components/Chip.vue'

const theme = ref('dark')
const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}
</script>
