// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/sequencial',
        name: 'Sequencial',
        component: () => import('@/views/Sequencial.vue'),
      },
      {
        path: '/simplesmente-encadeada',
        name: 'Simplesmente Encadeada',
        component: () => import('@/views/SimplesmenteEncadeada.vue'),
      },
      {
        path: '/duplamente-encadeada',
        name: 'Duplamente Encadeada',
        component: () => import('@/views/DuplamenteEncadeada.vue'),
      },
      {
        path: '/pilha-sequencial',
        name: 'Pilha Sequencial',
        component: () => import('@/views/PilhaSequencial.vue'),
      },
      {
        path: '/fila-sequencial',
        name: 'Fila Sequencial',
        component: () => import('@/views/FilaSequencial.vue'),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
