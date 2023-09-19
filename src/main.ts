import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import { MotionPlugin } from '@vueuse/motion'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
// import 'fomantic-ui/dist/semantic.min.css'
import 'uno.css'
import '/src/assets/style.css'
// import 'animate.css'
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
// app.use(MotionPlugin)
app.use(pinia)
app.use(router)
app.mount('#app')
