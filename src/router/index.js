import { createRouter, createWebHistory } from 'vue-router';
import ProfilePage from '@/pages/ProfilePage.vue';
import HomePage from '@/pages/HomePage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/profile/:id', component: ProfilePage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;