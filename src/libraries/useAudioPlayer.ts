import audioBGM from '@/assets/year/2022/summer/mp3/bgm.mp3';
import audioSE from '@/assets/year/2022/summer/mp3/se.mp3';
import type { Resource } from '@/types/AudioPlayerResource';

export function useAudioPlayer() {
  const RESOURCE_PATHS: Resource[] = [
    {
      label: 'se',
      path: audioSE,
      audio: new AudioContext(),
      audioSource: null,
      gainNode: null
    },
    {
      label: 'bgm',
      path: audioBGM,
      audio: new AudioContext(),
      audioSource: null,
      gainNode: null
    }
  ];

  const init = async () => {
    for (const resource of RESOURCE_PATHS) {
      const response = await fetch(resource.path);
      const arrayBuffer = await response.arrayBuffer();
      const decodedAudioData = await resource.audio.decodeAudioData(arrayBuffer);
      const audioSource = resource.audio.createBufferSource();
      audioSource.buffer = decodedAudioData;
      resource.audioSource = audioSource;
    }
  };

  const playSound = async (key: string, volume: number = 1.0, isLoop: boolean = false) => {
    const sound = RESOURCE_PATHS.find((r) => r.label === key);
    if (!sound || !sound.audio || !sound.audioSource) return;

    if (isLoop) {
      sound.audioSource.loop = true;
    }

    const gainNode = sound.audio.createGain();
    gainNode.gain.setValueAtTime(volume, sound.audio.currentTime);
    sound.gainNode = gainNode;

    sound.audioSource.connect(gainNode);
    gainNode.connect(sound.audio.destination);
    sound.audioSource.start();
  };

  const stopSound = async (key: string) => {
    const sound = RESOURCE_PATHS.find((r) => r.label === key);
    if (!sound || !sound.audio || !sound.audioSource || !sound.gainNode) return;

    sound.audioSource.stop();
    sound.audioSource.disconnect(sound.gainNode);
    sound.gainNode.disconnect(sound.audio.destination);
    await init();
  };

  const sleep = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

  return { init, playSound, stopSound, sleep };
}
