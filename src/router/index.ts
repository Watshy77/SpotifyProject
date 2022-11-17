import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layout/default.vue'
import HomeView from '../views/HomeView.vue'
import AlbumsView from '../views/AlbumsView.vue'
import AlbumView from '../views/AlbumView.vue'
import ArtistsView from '../views/ArtistsView.vue'
import Login from '../views/Login.vue'
import Callback from '../views/Callback.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: DefaultLayout,
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: HomeView,
                },
                {
                    path: '/artists/:id',
                    name: 'artists',
                    component: ArtistsView,
                },
                {
                    path: '/albums',
                    name: 'albums',
                    component: AlbumsView,
                },
                {
                    path: '/albums/:id',
                    name: 'album',
                    component: AlbumView,
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/callback',
            name: 'callback',
            component: Callback,
        },
    ]
})

export default router