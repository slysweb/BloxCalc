# BloxCalc

基于 **Next.js 15**（App Router）与 **next-intl** 的多语言静态站点，使用 `output: 'export'` 生成纯静态资源，适合部署到 **Cloudflare Pages** 或任意静态托管。

## 技术栈

- Next.js 15、React 19、TypeScript  
- [next-intl](https://next-intl.dev/)，路由前缀：`/en`、`/ja`、`/zh`、`/pt`、`/th`  
- 游戏数据：`data/games/*.json` + `manifest.json`  
- 构建产物目录：`out/`  
- Cloudflare：仓库根 **`wrangler.jsonc`** 中的 **`pages_build_output_dir`** 指向 `./out`（新版控制台若**没有**单独的「Build output directory」字段，可用此文件声明静态输出目录；详见下文）

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

仓库里已包含 **`wrangler.jsonc`**：`pages_build_output_dir` 为 **`./out`**，与 Next 静态导出一致。请把其中的 **`name`** 改成你在 Cloudflare 上创建的 **Pages 项目名称**（与 Dashboard 里显示的一致）。

### 界面 A：有「Build output directory」、Deploy command 可留空

1. **Framework preset**：`None`（勿选会走 SSR / OpenNext 的 Next 预设）。  
2. **Build command**：`npm run build`  
3. **Build output directory**：`out`  
4. **Deploy command**：留空即可（由 Pages 直接发布 `out`）。  

### 界面 B：没有「Build output directory」、且 Deploy command 必填（你当前情况）

这是 **「先构建，再用 Wrangler 发布 Pages」** 的流程：静态输出目录由 **`wrangler.jsonc`** 的 **`pages_build_output_dir`** 标明；控制台里不再单独出现一项「输出目录」也属正常。

请按下面填写（**Path** 一般为仓库根 `/`；若 Pages 的「根目录」指向子文件夹，则 Path 填该子路径，例如 `/BloxCalc`）：

| 字段 | 建议值 |
|------|--------|
| **Build command** | `npm run build` |
| **Deploy command** | `npm run pages:deploy`（等价于 `npx wrangler pages deploy out`） |
| **Path** | 执行上述命令的目录，单体仓库多为 `/` |

**不要**填 `npx wrangler deploy`：那是 **Workers** 部署，会误触 OpenNext，并在静态导出项目上出现 `pages-manifest.json` 缺失等错误。

Git 集成构建环境下，流水线通常会提供可用的 API 凭据；**若本地执行** `npm run pages:deploy`，需先按 [Wrangler 登录](https://developers.cloudflare.com/workers/wrangler/install-and-update/) 完成鉴权。

### Deploy 失败：`Authentication error [code: 10000]`

日志里若出现 **「authenticating via … `CLOUDFLARE_API_TOKEN`」** 且请求 `/pages/projects/…` 返回 **10000**，说明当前使用的 **API Token 没有 Cloudflare Pages 部署所需权限**（或已失效）。

按下面逐项检查：

1. **Pages 项目 → Settings → Environment variables**  
   若你**手动添加**了 **`CLOUDFLARE_API_TOKEN`**：  
   - 该变量会**覆盖**构建环境自带的令牌；权限不足时就会 10000。  
   - **处理**：要么**删掉**该变量（让 Git 集成使用 Cloudflare 为本次构建注入的凭据），要么把它换成下面第 2 步创建的有 **Pages — Edit** 权限的令牌。

2. **新建 API Token（需要保留自定义变量时）**  
   Dashboard → **My Profile** → **API Tokens** → **Create Token**。  
   使用 **「Edit Cloudflare Workers」** 模板，或自定义权限时至少包含：  
   - **Account** → **Cloudflare Pages** → **Edit**（以及通常需要的 Account 只读项，按创建向导提示勾选）。  
   创建后把新 token 填回 Pages 环境变量 **`CLOUDFLARE_API_TOKEN`**（不要提交到 Git）。

3. **确认 `wrangler.jsonc` 里的 `name`** 与当前账号下 **Pages 项目名称** 完全一致（否则可能在鉴权通过后出现「项目不存在」类错误）。

更多说明见官方文档：[API token 与权限](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/)。

### 通用说明

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**，选择仓库与分支。  
2. **Framework preset**：`None`。  
3. **Environment variables**：按需设置 `NEXT_PUBLIC_SITE_URL`、Node 版本（如 `NODE_VERSION=22`）等。**不要随意设置 `CLOUDFLARE_API_TOKEN`**，除非你明确需要用它覆盖默认构建凭据且已为该令牌勾选 **Cloudflare Pages — Edit**（见上一节）。  
4. monorepo 时，在 Pages 设置里配置 **Root directory**（例如 `BloxCalc`），并与 **Path** 一致。

### 本地仅用命令行发布（可选）

```bash
npm run build
npm run pages:deploy
```

若项目名称与 `wrangler.jsonc` 的 `name` 不一致，可使用：

`npx wrangler pages deploy out --project-name=<你的 Pages 项目名称>`

详见 [wrangler pages deploy](https://developers.cloudflare.com/workers/wrangler/commands/pages/#deploy)。

### 关于 `wrangler.jsonc` 与 Dashboard

在部分配置方式下，带 **`pages_build_output_dir`** 的 Wrangler 文件会成为 **配置来源**之一；修改 `name`、输出目录等后，请与 Cloudflare 项目设置保持一致。若你更希望完全在网页里配置、不使用仓库内的 Wrangler 文件，可自行删除 `wrangler.jsonc` 并改用控制台提供的字段（以你账号下当前产品界面为准）。

## 项目结构（摘要）

- `src/app/`：App Router 页面与布局  
- `src/app/[locale]/[game-slug]/`：游戏详情与 `calculator` 子路由  
- `src/i18n/`：路由、请求配置、导航封装  
- `data/games/`：游戏 JSON 与 `manifest.json`  
- `messages/`：各语言文案  
- `wrangler.jsonc`：Cloudflare Pages 静态输出目录（`pages_build_output_dir`）与项目名称（`name`）  

## 新增游戏

1. 在 `data/games/` 新增 `{slug}.json`。  
2. 将 `slug` 写入 `data/games/manifest.json` 的 `slugs` 数组。  
3. 重新执行 `npm run build` 以生成新的静态路径。

## 许可证

私有项目或未声明许可证时，请勿在未授权情况下分发。
