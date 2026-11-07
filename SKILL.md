---
name: group-meeting-ppt
description: >-
  Use this skill when the user asks to create or update an academic graduate group meeting
  presentation (.pptx) and companion speech scripts (.md). Enforces a high-density,
  chart-and-figure-driven 4–5 slide structure, embeds verified original figures from PDFs,
  adds bottom-center literature citations on every content slide, visually verifies slide
  exports via PowerPoint COM, and generates both detailed verbatim and 3–5 minute progress
  speech scripts.
---

# 学术组会高密度 PPT 生成技能 (`group-meeting-ppt`)

本技能用于将论文精读、多组实验对比与文献调研计划生成**高信息密度、图表驱动、结构清晰的 4–5 页研究生组会汇报 PPT（`.pptx`）**及**配套口播演讲稿（`.md`）**。

## 1. 核心排版原则与页数规划

1. **精炼 4–5 页高密度结构（根据汇报内容动态适配）**：
   - 摒弃冗长松散的多页纯文字罗列，默认控制在 **4–5 页**（1 页开场封面 + 3–4 页核心内容）：
     - **标准 4 页结构（单篇精读 + 下周文献计划）**：
       - **P1（开场封面页）**：右上角院校/实验室徽标、组会胶囊标签、主副标题、3 张模块导航卡片、底部汇报人信息栏。
       - **P2（任务定义、整体工作流与实验设置）**：左上 2×2 任务类别图标卡片 + 左下嵌入**原论文整体架构图（如 `Figure 4`）** + 右上数据集统计表（`Table 1`）+ 右下专家盲审/数据验证柱状图。
       - **P3（多组实验核心结论并排对比总览）**：**3–4 列并排对比卡片**（每列含顶部实验胶囊、核心指标大字标题、**裁剪自原论文的高清实验图 `Figure 5/6/7/8`**、底部 3 条精炼结论）+ 页面底部方法学局限与实验衔接通栏。
       - **P4（下周计划 / 文献调研）**：**左右双栏高密度结构化卡片**（按两个子方向分栏，每栏顶部提炼共性痛点，内部排列 4 张文献卡片，逐篇列出 `Challenge` 与 `Limitation`）。
     - **扩展 5 页结构（当包含独立的多篇文献定量对比图或个人实验结果页时）**：
       - 在 P3 与末页之间增加 1 页专门展示个人实验结果表格/柱状图或领域基准对比图。
2. **图表优先、文字极简**：
   - 页面主体必须由**论文原图、原生统计图表（`pptxgenjs` 柱状图/折线图）、精简对比表与 Lucide 图标徽章**构成；详细推导与背景解释全部放入配套 `.md` 演讲稿中。
3. **客观严谨的学术表述**：
   - 使用客观学术措辞（如 `微调模型最高：F1 = 0.780`），避免夸张宣传用语。
4. **强制底部单行文献来源标注**：
   - 每个内容页（P2–P4/P5）底部居中位置（`x: 3.65, y: 7.14, w: 8.35, h: 0.22, fontSize: 9.2, align: 'center'`）必须标注单行文献来源：
     - 左侧（`x: 0.55, w: 3.1`）：`汇报人：<姓名>  ·  <实验室名称>  ·  YYYY-MM-DD`
     - 中间（`x: 3.65, w: 8.35`）：`文献来源：Author et al. Paper Title. Venue, Year`（严格控制在单行以内，不换行）
     - 右侧（`x: 12.05, w: 0.73`）：`2 / 4`

---

## 2. 视觉配色与字体规范（16:9 宽屏 `13.333" × 7.5"`）

- **学术浅色高对比度主题**：
  - 主色深海蓝 (`blue`): `#003366` | 亮蓝 (`blue2`): `#1D4ED8` | 浅蓝底 (`blueBg`): `#EBF3FA`
  - 森林绿 (`green`): `#047857` | 浅绿底 (`greenBg`): `#ECFDF5`
  - 琥珀橙 (`orange`): `#D97706` | 浅橙底 (`orangeBg`): `#FFFBEB`
  - 警示红 (`red`): `#B91C1C` | 浅红底 (`redBg`): `#FEF2F2`
  - 学术紫 (`purple`): `#6D28D9` | 浅紫底 (`purpleBg`): `#F5F3FF`
  - 正文深灰 (`ink`): `#111827` | 次级灰 (`sub`): `#374151` | 弱化灰 (`muted`): `#6B7280`
  - 卡片底色 (`pale`): `#F8FAFC` | 边框线 (`line`): `#D1D5DB`
- **字体**：中文与正文统一使用 `Microsoft YaHei`，代码/示例短语使用 `Consolas`。

---

## 3. 论文原图裁剪与防错流程（必做）

> **核心防错规则 —— 严禁配图张冠李戴或题注截断残留**：
> 1. 先将 PDF 各页渲染为高清 PNG（`p1.png`, `p2.png`, ...）。
> 2. 裁剪任何原图前，**必须先查看对应页的 PNG**，确认该页上实际的 `Figure X` 编号，切勿凭页码猜测。
> 3. 裁剪框底部应精确停在 `Figure X:` 题注文字上方，避免截入半行残缺字迹。
> 4. 裁剪完成后，**必须逐张打开生成的 `figX.png` 核对横纵坐标与子图标签**，确保与实验一/二/三/四完全对应（参考 [`scripts/crop_and_verify_figs.cjs`](./scripts/crop_and_verify_figs.cjs)）。

---

## 4. 视觉核验与双版本演讲稿交付

1. **PowerPoint COM 导出 PNG 视觉检查**：
   - 运行 [`scripts/render_slides.ps1`](./scripts/render_slides.ps1) 将生成的 `.pptx` 逐页导出为 PNG（`1600×900`），并逐页检查是否存在胶囊标签换行、表格文字重叠或底部文献来源换行。
2. **同步生成两份配套 Markdown 演讲稿**：
   - **逐页详细演讲稿（8–10 分钟）**：包含完整口播逐字稿、图表解读与 Q&A 备查速答卡（见 [`examples/demo-speech-detailed.md`](./examples/demo-speech-detailed.md)）。
   - **简短进展汇报稿（3–5 分钟，约 850 字）**：只讲个人本周进展、所读论文核心方法与结论、对自身实验的启发以及下周阅读计划（见 [`examples/demo-speech-progress-3min.md`](./examples/demo-speech-progress-3min.md)）。
