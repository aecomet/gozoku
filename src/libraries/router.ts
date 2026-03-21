import Home from '@/views/Home.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/schedule', name: 'Schedule', component: () => import('@/views/Schedule.vue') },
  { path: '/library', name: 'Library', component: () => import('@/views/Library.vue') },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue') }
];

export const router = createRouter({
  history: createWebHistory('/gozoku/'),
  routes
});

export const go = (path: string) => {
  router.push(path);
};
