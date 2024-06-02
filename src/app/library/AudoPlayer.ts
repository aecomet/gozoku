import { Resource } from '@src/types/AudioPlayerResource.ts';

export class AudioPlayer {
  private RESOURCE_PATHS: Resource[] = [
    {
      label: 'se',
      path: 'year/2022/summer/mp3/se.mp3',
      audio: new AudioContext(),
      audioSource: null,
      gainNode: null
    },
    {
      label: 'bgm',
      path: 'year/2022/summer/mp3/bgm.mp3',
      audio: new AudioContext(),
      audioSource: null,
      gainNode: null
    }
  ];

  constructor() {}

  init(): void {
    this.RESOURCE_PATHS.forEach(async (resource: Resource) => {
      // download music
      const response = await fetch(resource.path);

      const arrayBuffer: ArrayBuffer = await response.arrayBuffer();

      // music prepare
      const decodedAudioData: AudioBuffer = await resource.audio.decodeAudioData(arrayBuffer);
      const audioSource: AudioBufferSourceNode = resource.audio.createBufferSource();
      audioSource.buffer = decodedAudioData;

      resource.audioSource = audioSource;
    });
  }

  async playSound(key: string, volume: number = 1.0, isLoop: boolean = false): Promise<void> {
    const sound = this.RESOURCE_PATHS.find((resource: Resource) => resource.label === key);

    if (sound === undefined) return;
    if (sound.audio === null) return;
    if (sound.audioSource === null) return;

    // player setup
    if (isLoop) {
      sound.audioSource.loop = true;
    }

    // prepare volume
    const gainNode: GainNode = sound.audio.createGain();
    gainNode.gain.setValueAtTime(volume, sound.audio.currentTime);
    sound.gainNode = gainNode;

    await sound.audioSource.connect(gainNode);
    await gainNode.connect(sound.audio.destination);
    await sound.audioSource.start();
  }

  async stopSound(key: string): Promise<void> {
    const sound = this.RESOURCE_PATHS.find((resource: Resource) => resource.label === key);

    if (sound === undefined) return;
    if (sound.audio === null) return;
    if (sound.audioSource === null) return;
    if (sound.gainNode === null) return;

    await sound.audioSource.stop();
    await sound.audioSource.disconnect(sound.gainNode);
    await sound.gainNode.disconnect(sound.audio.destination);
    await this.init();
  }

  sleep(timeout: number): Promise<unknown> {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  }
}
