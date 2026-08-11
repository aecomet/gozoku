import en from '@/locales/en.json';
import ja from '@/locales/ja.json';
import { createI18n } from 'vue-i18n';

export const LOCALE_STORAGE_KEY = 'locale';

const SUPPORTED_LOCALES = ['ja', 'en'] as const;
export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

function isAppLocale(value: string | null): value is AppLocale {
  return value === 'ja' || value === 'en';
}

function getInitialLocale(): AppLocale {
  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isAppLocale(saved)) return saved;
  } catch {
    // localStorage が使えない環境ではデフォルトにフォールバック
  }
  return 'ja';
}

const initialLocale = getInitialLocale();

export const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: 'ja',
  messages: { ja, en }
});

// <html lang> を初回ロード時にも同期
document.documentElement.lang = initialLocale;

/**
 * 言語を切り替え、localStorage に保存して <html lang> を更新する。
 */
export function setLocale(locale: AppLocale) {
  i18n.global.locale.value = locale;
  document.documentElement.lang = locale;
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // ストレージ保存失敗は無視（閲覧のみのセッションでも動作継続）
  }
}
