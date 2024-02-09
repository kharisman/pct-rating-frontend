import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import Index from "@/pages/Index.vue"
import Dosen from "@/pages/Dosen.vue"
import Rating from "@/pages/Rating.vue"

import App from './App.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/',name:'index', component: Index },
        { path: '/pilih-dosen/:id', name:'form-detail', component: Dosen },
        { path: '/rating/:id/:s' ,name:'rating' , component: Rating },
    ]
});

const app = createApp(App)

app.use(router);

app.mount('#app')



