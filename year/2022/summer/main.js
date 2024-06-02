document.addEventListener('DOMContentLoaded', async () => {
  const GOZOKU_TEXT = '夏の豪族回、今年も開幕決定!';
  // audio
  const SE = './mp3/se.mp3';
  const BGM = './mp3/bgm.mp3';

  const audio = {
    bgm: {
      context: new AudioContext(),
      buffer: null,
      bufferNode: null
    },
    se: {
      context: new AudioContext(),
      buffer: null,
      bufferNode: null
    },
    init: async (key, music) => {
      const response = await fetch(music);
      const arrayBuffer = await response.arrayBuffer();
      audio[key].buffer = await audio[key].context.decodeAudioData(arrayBuffer);
      await audio.prepare(key);
    },
    prepare: async (key, volume = 1.0) => {
      audio[key].bufferNode = await audio[key].context.createBufferSource();
      audio[key].bufferNode.buffer = audio[key].buffer;

      const gainNode = await audio[key].context.createGain();
      gainNode.gain.setValueAtTime(volume, audio[key].context.currentTime);

      audio[key].bufferNode.connect(gainNode);
      gainNode.connect(audio[key].context.destination);
    }
  };

  await audio.init('bgm', BGM);
  await audio.init('se', SE);

  const util = {
    sleep: (timeout = 200) => {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    },
    playMute: async (key) => {
      await audio.prepare(key, 0);
      await audio[key].bufferNode.start(0);
      await audio.prepare(key);
    },
    playSound: async (key) => {
      await audio[key].bufferNode.start(0);
      await audio.prepare(key);
    }
  };

  const gozokuAlert = document.getElementById('gozoku-alert');
  const gozokuBtn = document.getElementById('gozoku-btn');
  const kingText = document.getElementById('king-text');

  gozokuBtn.addEventListener('click', async () => {
    gozokuAlert.remove();

    kingText.classList.add('single-word');
    await util.playMute('bgm');
    await util.playMute('se');

    // 音とともに一文字ずつ表示
    for (let i = 0; i < GOZOKU_TEXT.length; i++) {
      kingText.innerHTML = GOZOKU_TEXT[i];
      await util.playSound('se');
      await util.sleep(210);
    }
    // 全文表示
    kingText.innerHTML = GOZOKU_TEXT;
    kingText.classList.remove('single-word');
    kingText.classList.add('all-words');
    await util.playSound('bgm');
  });
});
