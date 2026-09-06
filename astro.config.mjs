// @ts-check
import { defineConfig } from 'astro/config';

// 静态输出。trailingSlash: 'never' 生成无斜杠规范链接（/about）。
// 部署到 Cloudflare Pages 或 Worker(Static Assets) 均可，但切勿在 _redirects
// 里写“本站自身尾斜杠互转”规则，否则会与平台尾斜杠自动处理冲突导致重定向死循环。
export default defineConfig({
  site: 'https://jiahonglogistics.com',
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
