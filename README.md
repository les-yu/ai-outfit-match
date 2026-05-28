# 穿搭AI - 拍一件衣服，看它怎么搭

> AI 智能穿搭推荐平台。上传一件衣服的照片，获得 3 套专业搭配方案。

## 产品定位

**「拍一件衣服，看它怎么搭」** —— 解决「买了件衣服不知道怎么穿」的具体痛点。

- 上传任意单品照片 → AI 识别品类、颜色、风格
- 自动生成 3 套完整搭配（通勤 / 约会 / 潮流）
- 每套搭配包含：上装、下装、鞋、配饰 + 配色逻辑

## 功能特性

| 功能 | 说明 |
|------|------|
| 智能识别 | 基于小米 MiMo 多模态能力，精准识别服装品类、颜色、风格 |
| 场景推荐 | 覆盖日常通勤、约会休闲、潮流个性、正式场合、运动活力 |
| 个性定制 | 支持输入身高、体重、风格偏好，获得更精准的推荐 |
| 搭配展示 | 色卡可视化、配色逻辑说明、风格关键词标签 |
| 历史记录 | 本地存储推荐记录，随时回看之前的搭配方案 |
| 一键分享 | 支持原生分享 API / 剪贴板复制 |

## 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 框架 | Next.js 16 | App Router，前后端一体 |
| 语言 | TypeScript | 类型安全 |
| 样式 | Tailwind CSS | 原子化 CSS，快速开发 |
| AI | 小米 MiMo | Anthropic 兼容格式，多模态理解 |
| 部署 | Vercel | 零配置部署 |
| 存储 | localStorage | 客户端历史记录 |

## 项目结构

```
ai-outfit-match/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── recommend/
│   │   │       └── route.ts        # AI 推荐 API
│   │   ├── history/
│   │   │   └── page.tsx            # 历史记录页
│   │   ├── result/
│   │   │   └── page.tsx            # 搭配结果页
│   │   ├── globals.css             # 全局样式
│   │   ├── layout.tsx              # 全局布局
│   │   └── page.tsx                # 首页（上传）
│   ├── components/
│   │   ├── ImageUpload.tsx         # 图片上传组件
│   │   ├── OutfitCard.tsx          # 搭配卡片组件
│   │   ├── SceneSelector.tsx       # 场景选择组件
│   │   ├── ShareButton.tsx         # 分享按钮组件
│   │   └── UserProfile.tsx         # 用户信息组件
│   ├── lib/
│   │   ├── api.ts                  # API 调用封装
│   │   ├── history.ts              # 历史记录管理
│   │   └── prompt.ts               # AI Prompt 工程
│   └── types/
│       └── outfit.ts               # TypeScript 类型定义
├── .env.example                    # 环境变量模板
├── package.json
└── README.md
```

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/les-yu/ai-outfit-match.git
cd ai-outfit-match
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制 `.env.example` 为 `.env.local`，填入你的小米 MiMo API Key：

```bash
cp .env.example .env.local
```

```env
# 从 https://open.mi.com/ 获取
MIMO_API_KEY=your_api_key_here
MIMO_BASE_URL=https://token-plan-cn.xiaomimimo.com/anthropic
MIMO_MODEL=mimo-v2.5-pro
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 即可使用。

## 部署

### Vercel 一键部署

1. Fork 本仓库
2. 在 [Vercel](https://vercel.com) 中导入项目
3. 添加环境变量：`MIMO_API_KEY`、`MIMO_BASE_URL`、`MIMO_MODEL`
4. 点击 Deploy

### 本地构建

```bash
npm run build
npm start
```

## 数据流

```
用户上传图片
    ↓
前端压缩 (canvas, max 1024px)
    ↓
Base64 编码
    ↓
POST /api/recommend
    ↓
小米 MiMo API (Anthropic 兼容格式)
    ↓
结构化 JSON 返回
    ↓
前端渲染搭配卡片
    ↓
保存到 localStorage
```

## 可用模型

| 模型 | 说明 |
|------|------|
| `mimo-v2.5-pro` | 推荐，最新旗舰模型 |
| `mimo-v2.5` | 标准版本 |
| `mimo-v2-pro` | 上一代旗舰 |
| `mimo-v2-omni` | 全模态模型（文本+语音+视觉） |

在 `.env.local` 中修改 `MIMO_MODEL` 即可切换模型。

## 成本估算

| 项目 | 费用 |
|------|------|
| MiMo API 调用 | 以小米开放平台定价为准 |
| Vercel 部署 | 免费额度内 |
| 域名 | ¥50-100/年（可选） |
| **月活 1000 用户** | **约 ¥200-500/月** |

## 开发规范

- **Commit 格式**：`type: 描述`（feat / fix / docs / style / refactor）
- **分支策略**：main 分支为主分支，功能开发在 feature 分支
- **代码风格**：ESLint + Prettier

## 后续规划

- [ ] 接入电商商品链接（搭配推荐 → 购买闭环）
- [ ] 用户账号系统（跨设备同步历史）
- [ ] 衣橱管理（多件单品组合搭配）
- [ ] 社区分享（用户搭配方案 UGC）
- [ ] 分享海报生成（html2canvas）

## License

MIT
