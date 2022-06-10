let isStart = false;

if ('connection' in navigator) {
  if (navigator.connection.type != 'cellular') {
    isStart = true;
  }
}
document.addEventListener('DOMContentLoaded', async () => {
  const GOZOKU_TEXT = '2022年夏の豪族回、今年も開幕決定!';
  const SE = './mp3/se.mp3';
  const BGM = './mp3/bgm.mp3';
  const audio = new Audio();

  if (!isStart) {
    alert('Wifi環境下でページを開いてください。');
    return;
  }

  // 200ミリ秒待つ
  const util = {
    sleep: (timeout = 200) => {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    },
    playSound: async (filename) => {
      audio.src = filename;
      await audio.play();
    },
    isMobile: async () => {
      // デバイス幅が640px以下の場合にスマホと判定する
      return window.matchMedia && window.matchMedia('(max-device-width: 640px)').matches;
    }
  };

  const gozokuNote = document.getElementById('gozoku-note');
  const gozokuBtn = document.getElementById('gozoku-btn');
  const kingText = document.getElementById('king-text');

  await util.sleep();

  gozokuBtn.addEventListener('click', async () => {
    gozokuNote.classList.add('hidden');
    gozokuBtn.classList.add('hidden');
    kingText.classList.add('single-word');

    // 音とともに一文字ずつ表示
    for (let i = 0; i < GOZOKU_TEXT.length; i++) {
      kingText.innerHTML = GOZOKU_TEXT[i];
      await util.playSound(SE);
      if (!isMobile) {
        await util.sleep(200);
      }
    }
    // 全文表示
    kingText.innerHTML = GOZOKU_TEXT;
    kingText.classList.remove('single-word');
    kingText.classList.add('all-words');
    await util.playSound(BGM);
  });
});
