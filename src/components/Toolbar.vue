<template>
  <nav id="nav" :class="{ 'bg-on': navBgOn }">
    <div class="nav-logo" @click="navigate('home')" style="cursor: pointer">
      豪族会
      <span>〜 GOZOKU 〜</span>
    </div>
    <ul class="nav-links">
      <li v-for="page in pages" :key="page.name">
        <a @click="navigate(page.name)" :class="{ active: current === page.name }" :data-page="page.name">
          {{ page.label }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// ページ情報をJSON配列で管理
const pages = [
  { name: 'home', path: '/', label: 'Home' },
  { name: 'schedule', path: '/schedule', label: '開催履歴' },
  { name: 'library', path: '/library', label: '遺産' }
];

const router = useRouter();
const route = useRoute();
const current = ref('home');
const navBgOn = ref(false);

function pageNameByRoute(path: string): string {
  const found = pages.find((p) => p.path === path || (p.path !== '/' && path.startsWith(p.path)));
  return found ? found.name : 'home';
}

function navigate(pageName: string) {
  if (pageName === current.value) return;
  const page = pages.find((p) => p.name === pageName);
  if (!page) return;
  current.value = pageName;
  router.push(page.path);
}

function updateNavBg() {
  navBgOn.value = current.value !== 'home';
}

// ページ遷移時にactive管理
watch(
  () => route.path,
  (newPath) => {
    current.value = pageNameByRoute(newPath);
    updateNavBg();
  },
  { immediate: true }
);
</script>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 56px;
  transition:
    background 0.5s,
    border-color 0.5s;
  border-bottom: 1px solid transparent;
}
nav.bg-on {
  background: rgba(8, 12, 16, 0.92);
  backdrop-filter: blur(14px);
  border-color: var(--border);
}
.nav-logo {
  font-family: 'Shippori Mincho', serif;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--rust);
  cursor: pointer;
}
.nav-logo span {
  color: var(--mist);
  font-weight: 400;
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  display: block;
  margin-top: 2px;
}

.nav-links {
  display: flex;
  gap: 48px;
  list-style: none;
}
.nav-links li a {
  font-family: 'Shippori Mincho', serif;
  font-size: 0.78rem;
  letter-spacing: 0.22em;
  color: var(--ash);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s;
  position: relative;
}
.nav-links li a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--rust);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.3s;
}
.nav-links li a:hover,
.nav-links li a.active {
  color: var(--parchment);
}
.nav-links li a.active::after,
.nav-links li a:hover::after {
  transform: scaleX(1);
}
@media (max-width: 768px) {
  nav {
    padding: 18px 24px;
  }
  .nav-links {
    gap: 24px;
  }
}
</style>
