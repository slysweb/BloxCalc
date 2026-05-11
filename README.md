# BloxCalc

基于 **Next.js 15**（App Router）与 **next-intl** 的多语言静态站点，使用 `output: 'export'` 生成纯静态资源，适合部署到 **Cloudflare Pages** 或任意静态托管。

## 技术栈

- Next.js 15、React 19、TypeScript  
- [next-intl](https://next-intl.dev/)，路由前缀：`/en`、`/ja`、`/zh`、`/pt`、`/th`  
- 游戏数据：`data/games/*.json` + `manifest.json`  
- 构建产物目录：`out/`（Cloudflare Pages 的「构建输出目录」应填 `out`）

## 本地开发

```bash
npm install
npm run dev
```

浏览器访问开发服务器（默认 <http://localhost:3000>）。根路径 `/` 会重定向到 `/en`。

## 生产构建

```bash
npm run build
```

静态文件输出在 **`out`** 目录。部署前可用本地静态服务器预览，例如：

```bash
npx serve out
```

## 环境变量（可选）

| 变量 | 说明 |
|------|------|
| `NEXT_PUBLIC_SITE_URL` | 站点根 URL，无尾部斜杠，例如 `https://bloxcalc.pages.dev`。用于面包屑 JSON-LD 中的绝对链接；不设置时仍保留站内相对导航。 |

复制为本地环境文件时请勿把含密钥的文件提交到 Git（见 `.gitignore`）。

## 发布到 GitHub

1. 在 GitHub 新建仓库，将本目录作为仓库根目录（若仓库根是父目录 `work/`，请在 Cloudflare 中把「根目录」设为子目录 `BloxCalc`，见下文）。  
2. 提交前确认 **`.gitignore`** 已忽略 `node_modules`、`.next`、`out` 等；若使用 ESLint，可参考 **`.eslintignore`**。使用 Cursor 时，**`.cursorignore`** 可减少对 `node_modules` / 构建目录的索引（不影响 Git）。  
3. `git add`、`git commit`、`git push`。

## 发布到 Cloudflare Pages

### 通过 Dashboard 连接 GitHub

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**。  
2. 选择仓库与分支。  
3. **构建设置**：  
   - **Framework preset**：`None`（或按需选择；本项目是纯静态导出，不依赖 Pages 的 Next.js SSR 预设）。  
   - **Build command**：`npm run build`  
   - **Build output directory**：`out`  
4. 若仓库根目录**不是**本项目（例如 monorepo），在 Pages 项目设置里将 **Root directory** 设为 **`BloxCalc`**（或你的子目录名）。  
5. **Environment variables**：按需添加 `NEXT_PUBLIC_SITE_URL`（生产域名）。  
6. **Node 版本**：建议使用 **20.x** 或 **22.x**（与本地一致可减少差异）。可在 Pages → Settings → Environment variables 中设置 `NODE_VERSION=20`，或在仓库根放置 `.nvmrc` / `package.json` 的 `engines` 字段（视 Pages 解析策略而定）。

首次部署完成后，每次推送到设定分支会自动构建与发布。

### 使用 Wrangler CLI（可选）

已安装 [Wrangler](https://developers.cloudflare.com/workers/wrangler/) 时，可在构建后执行：

```bash
npm run build
npx wrangler pages deploy out --project-name=<你的项目名称>
```

具体参数以当前 Wrangler 文档为准。

## 项目结构（摘要）

- `src/app/`：App Router 页面与布局  
- `src/app/[locale]/[game-slug]/`：游戏详情与 `calculator` 子路由  
- `src/i18n/`：路由、请求配置、导航封装  
- `data/games/`：游戏 JSON 与 `manifest.json`  
- `messages/`：各语言文案  

## 新增游戏

1. 在 `data/games/` 新增 `{slug}.json`。  
2. 将 `slug` 写入 `data/games/manifest.json` 的 `slugs` 数组。  
3. 重新执行 `npm run build` 以生成新的静态路径。

## 许可证

私有项目或未声明许可证时，请勿在未授权情况下分发。
