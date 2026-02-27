<template>
  <button class="theme-toggle" @click="$emit('toggle')">
    {{ theme === 'dark' ? '🌙' : '☀️' }}
  </button>
</template>

<script setup>
defineProps({ theme: { type: String, default: 'dark' } })
defineEmits(['toggle'])
</script>
