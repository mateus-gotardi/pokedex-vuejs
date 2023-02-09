import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import Home from './views/Home.vue'
import Poke from './views/Poke.vue'
import { createPinia } from 'pinia'

const pinia = createPinia();

const routes = [
    { path: '/', component: Home },
    { path: '/poke', component: Poke },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App).use(router).use(pinia).mount('#app')

