<template>
  <button class="theme-toggle glass-panel" type="button" @click="$emit('toggle')" :aria-label="`切换到${isDark ? '浅色' : '深色'}模式`">
    <span>{{ isDark ? '🌙' : '☀️' }}</span>
  </button>
</template>

<script setup>
defineProps({
  isDark: {
    type: Boolean,
    required: true
  }
})
</script>

<style scoped>
.theme-toggle {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: 1px solid var(--border-subtle);
  display: grid;
  place-items: center;
  background: var(--bg-secondary);
  cursor: pointer;
  transition: all 0.4s ease;
}
</style>
