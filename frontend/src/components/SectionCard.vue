<template>
  <section class="section-card">
    <h3 v-if="title">{{ title }}</h3>
    <slot />
  </section>
</template>

<script setup>
defineProps({ title: { type: String, default: '' } })
</script>
