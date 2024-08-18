
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


// Bootstrap CSS 파일을 import
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // Bootstrap JS 파일을 import

import "@/assets/main.css"

const app = createApp(App)

app.use(router)

app.mount('#app')
