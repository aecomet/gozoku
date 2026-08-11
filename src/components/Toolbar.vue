<template>
  <nav id="nav" :class="{ 'bg-on': navBgOn }">
    <div class="nav-logo" @click="navigate('home')" style="cursor: pointer">
      {{ t('nav.brand') }}
      <span>〜 GOZOKU 〜</span>
    </div>
    <ul class="nav-links">
      <li v-for="page in pages" :key="page.name">
        <a @click="navigate(page.name)" :class="{ active: current === page.name }" :data-page="page.name">
          {{ t(page.labelKey) }}
        </a>
      </li>
    </ul>
    <div class="lang-select" :class="{ open }" ref="rootRef">
      <button
        type="button"
        class="lang-trigger"
        :aria-expanded="open"
        aria-haspopup="listbox"
        aria-label="Language"
        @click="toggle"
        @keydown="onTriggerKeydown"
      >
        {{ currentLabel }}
      </button>
      <ul
        v-if="open"
        class="lang-menu"
        role="listbox"
        aria-label="Language"
        :aria-activedescendant="`lang-opt-${highlightIndex}`"
      >
        <li
          v-for="(opt, i) in options"
          :id="`lang-opt-${i}`"
          :key="opt.value"
          role="option"
          :aria-selected="locale === opt.value"
          :class="{ active: locale === opt.value, highlight: i === highlightIndex }"
          @click="selectLang(opt.value)"
          @mouseenter="highlightIndex = i"
        >
          {{ opt.label }}
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { setLocale } from '@/plugins/i18n.ts';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
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

const options = [
  { value: 'ja', label: '日本語' },
  { value: 'en', label: 'English' }
] as const;

const open = ref(false);
const highlightIndex = ref(0);
const rootRef = ref<HTMLElement | null>(null);

const currentLabel = computed(() => options.find((o) => o.value === locale.value)?.label ?? '日本語');

function currentIndex(): number {
  return Math.max(
    0,
    options.findIndex((o) => o.value === locale.value)
  );
}

function toggle() {
  open.value = !open.value;
  if (open.value) highlightIndex.value = currentIndex();
}

function selectLang(lang: 'ja' | 'en') {
  if (locale.value !== lang) setLocale(lang);
  open.value = false;
}

function moveHighlight(delta: number) {
  highlightIndex.value = (highlightIndex.value + delta + options.length) % options.length;
}

function onTriggerKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    open.value = false;
    return;
  }
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    if (!open.value) {
      open.value = true;
      highlightIndex.value = currentIndex();
    } else {
      moveHighlight(e.key === 'ArrowDown' ? 1 : -1);
    }
    return;
  }
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    if (!open.value) {
      open.value = true;
      highlightIndex.value = currentIndex();
    } else {
      selectLang(options[highlightIndex.value].value);
    }
  }
}

function onClickOutside(e: PointerEvent) {
  if (rootRef.value && !rootRef.value.contains(e.target as Node)) {
    open.value = false;
  }
}

onMounted(() => document.addEventListener('pointerdown', onClickOutside));
onBeforeUnmount(() => document.removeEventListener('pointerdown', onClickOutside));

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
  margin-left: auto;
}
.lang-select {
  position: relative;
  margin-left: 36px;
}
.lang-trigger {
  appearance: none;
  font-family: 'Shippori Mincho', serif;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  color: var(--ash);
  /* ink3 のアルファで面を軽く持ち上げ、矢印は rust のアクセント */
  background-color: rgba(20, 30, 38, 0.45);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23c47a3a' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 10px 6px;
  border: 1px solid var(--border);
  border-radius: 0;
  padding: 7px 30px 7px 12px;
  cursor: pointer;
  transition:
    color 0.3s,
    border-color 0.3s,
    background-color 0.3s,
    box-shadow 0.3s;
}
.lang-trigger:hover,
.lang-select.open .lang-trigger {
  color: var(--parchment);
  border-color: var(--border-b);
  background-color: rgba(20, 30, 38, 0.7);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23d4c4a0' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
}
.lang-trigger:focus-visible {
  color: var(--parchment);
  border-color: var(--rust);
  outline: none;
  /* copper のアルファでフォーカスリング（新色不使用） */
  box-shadow: 0 0 0 3px rgba(160, 97, 42, 0.16);
}
.lang-menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  z-index: 700;
  min-width: 100%;
  list-style: none;
  padding: 4px 0;
  background: var(--ink2);
  border: 1px solid var(--border-b);
  border-radius: 0;
  animation: lang-fade 0.18s ease-out;
}
.lang-menu li {
  font-family: 'Shippori Mincho', serif;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  color: var(--ash);
  padding: 8px 14px;
  cursor: pointer;
  white-space: nowrap;
  transition:
    color 0.2s,
    background-color 0.2s;
}
.lang-menu li:hover,
.lang-menu li.highlight {
  color: var(--parchment);
  background-color: rgba(20, 30, 38, 0.7);
}
.lang-menu li.active {
  color: var(--rust);
}
@keyframes lang-fade {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
    flex-wrap: wrap;
    row-gap: 6px;
    padding: 10px 24px;
  }
  .nav-logo {
    font-size: 1rem;
  }
  .nav-logo span {
    font-size: 0.65rem;
  }
  .nav-links {
    order: 3;
    flex: 1 1 100%;
    justify-content: flex-end;
    margin-left: 0;
    gap: 24px;
  }
  .lang-select {
    order: 2;
    margin-left: auto;
  }
}
@media (max-width: 480px) {
  nav {
    padding: 10px 16px;
  }
  .nav-links {
    gap: 16px;
    flex-wrap: wrap;
  }
  .nav-links li a {
    font-size: 0.74rem;
    letter-spacing: 0.18em;
  }
  .lang-trigger {
    font-size: 0.65rem;
    padding: 6px 28px 6px 10px;
  }
  .lang-menu li {
    font-size: 0.65rem;
    padding: 7px 12px;
  }
}
</style>
