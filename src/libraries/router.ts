import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/Home.vue') },
  { path: '/schedule', name: 'Schedule', component: () => import('@/views/Schedule.vue') },
  { path: '/library', name: 'Library', component: () => import('@/views/Library.vue') },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue') }
];

export const router = createRouter({
  history: createWebHashHistory('/gozoku/'),
  routes
});

export const go = (path: string) => {
  router.push(path);
};
