<template>
  <nav id="nav" :class="{ 'bg-on': navBgOn }">
    <div class="nav-logo" @click="navigate('home')" style="cursor: pointer">
      豪族会
      <span>〜 GOZOKU 〜</span>
    </div>
    <div class="nav-right">
      <ul class="nav-links">
        <li v-for="page in pages" :key="page.name">
          <a @click="navigate(page.name)" :class="{ active: current === page.name }" :data-page="page.name">
            {{ t(page.labelKey) }}
          </a>
        </li>
      </ul>
      <div class="lang-toggle" role="group" aria-label="Language">
        <button type="button" :class="{ active: locale === 'ja' }" @click="changeLocale('ja')">日本語</button>
        <span class="lang-divider" aria-hidden="true">/</span>
        <button type="button" :class="{ active: locale === 'en' }" @click="changeLocale('en')">EN</button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { setLocale } from '@/plugins/i18n.ts';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

const { t, locale } = useI18n();

// ページ情報をJSON配列で管理
const pages = [
  { name: 'home', path: '/', labelKey: 'nav.home' },
  { name: 'schedule', path: '/schedule', labelKey: 'nav.schedule' },
  { name: 'library', path: '/library', labelKey: 'nav.library' }
];

const router = useRouter();
const route = useRoute();
const current = ref('home');
const navBgOn = computed(() => current.value !== 'home');

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

function changeLocale(lang: 'ja' | 'en') {
  if (locale.value === lang) return;
  setLocale(lang);
}

// ページ遷移時にactive管理
watch(
  () => route.path,
  (newPath) => {
    current.value = pageNameByRoute(newPath);
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
  background: var(--ink);
  border-bottom: 1px solid var(--border);
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
.nav-right {
  display: flex;
  align-items: center;
  gap: 36px;
}
.lang-toggle {
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.lang-toggle button {
  font-family: 'Shippori Mincho', serif;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: var(--ash);
  background: transparent;
  border: none;
  padding: 4px 0;
  cursor: pointer;
  transition: color 0.3s;
}
.lang-toggle button:hover,
.lang-toggle button.active {
  color: var(--parchment);
}
.lang-divider {
  color: var(--border-b);
  font-size: 0.7rem;
  line-height: 1;
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
  .nav-right {
    gap: 16px;
  }
  .nav-links {
    gap: 24px;
  }
  .lang-toggle {
    gap: 6px;
  }
}
</style>
