# 江苏嘉弘国际货运代理 — 静态官网

基于 **Astro** 构建的轻量企业官网，替代原 WordPress 站点。纯静态输出，可零成本部署到 Cloudflare Pages。

## 为什么迁移

| 维度 | 原 WordPress.com | 本方案 (Astro + Cloudflare Pages) |
|------|------------------|-----------------------------------|
| 年度费用 | 套餐+域名 $382.87 ≈ ¥2580 | Cloudflare Pages 免费 + 域名 ≈ ¥74（域名 $11/年）|
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

代码仓库：`https://github.com/cuining666/jiahong-logistics`（分支 `main`）。

1. 登录 Cloudflare 控制台（账号 `cuining_tarena@outlook.com`）→ **Workers & Pages** → **Create** → **Pages** → **连接到 Git**。
2. 授权连接 GitHub，选择仓库 `cuining666/jiahong-logistics`。
3. 构建设置：
   - **Framework preset**: `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Branch**: `main`
4. 点击 **Save and Deploy**，等待构建完成（约 1-2 分钟）。
5. 部署成功后获得 `*.pages.dev` 临时域名，可先验证页面。
6. 在 **自定义域** 中绑定 `jiahonglogistics.com`（需域名 DNS 已切到 Cloudflare，见下）。

> 旧 WordPress 的带尾斜杠 URL（`/about/` 等）已在 `public/_redirects` 中配置 301 跳转，部署后自动生效，无需在控制台手动添加。

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
├── public/               # 静态资源 (favicon, robots.txt, _redirects)
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
