# 江苏嘉弘国际货运代理 — 静态官网

基于 **Astro** 构建的轻量企业官网，替代原 WordPress 站点。纯静态输出，可零成本部署到 Cloudflare Pages。

## 为什么迁移

| 维度 | 原 WordPress | 本方案 (Astro + Cloudflare Pages) |
|------|-------------|-----------------------------------|
| 年度费用 | 主机+域名+插件+安全 ≈ ¥1500+ | 仅域名 ≈ ¥100 |
| 加载速度 | 3-7 秒（插件拖累） | 0.3-1 秒 |
| 安全性 | 需持续更新插件/补丁 | 无数据库、无后台、无插件 |
| 维护 | 每周插件更新、备份 | 零维护 |
| 可移植性 | 数据库+PHP 绑定 | 纯 HTML，任意平台可托管 |

## 本地开发

```bash
npm install      # 安装依赖
npm run dev      # 本地预览 http://localhost:4321
npm run build    # 构建到 dist/
npm run preview  # 预览构建产物
```

## 部署到 Cloudflare Pages

1. 在 Cloudflare Pages 新建项目，连接 Git 仓库（或手动上传 `dist/`）。
2. 构建设置：
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
3. 部署完成后，在「自定义域」中绑定 `jiahonglogistics.com`。
4. 在域名注册商处将 DNS 改为 Cloudflare 提供的 Nameserver。

无需安装 `@astrojs/cloudflare` 适配器——本项目使用默认静态输出（`output: 'static'`），Cloudflare Pages 直接托管静态文件即可。

## 域名 DNS 切换与 301 重定向

切换 DNS 后，原 WordPress 的 URL 结构（`/about/`、`/offerings/` 等带尾斜杠）与新站（`/about` 无尾斜杠）不同，需在 Cloudflare Pages 规则中配置重定向，避免 SEO 权重流失：

在 Cloudflare 控制台 → Pages → 项目 → **设置 → 重定向** 添加：

```
/about/    ->  /about    301
/offerings/ -> /offerings 301
/contact/  ->  /contact   301
```

或在仓库根目录添加 `_redirects` 文件：

```
/about/      /about      301
/offerings/  /offerings  301
/contact/    /contact    301
```

## 内容维护

所有内容在 `src/pages/*.astro` 中以纯文本维护，修改后重新 `npm run build` 并部署即可。如需非技术人员编辑，可接入 [Decap CMS](https://decapcms.org/) 或 Netlify CMS 实现可视化后台。

## 目录结构

```
jiahong-logistics/
├── astro.config.mjs      # 站点配置
├── package.json
├── public/               # 静态资源 (favicon, robots.txt)
├── src/
│   ├── layouts/Layout.astro   # 全局布局(头部/底部)
│   ├── pages/                  # 页面: index / about / offerings / contact
│   └── styles/global.css       # 全局样式
└── README.md
```

## 后续可选增强

- 接入地图嵌入（高德/Google Maps）
- 多语言（中英双语）
- 在线询价表单（Cloudflare Workers / Formspree）
- 图片资源优化与 CDN 缓存
