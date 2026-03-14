<template>
  <div id="page-library" class="page">
    <PageHeader num="03" en="Legacy Archive" ja="遺産" sub="眠りし古の遺産達" />
    <div class="legacy-intro">
      <p>ここに眠るのは、豪族会の古き良き時代。忘れ去られた記録と記憶が、静かに息づいている。</p>
    </div>
    <div class="legacy-list">
      <div class="legacy-item" v-for="item in legacyList" :key="item.year + item.season + item.title">
        <div class="legacy-era">
          <p class="legacy-year">{{ item.year }}</p>
          <p class="legacy-season">{{ item.season }}</p>
        </div>
        <div class="legacy-content">
          <p class="legacy-title">{{ item.title }}</p>
          <p class="legacy-note">{{ item.note }}</p>
          <div v-if="item.type === 'video'" class="legacy-video-frame" title="動画を再生">▶</div>
          <button v-else-if="item.type === 'link'" class="legacy-btn">{{ item.actionLabel }}</button>
        </div>
      </div>
    </div>
  </div>
  <BackgroundElements />
</template>

<script setup lang="ts">
interface LegacyItem {
  year: string;
  season: string;
  title: string;
  note: string;
  type: 'video' | 'link';
  actionLabel?: string;
}

const legacyList: LegacyItem[] = [
  {
    year: '2022',
    season: '冬 · WINTER',
    title: '豪族会 — 冬の記録',
    note: '音量に注意してください。',
    type: 'video'
  },
  {
    year: '2022',
    season: '夏 · SUMMER',
    title: '豪族会 — 夏の記録',
    note: '音量に注意してください。',
    type: 'link',
    actionLabel: '記録を開く'
  }
];
import BackgroundElements from '@/components/BackgroundElements.vue';
import PageHeader from '@/components/PageHeader.vue';
</script>

<style scoped>
/* ページ全体 */
#page-library {
  padding: 100px 56px 80px;
}

/* 以下、LegacyList.vueから移植 */
.legacy-intro {
  max-width: 900px;
  margin: 0 auto 56px;
}
.legacy-intro p {
  font-size: 0.8rem;
  color: var(--ash);
  letter-spacing: 0.12em;
  line-height: 2.2;
  font-style: italic;
}

.legacy-list {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.legacy-item {
  background: var(--ink2);
  border: 1px solid var(--border);
  padding: 40px 48px;
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 40px;
  align-items: center;
  transition: border-color 0.3s;
  position: relative;
  overflow: hidden;
}
.legacy-item:hover {
  border-color: var(--border-b);
}
.legacy-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(to bottom, var(--ocean), var(--tsukuba));
  opacity: 0;
  transition: opacity 0.3s;
}
.legacy-item:hover::before {
  opacity: 1;
}

.legacy-era {
  text-align: center;
}
.legacy-year {
  font-family: 'Shippori Mincho', serif;
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--white);
  letter-spacing: 0.1em;
  line-height: 1;
}
.legacy-season {
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  color: var(--wave);
  margin-top: 6px;
  font-family: 'Noto Sans JP', sans-serif;
}

.legacy-content {
  /* Content styles */
}
.legacy-title {
  font-family: 'Shippori Mincho', serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--white);
  letter-spacing: 0.1em;
  margin-bottom: 10px;
}
.legacy-note {
  font-size: 0.7rem;
  color: var(--wave);
  letter-spacing: 0.12em;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.legacy-note::before {
  content: '⚠';
  font-size: 0.65rem;
}
.legacy-btn {
  display: inline-block;
  padding: 8px 28px;
  border: 1px solid var(--border-b);
  color: var(--rust);
  font-family: 'Shippori Mincho', serif;
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  cursor: pointer;
  transition: all 0.3s;
  background: transparent;
}
.legacy-btn:hover {
  background: var(--copper);
  color: var(--ink);
  border-color: var(--copper);
}

.legacy-video-frame {
  width: 240px;
  height: 135px;
  background: var(--ink3);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: var(--ash);
  cursor: pointer;
  transition: border-color 0.3s;
  flex-shrink: 0;
}
.legacy-video-frame:hover {
  border-color: var(--ocean-lt);
  color: var(--wave);
}

@media (max-width: 768px) {
  .legacy-item {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
