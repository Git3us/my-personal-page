<template>
  <span class="chip" :class="variant">{{ label }}</span>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  variant: { type: String, default: 'filled' }
})
</script>
