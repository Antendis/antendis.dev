<script setup>
useHead({
  title: 'My Studio',
  meta: [
    { name: 'description', content: 'Portfolio inspired by ashfall.studio' }
  ]
})
</script>

<template>
  <div data-scroll-container class="page">
    <Cursor />

    <main>
      <h1>Hello, I'm a Creative Developer</h1>
      <p>This is a minimalist, interactive portfolio inspired by ashfall.studio. Built with Nuxt 3, GSAP, and smooth scrolling.</p>

      <ParallaxSection text="Scroll down to see animation" />
      <ParallaxSection text="Another section with effect" />
    </main>
  </div>
</template>