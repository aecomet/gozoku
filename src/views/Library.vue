<template>
  <div id="page-library" class="page">
    <PageHeader
      num="03"
      :en="t('library.header.en')"
      :ja="t('library.header.ja')"
      :sub="t('library.header.sub')"
      :sub-en="t('library.header.subEn')"
    />
    <div class="legacy-intro">
      <p>{{ t('library.intro') }}</p>
    </div>
    <div class="legacy-list">
      <div class="legacy-item" v-for="item in legacyList" :key="item.year + item.season + item.title">
        <div class="legacy-era">
          <p class="legacy-year">{{ item.year }}</p>
          <p class="legacy-season">{{ t(item.season) }}</p>
        </div>
        <div class="legacy-content">
          <p class="legacy-title">{{ t(item.title) }}</p>
          <p class="legacy-note">{{ t(item.note) }}</p>

          <!-- 動画 -->
          <video controls v-if="item.type === 'video'" class="legacy-video-frame" volume="0.3">
            <source :src="winterGozoku" type="video/mp4" />
          </video>
          <!-- 音楽 -->
          <div v-else-if="item.type === 'music'">
            <button class="legacy-btn" @click.prevent="item.event" :disabled="buttonDisabled">
              {{ t(item.actionLabel ?? '') }}
            </button>

            <p class="king-text"></p>
          </div>
          <!-- 画像 -->
          <div v-else-if="item.type === 'image'" class="legacy-image-list">
            <figure v-for="(link, idx) in item.links" :key="idx" class="legacy-image-figure">
              <img :src="link.url" :alt="t(link.label)" class="legacy-image" />
              <figcaption class="legacy-caption">{{ t(link.label) }}</figcaption>
            </figure>
          </div>

          <!-- リンク -->
          <div v-else-if="item.type === 'link'">
            <a
              v-for="(link, idx) in item.links"
              :key="idx"
              :href="link.url"
              class="legacy-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ t(link.label) }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <BackgroundElements />
</template>

<script setup lang="ts">
import winterGozoku from '@/assets/year/2022/winter/2022-winter_gozoku.mp4';
import archiveGozokuHome from '@/assets/year/2026/spring/archive-gozoku-home.webp';
import archiveGozokuLibrary from '@/assets/year/2026/spring/archive-gozoku-library.webp';
import archiveGozokuSchedule from '@/assets/year/2026/spring/archive-gozoku-schedule.webp';
import BackgroundElements from '@/components/BackgroundElements.vue';
import PageHeader from '@/components/PageHeader.vue';
import { useAudioPlayer } from '@/libraries/useAudioPlayer';
import { LegacyItem } from '@/types/Library';
import { onBeforeMount, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const { init, playSound, stopSound, sleep } = useAudioPlayer();
const buttonDisabled = ref(false);

// 言語依存の文字列（season / title / note / actionLabel / link.label）は翻訳キーを保持し、テンプレートで t() を適用する
const legacyList: LegacyItem[] = [
  {
    year: '2026',
    season: 'library.legacy.0.season',
    title: 'library.legacy.0.title',
    note: 'library.legacy.0.note',
    type: 'link',
    links: [
      {
        url: 'https://aecomet.github.io/gozoku/summer-2026/',
        label: 'library.legacy.0.links.0.label'
      }
    ]
  },
  {
    year: '2026',
    season: 'library.legacy.1.season',
    title: 'library.legacy.1.title',
    note: 'library.legacy.1.note',
    type: 'link',
    actionLabel: 'library.legacy.1.actionLabel',
    links: [
      {
        url: 'https://aecomet.github.io/celebrate-kk/',
        label: 'library.legacy.1.links.0.label'
      }
    ]
  },
  {
    year: '2026',
    season: 'library.legacy.2.season',
    title: 'library.legacy.2.title',
    note: 'library.legacy.2.note',
    type: 'image',
    links: [
      {
        url: archiveGozokuHome,
        label: 'library.legacy.2.links.0.label'
      },
      {
        url: archiveGozokuLibrary,
        label: 'library.legacy.2.links.1.label'
      },
      {
        url: archiveGozokuSchedule,
        label: 'library.legacy.2.links.2.label'
      }
    ]
  },
  {
    year: '2022',
    season: 'library.legacy.3.season',
    title: 'library.legacy.3.title',
    note: 'library.legacy.3.note',
    type: 'video',
    links: []
  },
  {
    year: '2022',
    season: 'library.legacy.4.season',
    title: 'library.legacy.4.title',
    note: 'library.legacy.4.note',
    type: 'music',
    actionLabel: 'library.legacy.4.actionLabel',
    event: async () => {
      if (buttonDisabled.value) return;

      buttonDisabled.value = true;
      const kingText = document.querySelector('.king-text') as HTMLElement | null;
      if (!kingText) return;
      kingText.innerHTML = '';
      kingText.classList.add('single-word');
      // クリック時点の言語で文言を取得し、音とともに一文字ずつ表示
      const gozokuText = t('library.gozokuText');
      await playSound('se', 0.3, true);
      for (let i = 0; i < gozokuText.length; i++) {
        kingText.innerHTML = gozokuText[i];
        await sleep(300);
      }
      // 全文表示
      kingText.innerHTML = gozokuText;
      kingText.classList.remove('single-word');
      kingText.classList.add('all-words');
      await playSound('bgm', 0.3);
      await stopSound('se');
      await sleep(3500);
      buttonDisabled.value = false;
    }
  }
];

onBeforeMount(() => {
  init();
});
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

.legacy-btn:disabled,
.legacy-btn[disabled] {
  background: var(--ash);
  color: var(--ink3);
  border-color: var(--ash);
  cursor: not-allowed;
  opacity: 0.6;
}
.legacy-content {
  overflow: auto;
}

.legacy-video-frame {
  min-width: 240px;
  width: 500px;
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

.king-text {
  margin-top: 32px;
  text-align: center;

  &.single-word {
    font-size: 24px;
    font-style: italic;
    padding: 8px;
    text-align: center;
  }

  &.all-words {
    font-size: 24px;
    font-weight: bold;
    font-style: italic;
    padding: 8px;
  }
}

.legacy-image-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 8px;
}

.legacy-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 4px;
  object-fit: cover;
}
.legacy-image {
  max-width: 100%;
  height: auto;
  display: block;
  margin-bottom: 8px;
  border-radius: 4px;
}
.legacy-image-figure {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.legacy-caption {
  font-size: 0.7rem;
  color: var(--ash);
  margin-top: 4px;
  text-align: center;
  word-break: break-word;
}

@media (min-width: 600px) {
  .legacy-image-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  #page-library {
    padding: 90px 24px 60px;
  }
  .legacy-item {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .legacy-video-frame {
    width: 240px;
  }
}
</style>
