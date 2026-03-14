<template>
  <div class="page active" id="page-home">
    <section class="hero">
      <!-- Kamon badge -->
      <ClanBadge></ClanBadge>

      <p class="hero-eyebrow">茨城 — 海と山の地より</p>
      <h1 class="hero-title">
        豪族会
        <span class="sub">〜 GOZOKUKAI 〜</span>
      </h1>
      <div class="brush-rule"></div>
      <p class="hero-desc">
        茨城の荒海と筑波の山嶺に育まれし者どもが集う。<br />
        豪族の名の下、縁を結び、歴史を刻む。
      </p>
      <div class="hero-cta">
        <button class="btn-clan" @click="go('/schedule')">開催履歴を見る</button>
      </div>
    </section>

    <!-- Members -->
    <div class="members-section">
      <div class="section-header">
        <p class="section-en">Clan Members</p>
        <h2 class="section-ja">メンバー</h2>
      </div>
      <div class="member-list">
        <div class="member-row" v-for="(member, idx) in members" :key="member.id">
          <div class="member-rank" :class="{ main: idx === 0 }">{{ member.rank }}</div>
          <div class="member-avatar">{{ member.initial }}</div>
          <div class="member-info">
            <p class="member-name">{{ member.name }}</p>
            <p class="member-nickname">— {{ member.note }}</p>
          </div>
          <div class="member-num">{{ member.num }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ClanBadge from '@/components/ClanBadge.vue';
import { go } from '@/libraries/router';
import { Member } from '@/types/Member';

const members: Member[] = [
  { id: 1, name: 'Y.H', rank: '豪族', initial: 'Y', note: '筆頭豪族', num: '01' },
  { id: 2, name: 'H.I', rank: '平民', initial: 'H', note: 'パチモンのやんす', num: '02' },
  { id: 3, name: 'T.O', rank: '平民', initial: 'T', note: 'やんすの偽物', num: '03' },
  { id: 4, name: 'K.K', rank: '平民', initial: 'K', note: '元祖 やんす', num: '04' }
];
</script>

<style lang="scss">
// --- Hero Section ---
.hero {
  flex: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
}
.hero-eyebrow {
  font-family: 'Shippori Mincho', serif;
  font-size: 0.65rem;
  letter-spacing: 0.5em;
  color: var(--wave);
  text-transform: uppercase;
  margin-bottom: 16px;
  opacity: 0;
  animation: fade-up 1s 0.5s forwards;
}
.hero-title {
  font-family: 'Shippori Mincho', serif;
  font-size: clamp(3rem, 9vw, 8rem);
  font-weight: 800;
  line-height: 1;
  color: var(--white);
  letter-spacing: 0.08em;
  opacity: 0;
  animation: fade-up 1s 0.65s forwards;
}
.hero-title .sub {
  font-size: 0.4em;
  font-weight: 400;
  color: var(--rust);
  letter-spacing: 0.3em;
  display: block;
  margin-top: 8px;
}
.hero-desc {
  max-width: 420px;
  font-size: 0.8rem;
  line-height: 2.2;
  color: var(--ash);
  letter-spacing: 0.1em;
  margin-top: 24px;
  position: relative;
  z-index: 2;
  opacity: 0;
  animation: fade-up 1s 1.1s forwards;
}
.hero-cta {
  margin-top: 44px;
  opacity: 0;
  animation: fade-up 1s 1.3s forwards;
  z-index: 2;
}
.btn-clan {
  display: inline-block;
  padding: 14px 52px;
  background: transparent;
  border: 1px solid var(--border-b);
  color: var(--rust);
  font-family: 'Shippori Mincho', serif;
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  cursor: pointer;
  transition: all 0.35s;
  clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
}
.btn-clan:hover {
  background: var(--copper);
  color: var(--ink);
  border-color: var(--copper);
}
.brush-rule {
  width: 200px;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--copper) 30%, var(--rust) 60%, transparent);
  margin: 24px auto;
  position: relative;
  opacity: 0;
  animation: fade-up 1s 0.9s forwards;
}
.brush-rule::before {
  content: '';
  position: absolute;
  inset: -3px;
  filter: blur(3px);
  background: inherit;
  opacity: 0.4;
}
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
// --- Member Section ---
.members-section {
  padding: 80px 56px 120px;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}
.section-header {
  margin-bottom: 56px;
}
.section-en {
  font-family: 'Shippori Mincho', serif;
  font-size: 0.6rem;
  letter-spacing: 0.4em;
  color: var(--wave);
  text-transform: uppercase;
  margin-bottom: 8px;
}
.section-ja {
  font-family: 'Shippori Mincho', serif;
  font-size: 2.6rem;
  font-weight: 700;
  color: var(--white);
  letter-spacing: 0.12em;
  line-height: 1.2;
}
.section-ja small {
  font-size: 0.35em;
  color: var(--ash);
  letter-spacing: 0.25em;
  display: block;
  font-weight: 400;
  margin-top: 4px;
}
.member-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.member-row {
  display: grid;
  grid-template-columns: 56px 120px 1fr 48px;
  align-items: center;
  gap: 32px;
  padding: 28px 32px;
  background: var(--ink2);
  border: 1px solid var(--border);
  border-left: 3px solid transparent;
  transition:
    border-left-color 0.3s,
    background 0.3s;
  cursor: default;
  position: relative;
  overflow: hidden;
}
.member-row::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(160, 97, 42, 0.05), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}
.member-row:hover {
  border-left-color: var(--rust);
}
.member-row:hover::before {
  opacity: 1;
}
.member-row:first-child {
  border-left-color: var(--copper);
}
.member-rank {
  font-family: 'Shippori Mincho', serif;
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  color: var(--ash);
  writing-mode: vertical-rl;
  text-orientation: mixed;
}
.member-row:first-child .member-rank {
  color: var(--rust);
}
.member-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--ink3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Shippori Mincho', serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--copper);
  overflow: hidden;
  flex-shrink: 0;
}
.member-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.member-info {
}
.member-name {
  font-family: 'Shippori Mincho', serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--white);
  letter-spacing: 0.1em;
  margin-bottom: 4px;
}
.member-nickname {
  font-size: 0.72rem;
  color: var(--mist);
  letter-spacing: 0.08em;
}
.member-born {
  font-size: 0.65rem;
  color: var(--ash);
  letter-spacing: 0.06em;
  margin-top: 2px;
}
.member-num {
  font-family: 'Shippori Mincho', serif;
  font-size: 2rem;
  font-weight: 800;
  color: rgba(160, 97, 42, 0.15);
  text-align: right;
  line-height: 1;
}
@media (max-width: 768px) {
  .members-section {
    padding: 90px 24px 60px;
  }
  .member-row {
    grid-template-columns: 48px 1fr;
    gap: 16px;
  }
  .member-rank,
  .member-num {
    display: none;
  }
}
</style>
