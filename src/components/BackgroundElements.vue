<template>
  <!-- 筑波山シルエット -->
  <svg id="mountain-bg" viewBox="0 0 1440 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0,300 L0,220 L80,180 L160,200 L220,130 L290,80 L360,110 L420,160 L500,100 L580,40 L640,70 L700,30 L760,60 L820,100 L880,150 L960,90 L1040,120 L1120,160 L1180,200 L1260,170 L1340,210 L1440,190 L1440,300 Z"
      fill="#2a4a35"
    />
    <path
      d="M0,300 L0,250 L100,230 L180,245 L260,220 L340,230 L440,215 L520,240 L620,210 L700,225 L800,200 L900,220 L1000,210 L1100,230 L1200,215 L1300,235 L1440,220 L1440,300 Z"
      fill="#1a3a28"
      opacity="0.7"
    />
  </svg>

  <!-- 波アニメーションCanvas -->
  <canvas id="wave-canvas" ref="waveCanvas" width="1920" height="220"></canvas>

  <!-- 縦書き装飾 -->
  <div class="vert-deco">茨城 — 豪族会 — GOZOKU</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const waveCanvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  const canvas = waveCanvas.value;
  if (!canvas) return;
  let ctx = canvas.getContext('2d');
  if (!ctx) return;
  let W = 0,
    H = 0,
    t = 0;
  function resize() {
    if (!canvas) return;
    W = canvas.width = window.innerWidth;
    H = canvas.height = 220; // 高さは固定値
    ctx = canvas.getContext('2d');
  }
  window.addEventListener('resize', resize);
  resize();
  function drawWaves() {
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    const waves = [
      { amp: 18, freq: 0.012, speed: 0.018, y: 0.55, color: 'rgba(26,95,122,0.5)', lw: 1.5 },
      { amp: 12, freq: 0.018, speed: 0.025, y: 0.68, color: 'rgba(109,184,204,0.35)', lw: 1 },
      { amp: 8, freq: 0.025, speed: 0.032, y: 0.8, color: 'rgba(109,184,204,0.2)', lw: 0.8 },
      { amp: 22, freq: 0.008, speed: 0.012, y: 0.42, color: 'rgba(26,95,122,0.2)', lw: 2 }
    ];
    waves.forEach((w) => {
      if (!ctx) return;
      ctx.beginPath();
      ctx.strokeStyle = w.color;
      ctx.lineWidth = w.lw;
      const baseY = H * w.y;
      for (let x = 0; x <= W; x += 2) {
        const y =
          baseY +
          Math.sin(x * w.freq + t * w.speed * 60) * w.amp +
          Math.sin(x * w.freq * 1.7 + t * w.speed * 40) * w.amp * 0.4;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    });
    t += 0.016;
    requestAnimationFrame(drawWaves);
  }
  drawWaves();
});
</script>

<style scoped>
#mountain-bg {
  position: fixed;
  bottom: 100px;
  left: 0;
  right: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.12;
}

#wave-canvas {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 220px;
  z-index: -1;
  pointer-events: none;
  opacity: 0.35;
}

.vert-deco {
  position: fixed;
  right: 28px;
  top: 50%;
  transform: translateY(-50%);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-family: 'Shippori Mincho', serif;
  font-size: 0.55rem;
  letter-spacing: 0.4em;
  color: rgba(160, 97, 42, 0.3);
  z-index: 20;
  pointer-events: none;
  user-select: none;
}

@media (max-width: 768px) {
  #mountain-bg {
    bottom: 60px;
  }
  #wave-canvas {
    height: 120px;
  }
  .vert-deco {
    right: 8px;
    font-size: 0.45rem;
  }
}
</style>
