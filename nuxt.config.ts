export default defineNuxtConfig({
  css: ['~/assets/styles/main.scss'],
  vite: {
    vue: {
      script: {
        propsDestructure: true,
        defineModel: true
      }
    }
  }
})