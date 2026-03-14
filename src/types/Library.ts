type LinkItem = {
  label: string;
  url: string;
};
export type LegacyItem = {
  year: string;
  season: string;
  title: string;
  note: string;
  type: 'video' | 'music' | 'link' | 'image';
  actionLabel?: string;
  links?: LinkItem[];
  event?: () => void;
};
