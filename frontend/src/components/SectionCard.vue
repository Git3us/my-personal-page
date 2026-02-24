<template>
  <article class="section-card glass-panel">
    <header class="card-head">
      <h3>{{ title }}</h3>
      <slot name="extra" />
    </header>
    <div class="card-body">
      <slot />
    </div>
  </article>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.section-card {
  border-radius: var(--radius-lg);
  padding: 20px;
}

.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

h3 {
  margin: 0;
  font-size: 18px;
}

.card-body {
  color: var(--text-secondary);
  line-height: 1.7;
}
</style>
