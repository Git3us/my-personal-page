<script setup>
import { onMounted } from 'vue'
import { useProfileStore } from '../stores/profile'

const store = useProfileStore()

onMounted(() => {
  store.fetchProfile()
})
</script>

<template>
  <main class="page">
    <section class="hero card" v-if="store.profile">
      <img class="avatar" :src="store.profile.avatarUrl" alt="profile avatar" loading="lazy" />
      <div class="hero-content">
        <p class="label">BACKEND ENGINEER PORTFOLIO</p>
        <h1>{{ store.profile.fullName }}</h1>
        <h2>{{ store.profile.title }}</h2>
        <p class="bio">{{ store.profile.bio }}</p>
      </div>
    </section>

    <p v-if="store.error" class="warning">{{ store.error }}</p>

    <section class="grid" v-if="store.profile">
      <article class="card">
        <h3>日常生活</h3>
        <p>{{ store.profile.dailyLife }}</p>
      </article>

      <article class="card">
        <h3>核心技能</h3>
        <ul>
          <li v-for="skill in store.profile.skills" :key="skill">{{ skill }}</li>
        </ul>
      </article>

      <article class="card">
        <h3>兴趣爱好（可扩展模块）</h3>
        <ul>
          <li v-for="hobby in store.profile.hobbies" :key="hobby">{{ hobby }}</li>
        </ul>
      </article>

      <article class="card roadmap">
        <h3>后续扩展预留</h3>
        <ul>
          <li>项目经历时间轴</li>
          <li>技术文章与分享</li>
          <li>证书与荣誉</li>
          <li>联系渠道与在线简历下载</li>
        </ul>
      </article>
    </section>
  </main>
</template>
