<template>
  <div class="kamon">
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(160,97,42,0.4)" stroke-width="1" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(160,97,42,0.25)" stroke-width="0.5" />
      <!-- stylized wave/mountain kamon -->
      <path
        d="M50,18 L58,36 L76,38 L63,51 L66,69 L50,61 L34,69 L37,51 L24,38 L42,36 Z"
        fill="none"
        stroke="rgba(160,97,42,0.7)"
        stroke-width="1.2"
      />
      <path
        d="M50,28 L55,38 L66,39 L58,47 L60,58 L50,53 L40,58 L42,47 L34,39 L45,38 Z"
        fill="rgba(160,97,42,0.1)"
        stroke="rgba(160,97,42,0.4)"
        stroke-width="0.6"
      />
      <!-- wave lines at bottom -->
      <path d="M30,74 Q40,70 50,74 Q60,78 70,74" fill="none" stroke="rgba(109,184,204,0.5)" stroke-width="1" />
      <path d="M28,80 Q38,76 50,80 Q62,84 72,80" fill="none" stroke="rgba(109,184,204,0.3)" stroke-width="0.8" />
    </svg>
  </div>
</template>

<style scoped>
/* Kamon-like geometric badge */
.kamon {
  width: 90px;
  height: 90px;
  margin: 0 auto 36px;
  position: relative;
  opacity: 0;
  animation: fade-up 1s 0.2s forwards;
  z-index: 2;
}
.kamon svg {
  width: 100%;
  height: 100%;
}

@media (max-width: 768px) {
  .kamon {
    width: 64px;
    height: 64px;
    margin-bottom: 24px;
  }
}
</style>
