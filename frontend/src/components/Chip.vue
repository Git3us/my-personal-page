<template>
  <span :class="['chip', variant === 'solid' ? 'chip--solid' : 'chip--outline']">
    {{ label }}
  </span>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  variant: {
    type: String,
    default: 'outline'
  }
})
</script>
