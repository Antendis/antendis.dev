<template>
  <section class="parallax-section" ref="section">
    <h2>{{ text }}</h2>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const section = ref(null)

onMounted(() => {
  gsap.from(section.value, {
    y: 50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: section.value,
      start: 'top bottom',
      end: 'bottom center',
      scrub: true
    }
  })
})
</script>

<style scoped>
.parallax-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid rgba(255,255,255,0.1);
}
</style>