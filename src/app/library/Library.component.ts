import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AudioPlayer } from '@src/app/library/AudoPlayer.ts';

@Component({
  selector: 'app-library',
  standalone: true,
  templateUrl: './Library.component.html',
  styleUrl: './Library.component.scss',
  imports: [MatCardModule]
})
export class AppLibrary {
  private audioPlayer: AudioPlayer = new AudioPlayer();
  private GOZOKU_TEXT: string = '夏の豪族回、今年も開幕決定!';
  buttonDisabled = false;

  ngOnInit(): void {
    this.audioPlayer.init();

    // video volume
    const video: HTMLVideoElement | null = document.querySelector('.gozoku-winter video');
    if (video === null) return;
    video.volume = 0.1;
  }

  async onClickPlay() {
    if (this.buttonDisabled) return;

    this.buttonDisabled = true;
    const kingText: HTMLElement | null = document.querySelector('.king-text');

    if (kingText === null) return;

    kingText.innerHTML = '';
    kingText.classList.add('single-word');

    // 音とともに一文字ずつ表示
    await this.audioPlayer.playSound('se', 0.3, true);
    for (let i = 0; i < this.GOZOKU_TEXT.length; i++) {
      kingText.innerHTML = this.GOZOKU_TEXT[i];
      await this.audioPlayer.sleep(300);
    }

    // 全文表示
    kingText.innerHTML = this.GOZOKU_TEXT;
    kingText.classList.remove('single-word');
    kingText.classList.add('all-words');
    await this.audioPlayer.playSound('bgm', 0.3);
    await this.audioPlayer.stopSound('se');
    await this.audioPlayer.sleep(3500);
    this.buttonDisabled = false;
  }
}
