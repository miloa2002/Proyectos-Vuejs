import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: {titulo: 'Listado de Productos'}
    },
    {
      path: '/productos/nuevo',
      name: 'productos-nuevo',
      component: () => import("../views/FormularioView.vue")
    },
    {
      path: '/productos/nuevo/:id',
      name: 'productos-nuevo-id',
      component: () => import("../views/FormularioView.vue")
    }
  ]
})

export default router
