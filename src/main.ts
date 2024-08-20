// tsyringe import 의존성 주입
import "reflect-metadata";
import { container } from 'tsyringe';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// vue-toastification import
import Toast, { POSITION } from "vue-toastification";
import 'vue-toastification/dist/index.css';

// Bootstrap CSS 파일을 import
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // Bootstrap JS 파일을 import

import "@/assets/main.css"

import AxiosHttpRepository from './repository/AxiosHttpRepository';
import type HttpRepository from './repository/HttpRepository';

const app = createApp(App)

container.register<HttpRepository>("HttpRepository", { useClass: AxiosHttpRepository });

app.use(Toast, {
  position: POSITION.TOP_CENTER
})
app.use(router)

app.mount('#app')
