import Home from '@/views/Home.vue';
import Library from '@/views/Library.vue';
import NotFound from '@/views/NotFound.vue';
import Schedule from '@/views/Schedule.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/schedule', name: 'Schedule', component: Schedule },
  { path: '/library', name: 'Library', component: Library },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
];

export const router = createRouter({
  history: createWebHistory('/gozoku/'),
  routes
});

export const go = (path: string) => {
  router.push(path);
};
