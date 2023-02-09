import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Pokemon from '../views/Pokemon.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/pokemon/:name', component: Pokemon },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router