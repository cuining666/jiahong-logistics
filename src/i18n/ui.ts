// 国际化：共享 UI 文案字典 + 辅助函数
import { getRelativeLocaleUrl } from 'astro:i18n';

export const locales = ['zh', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'zh';

// 从路径判断当前语言（/en 开头为英文，其余为中文）
export function getLocale(pathname: string): Locale {
  return pathname.startsWith('/en') ? 'en' : 'zh';
}

const ui: Record<Locale, Record<string, string>> = {
  zh: {
    'nav.home': '首页',
    'nav.about': '关于我们',
    'nav.services': '产品服务',
    'nav.contact': '联系我们',
    'cta.quote': '获取报价',
    'lang.zh': '中文',
    'lang.en': 'English',
    'footer.desc':
      '国家一级货运代理企业，提供海运、空运、国内陆运、仓储、堆场及报关一条龙进出口货运代理服务。',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'cta.quote': 'Get a Quote',
    'lang.zh': '中文',
    'lang.en': 'English',
    'footer.desc':
      'A Class I licensed freight forwarder offering one-stop import/export services: ocean, air, trucking, warehousing, yards and customs clearance.',
  },
};

// 取译文，缺失时回退到中文
export function useTranslations(locale: Locale): (key: string) => string {
  return (key: string) => ui[locale][key] ?? ui[defaultLocale][key] ?? key;
}

// 把基础路径（如 /about）转换为指定语言的链接
export function localize(path: string, locale: Locale): string {
  const base = path.replace(/^\/en/, '') || '/';
  return getRelativeLocaleUrl(locale, base);
}
