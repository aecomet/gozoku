document.addEventListener('DOMContentLoaded', async () => {
  const GOZOKU_TEXT = '2022年夏の豪族回、今年も開幕決定!';
  // audio
  const SE = './mp3/se.mp3';
  const BGM = './mp3/bgm.mp3';

  const audio = {
    bgm: {
      context: new AudioContext(),
      buffer: null,
      bufferNode: null,
      init: async () => {
        const bgmResponse = await fetch(BGM);
        const bgmArrayBuffer = await bgmResponse.arrayBuffer();
        audio.bgm.buffer = await audio.bgm.context.decodeAudioData(bgmArrayBuffer);
        await audio.bgm.prepare();
      },
      prepare: async () => {
        audio.bgm.bufferNode = await audio.bgm.context.createBufferSource();
        audio.bgm.bufferNode.buffer = audio.bgm.buffer;
        audio.bgm.bufferNode.connect(audio.bgm.context.destination);
      }
    },
    se: {
      context: new AudioContext(),
      buffer: null,
      bufferNode: null,
      init: async () => {
        const seResponse = await fetch(SE);
        const seArrayBuffer = await seResponse.arrayBuffer();
        audio.se.buffer = await audio.se.context.decodeAudioData(seArrayBuffer);
        await audio.se.prepare();
      },
      prepare: async () => {
        audio.se.bufferNode = await audio.se.context.createBufferSource();
        audio.se.bufferNode.buffer = audio.se.buffer;
        audio.se.bufferNode.connect(audio.se.context.destination);
      }
    }
  };

  await audio.bgm.init();
  await audio.se.init();

  const util = {
    sleep: (timeout = 200) => {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    },
    playSound: async (key) => {
      audio[key].bufferNode.start(0);
      audio[key].prepare();
    }
  };

  const gozokuNote = document.getElementById('gozoku-note');
  const gozokuBtn = document.getElementById('gozoku-btn');
  const kingText = document.getElementById('king-text');

  gozokuBtn.addEventListener('click', async () => {
    gozokuNote.classList.add('hidden');
    gozokuBtn.classList.add('hidden');
    kingText.classList.add('single-word');

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
