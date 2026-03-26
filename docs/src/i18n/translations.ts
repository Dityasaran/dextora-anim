export type Locale = 'en' | 'ja';

export function getLocaleFromPath(pathname: string): Locale {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '');
  const path = pathname.replace(base, '');
  return path.startsWith('/ja') ? 'ja' : 'en';
}

export function getLocalizedPath(path: string, locale: Locale, base: string): string {
  if (locale === 'ja') {
    return `${base}ja/${path}`;
  }
  return `${base}${path}`;
}

export const translations = {
  en: {
    nav: {
      docs: 'Docs',
      playground: 'Playground',
    },
    sidebar: {
      gettingStarted: 'Getting Started',
      installationSetup: 'Installation & Setup',
      coreConcepts: 'Core Concepts',
      animations: 'Animations',
      triggers: 'Triggers',
      stagger: 'Stagger',
      attributes: 'Attributes',
      advanced: 'Advanced',
      responsive: 'Responsive',
      antiFouc: 'Anti-FOUC',
      tools: 'Tools',
      inspector: 'data-anim Inspector',
      guides: 'Guides',
      typescript: 'TypeScript',
      integration: 'Integration',
    },
  },
  ja: {
    nav: {
      docs: 'ドキュメント',
      playground: 'プレイグラウンド',
    },
    sidebar: {
      gettingStarted: 'はじめに',
      installationSetup: 'インストールとセットアップ',
      coreConcepts: '基本コンセプト',
      animations: 'アニメーション',
      triggers: 'トリガー',
      stagger: 'スタガー',
      attributes: '属性',
      advanced: '応用',
      responsive: 'レスポンシブ',
      antiFouc: 'Anti-FOUC',
      tools: 'ツール',
      inspector: 'data-anim Inspector',
      guides: 'ガイド',
      typescript: 'TypeScript',
      integration: 'インテグレーション',
    },
  },
} as const;
