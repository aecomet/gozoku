// mp3ファイルの音声を再生
class Sound {
  audio;

  constructor() {
    this.audio = new Audio();
  }

  play(filename) {
    this.audio.src = filename;
    this.audio.play();
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const BGM = './mp3/bgm.mp3';
  const KASYA = './mp3/kasya.mp3';
  const GOZOKU_TEXT = '2022年夏の豪族回、今年も開幕決定';

  // 200ミリ秒待つ
  const util = {
    sleep: () => {
      return new Promise((resolve) => setTimeout(resolve, 200));
    }
  };

  const sound = new Sound();
  const kingText = document.getElementById('king-text');

  await util.sleep();

  kingText.classList.add('single-word');

  // 音とともに一文字ずつ表示
  for (let i = 0; i < GOZOKU_TEXT.length; i++) {
    kingText.innerHTML = '';
    kingText.innerHTML = GOZOKU_TEXT[i];
    sound.play(KASYA);

    // 200ミリ秒待つ
    await util.sleep();
  }
  // 全文表示
  kingText.innerHTML = GOZOKU_TEXT;
  kingText.classList.remove('single-word');
  kingText.classList.add('all-words');
  sound.play(BGM);
});
