<template>
  <div id="page-schedule" class="page">
    <PageHeader num="02" en="Event History" ja="開催履歴" sub="豪族の集い" />
    <div class="schedule-grid">
      <div v-for="event in events" :key="event.date" class="event-card">
        <p class="event-date">{{ event.date }}</p>
        <p class="event-title">{{ event.title }}</p>
        <p class="event-place" :class="{ online: event.place.includes('オンライン'), unknown: event.place === '不明' }">
          ◎ {{ event.place }}
        </p>
      </div>
    </div>
    <div class="map-placeholder">
      <LMap v-model:zoom="zoom" :center="center">
        <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap" />
        <template v-for="(event, idx) in events">
          <LMarker v-if="event.lat !== 0 && event.lng !== 0" :key="idx" :lat-lng="[event.lat, event.lng]"
            ><LPopup :options="popupOptions">
              <p>{{ event.date }}</p>
              <p>{{ event.title }}</p>
              <p>{{ event.place }}</p>
            </LPopup>
          </LMarker>
        </template>
      </LMap>
    </div>
  </div>
  <BackgroundElements />
</template>

<script setup lang="ts">
import BackgroundElements from '@/components/BackgroundElements.vue';
import PageHeader from '@/components/PageHeader.vue';
import { LMap, LMarker, LPopup, LTileLayer } from '@/libraries/leaflet.ts';
import { ScheduleEvent } from '@/types/Schedule';
import { onMounted, ref } from 'vue';

const center = ref<[number, number]>([35.681236, 139.767125]);
const zoom = ref(12);
const popupOptions = {
  minWidth: 300
};

const events: ScheduleEvent[] = [
  {
    date: '2025 — 12 — 06',
    title: '研究室飲み会',
    place: 'わらやき 龍馬商店 新橋駅前店',
    lat: 35.665508,
    lng: 139.757817
  },
  {
    date: '2025 — 10 — 25',
    title: '豪族会 H.Iの霊圧が消えた...?',
    place: '焼肉ここから 上野店',
    lat: 35.656963,
    lng: 139.694064
  },
  {
    date: '2025 — 01 — 18',
    title: '豪族会 H.Iまたまた休日出勤の巻',
    place: '四文銭 品川店',
    lat: 35.629001,
    lng: 139.742967
  },
  {
    date: '2024 — 09 — 07',
    title: '豪族会 H.I休日出勤の巻',
    place: '餃子マニア 品川本店',
    lat: 35.626815,
    lng: 139.737315
  },
  {
    date: '2023 — 12 — 02',
    title: '豪族会 〜 研究室',
    place: 'せせらぎを聴きながら 品川駅前店',
    lat: 35.628631,
    lng: 139.742403
  },
  {
    date: '2023 — 08 — 26',
    title: '夏の豪族会',
    place: '四季彩 -shikisai- 品川港南口店',
    lat: 35.628488,
    lng: 139.743209
  },
  {
    date: '2023 — 01 — 06 〜 07',
    title: '豪族会＠日立',
    place: '釜飯と串焼 とりでん 日立多賀店',
    lat: 36.557229,
    lng: 140.629611
  },
  { date: '2022 — 07 — 17', title: '豪族会', place: '権之介 横浜西口店', lat: 35.467302, lng: 139.622143 },
  {
    date: '2021 — 12 — 11',
    title: '帰ってきた豪族会2021',
    place: '全席個室 楽蔵うたげ 八重洲店',
    lat: 35.680594,
    lng: 139.771139
  },
  { date: '2021 — 06 — 11', title: '豪族会', place: 'オンライン', lat: 0, lng: 0 },
  { date: '2020 — 12 — 30', title: '豪族会', place: '不明', lat: 0, lng: 0 },
  { date: '2020 — 08 — 14', title: '豪族会', place: '不明', lat: 0, lng: 0 },
  { date: '2020 — 03 — 14', title: 'プチ豪族会', place: '池田別邸', lat: 0, lng: 0 },
  {
    date: '2019 — 12 — 15',
    title: '豪族会 冬の陣',
    place: 'BARBARA market place 151 新丸ビル店',
    lat: 35.682984,
    lng: 139.764269
  },
  { date: '2019 — 08 — 31', title: '豪族会 夏の陣', place: '炭の豚笑屋 新橋店', lat: 35.66522, lng: 139.757289 },
  { date: '2019 — 08 — 17', title: 'プチ豪族会', place: 'NIKU ROCK 新宿西口店', lat: 35.695356, lng: 139.697894 },
  { date: '2018 — 12 — 29', title: '豪族会', place: 'みなとみらい', lat: 35.459904, lng: 139.634146 },
  { date: '2018 — 07 — 20 〜 21', title: '豪族会', place: '不明', lat: 0, lng: 0 }
];

onMounted(() => {});
</script>

<style scoped>
#page-schedule {
  padding: 100px 56px 80px;
}

.schedule-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 2px;
  max-width: 1100px;
  margin: 0 auto;
}
.event-card {
  background: var(--ink2);
  border: 1px solid var(--border);
  padding: 28px 28px 24px;
  position: relative;
  overflow: hidden;
  transition:
    border-color 0.3s,
    background 0.3s;
  cursor: default;
}
.event-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--ocean), var(--wave), transparent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s;
}
.event-card:hover {
  background: var(--ink3);
  border-color: var(--border-b);
}
.event-card:hover::after {
  transform: scaleX(1);
}
.event-card.first {
  border-color: var(--copper);
}
.event-card.first::after {
  background: linear-gradient(90deg, var(--copper), var(--rust), transparent);
  transform: scaleX(1);
}

.event-date {
  font-size: 0.62rem;
  letter-spacing: 0.15em;
  color: var(--wave);
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 300;
  margin-bottom: 10px;
}
.event-title {
  font-family: 'Shippori Mincho', serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--white);
  letter-spacing: 0.08em;
  line-height: 1.5;
  margin-bottom: 10px;
}
.event-place {
  font-size: 0.7rem;
  color: var(--ash);
  letter-spacing: 0.06em;
  display: flex;
  align-items: center;
  gap: 6px;
}
.event-place::before {
  content: '◎';
  color: var(--copper);
  font-size: 0.55rem;
}
.event-place.online::before {
  content: '◈';
  color: var(--wave);
}
.event-place.unknown {
  color: var(--ink3);
}

.map-placeholder {
  max-width: 1100px;
  margin: 48px auto 0;
  height: 360px;
  background: var(--ink2);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  position: relative;
  overflow: hidden;
  z-index: 100;
}
.map-placeholder::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 35% 60%, rgba(26, 95, 122, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 70% 40%, rgba(42, 74, 53, 0.2) 0%, transparent 40%);
}

@media (max-width: 768px) {
  .schedule-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
