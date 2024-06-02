export type Resource = {
  label: string;
  path: string;
  audio: AudioContext;
  audioSource: AudioBufferSourceNode | null;
  gainNode: GainNode | null;
};
