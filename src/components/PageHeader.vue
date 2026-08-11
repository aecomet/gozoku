<template>
  <div class="page-head">
    <div class="page-head-num">{{ num }}</div>
    <div class="page-head-right">
      <p class="section-en">{{ locale === 'ja' ? en : ja }}</p>
      <h2 class="section-ja">
        {{ locale === 'ja' ? ja : en }}<small v-if="displaySub">{{ displaySub }}</small>
      </h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = withDefaults(
  defineProps<{
    num: string;
    en: string;
    ja: string;
    sub: string;
    subEn?: string;
  }>(),
  { subEn: '' }
);

const { locale } = useI18n();
const displaySub = computed(() => (locale.value === 'ja' ? props.sub : props.subEn));
</script>

<style scoped>
/* ==== PageHeader.vue専用 ==== */
.page-head {
  max-width: 1100px;
  margin: 0 auto 52px;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.page-head-num {
  font-family: 'Shippori Mincho', serif;
  font-size: 5rem;
  font-weight: 800;
  color: rgba(160, 97, 42, 0.12);
  line-height: 1;
}
.page-head-right {
  text-align: right;
}
.section-en {
  font-family: 'Shippori Mincho', serif;
  font-size: 0.6rem;
  letter-spacing: 0.4em;
  color: var(--wave);
  text-transform: uppercase;
  margin-bottom: 8px;
  text-align: right;
}
.section-ja {
  font-family: 'Shippori Mincho', serif;
  font-size: 2.6rem;
  font-weight: 700;
  color: var(--white);
  letter-spacing: 0.12em;
  line-height: 1.2;
  text-align: right;
}
.section-ja small {
  font-size: 0.35em;
  color: var(--ash);
  letter-spacing: 0.25em;
  display: block;
  font-weight: 400;
  margin-top: 4px;
}
@media (max-width: 768px) {
  .page-head {
    padding: 18px 0 16px 0;
  }
  .page-head-num {
    font-size: 2.8rem;
  }
  .section-ja {
    font-size: 1.3rem;
  }
}
</style>
