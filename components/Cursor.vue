<template>
  <div class="custom-cursor" :style="{ left: x + 'px', top: y + 'px' }"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const x = ref(0)
const y = ref(0)

onMounted(() => {
  document.addEventListener('mousemove', (e) => {
    x.value = e.clientX
    y.value = e.clientY
  })
})
</script>

<style scoped>
.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  pointer-events: none;
  mix-blend-mode: difference;
  z-index: 9999;
}
</style>
