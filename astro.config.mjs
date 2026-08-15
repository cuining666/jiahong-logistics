// @ts-check
import { defineConfig } from 'astro/config';

// 静态输出，可直接部署到 Cloudflare Pages（无需 adapter）
export default defineConfig({
  site: 'https://jiahonglogistics.com',
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
});
