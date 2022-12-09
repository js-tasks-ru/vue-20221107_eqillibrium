import { createRouter, createWebHistory } from 'vue-router';
import PageIndex from "../views/PageIndex";

export const router = createRouter({
  history: createWebHistory('/05-vue-router/01-AuthPages'),
  routes: [
    {
      path: '/',
      name: 'main',
      component: PageIndex
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/PageLogin')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/PageRegister')
    },
  ],
});
