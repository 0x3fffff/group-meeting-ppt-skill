/**
 * v2.0 Desensitized 5-Slide Content-Driven Demo Builder
 * for the public GitHub repository `group-meeting-ppt-skill`.
 *
 * - Zero personal names, zero real university logos, zero hardcoded local paths.
 * - Demonstrates the v2.0 Restrained 4-Color Deep-Anchor Academic Palette
 *   (#003366 Navy + #1E4E8C Steel + #047857 Green + #991B1B Crimson)
 *   and flexible content-driven layouts across 5 distinct slide structures.
 *
 * Usage:
 *   npm install pptxgenjs lucide sharp
 *   node examples/build_demo.cjs
 */

const path = require('path');
const fs = require('fs');

function loadPkg(name) {
  if (process.env.PPTX_NODE_MODULES) {
    return require(path.join(process.env.PPTX_NODE_MODULES, name));
  }
  return require(name);
}

const PptxGenJS = loadPkg('pptxgenjs');
const lucide = loadPkg('lucide');
const sharp = loadPkg('sharp');

const REPO_DIR = path.resolve(__dirname, '..');
const ICON_DIR = path.join(REPO_DIR, 'resources/icons');
const FIG_DIR = path.join(REPO_DIR, 'resources/demo_figs');
const PREVIEW_DIR = path.join(REPO_DIR, 'resources/preview');

fs.mkdirSync(ICON_DIR, { recursive: true });
fs.mkdirSync(FIG_DIR, { recursive: true });
fs.mkdirSync(PREVIEW_DIR, { recursive: true });

// v2.0 四色克制深浅平衡配色方案（支持切换备选墨绿/暖灰主题）
const C = {
  blue: '003366',
  blue2: '1E4E8C',
  blueBg: 'EBF3FA',
  blueLine: 'BFDBFE',

  green: '047857',
  greenBg: 'ECFDF5',
  greenLine: 'A7F3D0',

  red: '991B1B',
  redBg: 'FEF2F2',
  redLine: 'FECACA',

  ink: '111827',
  sub: '374151',
  muted: '6B7280',
  line: 'D1D5DB',
  pale: 'F8FAFC',
  light: 'F1F5F9',
  white: 'FFFFFF',
};

function iconToSvg(iconNode, strokeColor = '#003366', bgColor = '#EBF3FA') {
  const children = (iconNode || [])
    .map(([tag, attrs]) => {
      const a = Object.entries(attrs || {})
        .map(([k, v]) => `${k}="${String(v)}"`)
        .join(' ');
      return `<${tag} ${a}/>`;
    })
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 40 40">
    <rect x="0" y="0" width="40" height="40" rx="10" fill="${bgColor}"/>
    <g transform="translate(8,8)" fill="none" stroke="${strokeColor}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      ${children}
    </g>
  </svg>`;
}

async function makeIcon(name, pascalName, fg, bg) {
  const out = path.join(ICON_DIR, `${name}.png`);
  const node = lucide[pascalName];
  if (!node) throw new Error(`Missing lucide icon: ${pascalName}`);
  const svg = iconToSvg(node, `#${fg}`, `#${bg}`);
  await sharp(Buffer.from(svg)).png().toFile(out);
  return out;
}

// 通用占位徽标（995 x 293，零真实院校信息）
async function makeGenericLogo() {
  const out = path.join(REPO_DIR, 'resources/lab_logo.png');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="995" height="293" viewBox="0 0 995 293">
    <rect width="995" height="293" fill="#FFFFFF" fill-opacity="0"/>
    <circle cx="145" cy="146" r="110" fill="#EBF3FA" stroke="#003366" stroke-width="10"/>
    <circle cx="145" cy="146" r="82" fill="none" stroke="#1E4E8C" stroke-width="4" stroke-dasharray="10,6"/>
    <polygon points="145,78 202,112 145,146 88,112" fill="#003366"/>
    <rect x="116" y="156" width="58" height="32" rx="6" fill="#1E4E8C"/>
    <text x="296" y="138" font-family="Microsoft YaHei, Arial, sans-serif" font-size="68" font-weight="bold" fill="#003366">AI Research Lab</text>
    <text x="300" y="204" font-family="Arial, sans-serif" font-size="32" font-weight="bold" letter-spacing="4" fill="#6B7280">ACADEMIC SEMINAR SKILL</text>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(out);
  return out;
}

// 生成 5 张脱敏示意论文原图（模拟不同宽高比：竖长流程 / 超宽样本 / 三步架构 / 双雷达图）
async function makeDemoFigs() {
  // 1. 竖长数据构建流水线 (420 x 560, aspect 0.75)
  const f1Svg = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="560" viewBox="0 0 420 560">
    <rect width="420" height="560" rx="12" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>
    <rect x="20" y="18" width="380" height="148" rx="10" fill="#FFFFFF" stroke="#003366" stroke-width="2" stroke-dasharray="6,4"/>
    <text x="210" y="46" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="18" font-weight="bold" fill="#003366">1. Synthetic Perturbation</text>
    <rect x="40" y="64" width="140" height="76" rx="8" fill="#EBF3FA" stroke="#BFDBFE"/>
    <text x="110" y="98" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#003366">Clean Corpus</text>
    <text x="110" y="120" text-anchor="middle" font-family="Arial" font-size="13" fill="#374151">25k Image-Text</text>
    <polygon points="190,96 218,96 218,88 232,102 218,116 218,108 190,108" fill="#1E4E8C"/>
    <rect x="242" y="64" width="140" height="76" rx="8" fill="#ECFDF5" stroke="#A7F3D0"/>
    <text x="312" y="98" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#047857">LLM Injector</text>
    <text x="312" y="120" text-anchor="middle" font-family="Arial" font-size="13" fill="#374151">5 Error Types</text>

    <polygon points="204,174 216,174 216,192 224,192 210,208 196,192 204,192" fill="#003366"/>

    <rect x="20" y="214" width="380" height="136" rx="10" fill="#FFFFFF" stroke="#1E4E8C" stroke-width="2" stroke-dasharray="6,4"/>
    <text x="210" y="242" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="18" font-weight="bold" fill="#1E4E8C">2. Three-Stage Quality Control</text>
    <rect x="34" y="262" width="104" height="66" rx="8" fill="#EBF3FA"/>
    <text x="86" y="291" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="#003366">Expert</text>
    <text x="86" y="311" text-anchor="middle" font-family="Arial" font-size="12" fill="#374151">Inspection</text>
    <rect x="158" y="262" width="104" height="66" rx="8" fill="#EBF3FA"/>
    <text x="210" y="291" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="#003366">Script</text>
    <text x="210" y="311" text-anchor="middle" font-family="Arial" font-size="12" fill="#374151">Validation</text>
    <rect x="282" y="262" width="104" height="66" rx="8" fill="#ECFDF5"/>
    <text x="334" y="291" text-anchor="middle" font-family="Arial" font-size="13" font-weight="bold" fill="#047857">Final</text>
    <text x="334" y="311" text-anchor="middle" font-family="Arial" font-size="12" fill="#374151">Review</text>

    <polygon points="204,358 216,358 216,376 224,376 210,392 196,376 204,376" fill="#003366"/>

    <rect x="20" y="398" width="380" height="144" rx="10" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2"/>
    <text x="210" y="424" text-anchor="middle" font-family="Microsoft YaHei, Arial" font-size="17" font-weight="bold" fill="#111827">3. Benchmark Statistics</text>
    <rect x="44" y="440" width="260" height="14" rx="3" fill="#991B1B" fill-opacity="0.82"/>
    <text x="314" y="452" font-family="Arial" font-size="12" font-weight="bold" fill="#111827">7,240 (Type A)</text>
    <rect x="44" y="462" width="236" height="14" rx="3" fill="#003366" fill-opacity="0.82"/>
    <text x="290" y="474" font-family="Arial" font-size="12" fill="#374151">6,810 (Type B)</text>
    <rect x="44" y="484" width="218" height="14" rx="3" fill="#1E4E8C" fill-opacity="0.82"/>
    <text x="272" y="496" font-family="Arial" font-size="12" fill="#374151">6,350 (Type C)</text>
    <rect x="44" y="506" width="194" height="14" rx="3" fill="#047857" fill-opacity="0.82"/>
    <text x="248" y="518" font-family="Arial" font-size="12" fill="#374151">5,920 (Type D)</text>
  </svg>`;
  const f1 = path.join(FIG_DIR, 'demo_fig1a.png');
  await sharp(Buffer.from(f1Svg)).png().toFile(f1);

  // 2. 超宽图文样本示意图 (1200 x 270, aspect 4.44)
  const f2Svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="270" viewBox="0 0 1200 270">
    <rect width="1200" height="270" rx="8" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2"/>
    <rect x="14" y="14" width="206" height="242" rx="6" fill="#1E293B"/>
    <circle cx="117" cy="115" r="62" fill="none" stroke="#94A3B8" stroke-width="4"/>
    <ellipse cx="90" cy="122" rx="22" ry="44" fill="#475569"/>
    <ellipse cx="144" cy="122" rx="22" ry="44" fill="#475569"/>
    <rect x="74" y="138" width="28" height="18" rx="4" fill="none" stroke="#34D399" stroke-width="3"/>
    <text x="117" y="232" text-anchor="middle" font-family="Arial" font-size="15" font-weight="bold" fill="#E2E8F0">Input Visual Scan</text>

    <rect x="236" y="14" width="290" height="242" rx="6" fill="#F8FAFC" stroke="#003366" stroke-width="1.8"/>
    <rect x="236" y="14" width="290" height="36" rx="4" fill="#EBF3FA"/>
    <text x="381" y="38" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="#003366">Original Clean Report</text>
    <text x="252" y="80" font-family="Arial" font-size="15" fill="#111827">FINDINGS: Frontal &amp; lateral views</text>
    <text x="252" y="106" font-family="Arial" font-size="15" fill="#111827">provided. Subtle focal opacity in</text>
    <text x="252" y="132" font-family="Arial" font-size="15" font-weight="bold" fill="#047857">left lower zone</text>
    <text x="374" y="132" font-family="Arial" font-size="15" fill="#111827">is noted.</text>
    <text x="252" y="158" font-family="Arial" font-size="15" fill="#111827">No effusion or pneumothorax.</text>
    <text x="252" y="196" font-family="Arial" font-size="15" font-weight="bold" fill="#374151">IMPRESSION: Mild focal opacity.</text>

    <polygon points="536,126 562,126 562,116 578,134 562,152 562,142 536,142" fill="#991B1B"/>

    <rect x="588" y="14" width="290" height="242" rx="6" fill="#FEF2F2" stroke="#991B1B" stroke-width="1.8"/>
    <rect x="588" y="14" width="290" height="36" rx="4" fill="#FECACA"/>
    <text x="733" y="38" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="#991B1B">Corrupted Report</text>
    <text x="604" y="80" font-family="Arial" font-size="15" fill="#111827">FINDINGS: Frontal &amp; lateral views</text>
    <text x="604" y="106" font-family="Arial" font-size="15" fill="#111827">provided. Subtle focal opacity in</text>
    <text x="604" y="132" font-family="Arial" font-size="15" font-weight="bold" fill="#991B1B">right lower zone</text>
    <text x="734" y="132" font-family="Arial" font-size="15" fill="#111827">is noted.</text>
    <text x="604" y="158" font-family="Arial" font-size="15" fill="#111827">No effusion or pneumothorax.</text>
    <text x="604" y="196" font-family="Arial" font-size="15" font-weight="bold" fill="#374151">IMPRESSION: Mild focal opacity.</text>

    <rect x="894" y="14" width="292" height="242" rx="6" fill="#F8FAFC" stroke="#1E4E8C" stroke-width="1.8"/>
    <rect x="894" y="14" width="292" height="36" rx="4" fill="#EBF3FA"/>
    <text x="1040" y="38" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="#1E4E8C">Structured Annotations</text>
    <text x="910" y="82" font-family="Consolas, monospace" font-size="14" font-weight="bold" fill="#003366">[Error Type]: Side Confusion</text>
    <text x="910" y="114" font-family="Consolas, monospace" font-size="14" fill="#047857">[Original]: left lower zone</text>
    <text x="910" y="144" font-family="Consolas, monospace" font-size="14" fill="#991B1B">[Corrupted]: right lower zone</text>
    <text x="910" y="178" font-family="Arial" font-size="14" fill="#374151">[Description]: Laterality mismatch;</text>
    <text x="910" y="200" font-family="Arial" font-size="14" fill="#374151">visual scan confirms left-side finding.</text>
  </svg>`;
  const f2 = path.join(FIG_DIR, 'demo_fig2.png');
  await sharp(Buffer.from(f2Svg)).png().toFile(f2);

  // 3. 三阶段多步 RL 架构图 (1140 x 520, aspect 2.19)
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const f3Svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1140" height="520" viewBox="0 0 1140 520">
    <rect width="1140" height="520" rx="10" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2"/>
    ${[
      { y: 24, step: 'Step 1: Error Identification', q1: 'Query 1: Inspect scan + report', q2: '&amp; classify error category', o: '[Error Type]', t1: '<think> Check 5 error types... </think>', t2: '<answer> Side Confusion </answer>', r: 'Format + Acc', c: '#003366', bg: '#EBF3FA' },
      { y: 190, step: 'Step 2: Localization &amp; Explanation', q1: 'Query 2: Given [Error Type],', q2: 'localize &amp; explain target span', o: '[Description]', t1: '<think> Locate mismatch span... </think>', t2: '<answer> Replace right -> left </answer>', r: 'Format + BLEU', c: '#1E4E8C', bg: '#EBF3FA' },
      { y: 356, step: 'Step 3: Evidence-Based Correction', q1: 'Query 3: Given [Type] &amp; [Desc],', q2: 'output minimal span correction', o: '[Fixed Report]', t1: '<think> Edit target span only... </think>', t2: '<answer> Corrected Findings... </answer>', r: 'Format + BLEU', c: '#047857', bg: '#ECFDF5' },
    ].map((row) => `
      <rect x="24" y="${row.y}" width="260" height="134" rx="8" fill="${row.bg}" stroke="${row.c}" stroke-width="2"/>
      <text x="154" y="${row.y + 34}" text-anchor="middle" font-family="Arial" font-size="14.5" font-weight="bold" fill="${row.c}">${row.step}</text>
      <text x="154" y="${row.y + 72}" text-anchor="middle" font-family="Arial" font-size="13" fill="#111827">${row.q1}</text>
      <text x="154" y="${row.y + 96}" text-anchor="middle" font-family="Arial" font-size="13" fill="#374151">${row.q2}</text>

      <polygon points="292,${row.y + 62} 316,${row.y + 62} 316,${row.y + 54} 330,${row.y + 67} 316,${row.y + 80} 316,${row.y + 72} 292,${row.y + 72}" fill="${row.c}"/>

      <rect x="338" y="${row.y + 22}" width="150" height="90" rx="8" fill="#FFFFFF" stroke="${row.c}" stroke-width="2"/>
      <text x="413" y="${row.y + 74}" text-anchor="middle" font-family="Consolas, monospace" font-size="16" font-weight="bold" fill="${row.c}">${row.o}</text>

      <polygon points="496,${row.y + 62} 520,${row.y + 62} 520,${row.y + 54} 534,${row.y + 67} 520,${row.y + 80} 520,${row.y + 72} 496,${row.y + 72}" fill="${row.c}"/>

      <rect x="542" y="${row.y + 12}" width="398" height="110" rx="8" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.8"/>
      <text x="560" y="${row.y + 52}" font-family="Consolas, monospace" font-size="13.5" fill="#374151">${esc(row.t1)}</text>
      <text x="560" y="${row.y + 88}" font-family="Consolas, monospace" font-size="13.5" font-weight="bold" fill="#111827">${esc(row.t2)}</text>

      <polygon points="948,${row.y + 62} 972,${row.y + 62} 972,${row.y + 54} 986,${row.y + 67} 972,${row.y + 80} 972,${row.y + 72} 948,${row.y + 72}" fill="${row.c}"/>

      <rect x="994" y="${row.y + 22}" width="122" height="90" rx="8" fill="${row.c}"/>
      <text x="1055" y="${row.y + 58}" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#FFFFFF">Reward</text>
      <text x="1055" y="${row.y + 86}" text-anchor="middle" font-family="Arial" font-size="14" fill="#EBF3FA">${row.r}</text>
    `).join('')}
  </svg>`;
  const f3 = path.join(FIG_DIR, 'demo_fig3.png');
  await sharp(Buffer.from(f3Svg)).png().toFile(f3);

  // 4 & 5. 双雷达对比图 (1100 x 380, aspect 2.89)
  function radarSvg(titleA, titleB, polyBase, polyOurs) {
    const cx1 = 220, cx2 = 600, cy = 195, r = 132;
    const pts = (cx, vals) => vals.map((v, i) => {
      const ang = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
      return `${(cx + Math.cos(ang) * r * v).toFixed(1)},${(cy + Math.sin(ang) * r * v).toFixed(1)}`;
    }).join(' ');
    const labels = ['Type A', 'Type B', 'Type C', 'Type D', 'Type E'];
    const axes = (cx) => labels.map((lb, i) => {
      const ang = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
      const x2 = cx + Math.cos(ang) * r;
      const y2 = cy + Math.sin(ang) * r;
      const lx = cx + Math.cos(ang) * (r + 26);
      const ly = cy + Math.sin(ang) * (r + 22) + 5;
      return `<line x1="${cx}" y1="${cy}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#CBD5E1" stroke-width="1.2"/>
              <text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="middle" font-family="Arial" font-size="15" font-weight="bold" fill="#374151">${lb}</text>`;
    }).join('');
    return `<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="380" viewBox="0 0 1100 380">
      <rect width="1100" height="380" fill="#FFFFFF"/>
      ${[cx1, cx2].map((cx, idx) => `
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#94A3B8" stroke-width="1.5"/>
        <circle cx="${cx}" cy="${cy}" r="${r * 0.66}" fill="none" stroke="#CBD5E1" stroke-dasharray="4,4"/>
        <circle cx="${cx}" cy="${cy}" r="${r * 0.33}" fill="none" stroke="#CBD5E1" stroke-dasharray="4,4"/>
        ${axes(cx)}
        <polygon points="${pts(cx, polyBase[idx])}" fill="#94A3B8" fill-opacity="0.22" stroke="#64748B" stroke-width="2.5"/>
        <polygon points="${pts(cx, polyOurs[idx])}" fill="#047857" fill-opacity="0.20" stroke="#047857" stroke-width="3"/>
        <text x="${cx}" y="366" text-anchor="middle" font-family="Arial" font-size="17" font-weight="bold" fill="#111827">${idx === 0 ? titleA : titleB}</text>
      `).join('')}
      <rect x="810" y="105" width="262" height="160" rx="10" fill="#F8FAFC" stroke="#D1D5DB" stroke-width="1.5"/>
      <text x="832" y="142" font-family="Arial" font-size="16" font-weight="bold" fill="#003366">Legend</text>
      <line x1="832" y1="178" x2="876" y2="178" stroke="#64748B" stroke-width="4"/>
      <text x="888" y="184" font-family="Arial" font-size="15" fill="#374151">Zero-shot Best VLM</text>
      <line x1="832" y1="222" x2="876" y2="222" stroke="#047857" stroke-width="4"/>
      <text x="888" y="228" font-family="Arial" font-size="15" font-weight="bold" fill="#047857">7B + Multi-Step RL</text>
    </svg>`;
  }

  const f4 = path.join(FIG_DIR, 'demo_fig4.png');
  await sharp(Buffer.from(radarSvg('(a) Precision (Single)', '(b) Recall (Single)', [[0.52, 0.44, 0.62, 0.56, 0.35], [0.55, 0.48, 0.58, 0.60, 0.42]], [[0.86, 0.78, 0.89, 0.84, 0.50], [0.84, 0.76, 0.85, 0.88, 0.44]]))).png().toFile(f4);
  const f5 = path.join(FIG_DIR, 'demo_fig5.png');
  await sharp(Buffer.from(radarSvg('(a) Precision (Multi)', '(b) Recall (Multi)', [[0.58, 0.50, 0.66, 0.60, 0.38], [0.60, 0.44, 0.54, 0.58, 0.48]], [[0.84, 0.76, 0.88, 0.85, 0.46], [0.66, 0.52, 0.62, 0.65, 0.38]]))).png().toFile(f5);

  return { f1, f2, f3, f4, f5 };
}

async function main() {
  const LOGO = await makeGenericLogo();
  const LOGO_R = 995 / 293;
  const FIG = await makeDemoFigs();

  const I = {
    db: await makeIcon('db', 'Database', C.blue, C.blueBg),
    layers: await makeIcon('layers', 'Layers', C.blue2, C.blueBg),
    chart: await makeIcon('chart', 'BarChart3', C.green, C.greenBg),
    alert: await makeIcon('alert', 'AlertTriangle', C.red, C.redBg),
  };

  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'Researcher A (AI Research Lab)';
  pptx.company = 'AI Research Lab';
  pptx.title = 'Multimodal Report Error Correction Benchmark - Group Meeting Demo';

  const F = 'Microsoft YaHei';
  const TOTAL = 5;
  const DATE = '2026-01-15';
  const CITE_MAIN = '文献来源：Author et al. MedBench-Demo: Multimodal Report Error Dataset and Multi-Step RL Benchmark. Venue, 2025';
  const CITE_3W = '文献来源：Work-1 (Journal, 2025); Work-2 (Conf, 2026); Work-3 MedBench-Demo (Venue, 2025)';
  let pageNo = 0;

  function text(s, str, x, y, w, h, o = {}) {
    s.addText(str, {
      x, y, w, h,
      fontFace: o.font || F,
      fontSize: o.size || 11.5,
      bold: !!o.bold,
      color: o.color || C.ink,
      align: o.align || 'left',
      valign: o.valign || 'top',
      margin: o.margin ?? 0,
      lineSpacingMultiple: o.ls || 1.16,
    });
  }

  function card(s, x, y, w, h, o = {}) {
    s.addShape(pptx.ShapeType.roundRect, {
      x, y, w, h,
      rectRadius: o.r ?? 0.08,
      fill: { color: o.fill || C.pale },
      line: { color: o.line || C.line, width: o.lw ?? 0.8 },
    });
    if (o.topBar) {
      s.addShape(pptx.ShapeType.rect, { x, y, w, h: 0.06, fill: { color: o.topBar }, line: { color: o.topBar, width: 0 } });
    }
    if (o.leftBar) {
      s.addShape(pptx.ShapeType.rect, { x, y, w: 0.07, h, fill: { color: o.leftBar }, line: { color: o.leftBar, width: 0 } });
    }
  }

  function pill(s, label, x, y, w, h, bg = C.blueBg, fg = C.blue, size = 9.0) {
    s.addShape(pptx.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.10, fill: { color: bg }, line: { color: bg, width: 0 } });
    text(s, label, x, y, w, h, { size, bold: true, color: fg, align: 'center', valign: 'middle' });
  }

  function imgData(imgPath) {
    return 'image/png;base64,' + fs.readFileSync(imgPath).toString('base64');
  }

  function fitImg(s, imgPath, x, y, maxW, maxH, aspect) {
    let w = maxW;
    let h = w / aspect;
    if (h > maxH) { h = maxH; w = h * aspect; }
    s.addImage({ data: imgData(imgPath), x: x + (maxW - w) / 2, y: y + (maxH - h) / 2, w, h });
  }

  function header(s, kicker, title, subtitle) {
    s.background = { color: C.white };
    s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 0.07, fill: { color: C.blue }, line: { color: C.blue, width: 0 } });
    text(s, kicker, 0.55, 0.17, 9.8, 0.24, { size: 9.8, bold: true, color: C.blue });
    text(s, title, 0.55, 0.41, 10.0, 0.44, { size: 21, bold: true, color: C.ink });
    text(s, subtitle, 0.55, 0.87, 12.2, 0.25, { size: 10.3, color: C.muted });
    s.addImage({ data: imgData(LOGO), x: 10.75, y: 0.18, w: 2.05, h: 2.05 / LOGO_R });
    s.addShape(pptx.ShapeType.line, { x: 0.55, y: 1.19, w: 12.23, h: 0, line: { color: C.line, width: 0.8 } });
  }

  function footer(s, citeText) {
    pageNo += 1;
    s.addShape(pptx.ShapeType.line, { x: 0.55, y: 7.06, w: 12.23, h: 0, line: { color: C.line, width: 0.7 } });
    text(s, `汇报人：Researcher A  ·  AI Research Lab  ·  ${DATE}`, 0.55, 7.13, 3.3, 0.24, { size: 9.0, color: C.muted, valign: 'middle' });
    if (citeText) {
      text(s, citeText, 3.85, 7.13, 8.20, 0.24, { size: 8.6, color: C.muted, align: 'center', valign: 'middle' });
    }
    text(s, `${pageNo} / ${TOTAL}`, 12.08, 7.13, 0.70, 0.24, { size: 9.2, bold: true, color: C.blue, align: 'right', valign: 'middle' });
  }

  // SLIDE 1: Cover & 3-Week Evolution
  {
    const s = pptx.addSlide();
    s.background = { color: C.white };
    s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.24, h: 7.5, fill: { color: C.blue }, line: { color: C.blue, width: 0 } });
    pill(s, 'AI Research Lab · 研究生组会', 0.68, 0.52, 2.85, 0.34, C.blueBg, C.blue, 10.5);
    s.addImage({ data: imgData(LOGO), x: 9.15, y: 0.45, w: 3.60, h: 3.60 / LOGO_R });
    text(s, '多模态医学报告纠错基准与多步强化学习', 0.68, 1.15, 11.8, 0.62, { size: 30, bold: true, color: C.ink });
    text(s, 'MedBench-Demo (2025) 论文精读  ·  三周调研演进与批判性反思（v2.0 脱敏示例）', 0.68, 1.82, 12.0, 0.36, { size: 15.2, bold: true, color: C.blue2 });

    card(s, 0.68, 2.38, 12.08, 0.56, { fill: C.blueBg, line: C.blueLine, leftBar: C.blue });
    text(s, [
      { text: '三周调研演进： ', options: { bold: true, color: C.blue } },
      { text: '纯文本仅检测 (Work-1, Journal 25)', options: { color: C.sub } },
      { text: '  →  ', options: { bold: true, color: C.blue2 } },
      { text: '纯文本单错纠错 (Work-2, Conf 26)', options: { color: C.sub } },
      { text: '  →  ', options: { bold: true, color: C.blue2 } },
      { text: '多模态单/多错 + 多步 RL (MedBench-Demo)', options: { bold: true, color: C.blue } },
    ], 0.88, 2.48, 11.72, 0.36, { size: 10.4, valign: 'middle' });

    const mods = [
      { no: '01', title: '任务与基准构建 (P2)', desc: '非对称版式适配竖长流程原图与超宽样本图，拆解 5 类临床错误分布与三阶段质控', icon: I.db, accent: C.blue },
      { no: '02', title: '多步强化学习方法 (P3)', desc: '解耦“识别→解释→修正”三步推理，配合原生消融柱状图对比一步 RL 与多步 RL', icon: I.layers, accent: C.blue2 },
      { no: '03', title: '详细实验分析 (P4)', desc: '双雷达图 + 7 模型双粒度（报告级 vs 句级）全指标对比表与四大深度实验发现', icon: I.chart, accent: C.green },
      { no: '04', title: '局限、串联与计划 (P5)', desc: '核心科学追问（真看图理解 vs 文本改写捷径）、三周串联对比表与下周阅读计划', icon: I.alert, accent: C.red },
    ];
    mods.forEach((m, idx) => {
      const x = 0.68 + idx * 3.07;
      card(s, x, 3.24, 2.86, 2.42, { fill: C.pale, line: C.line, topBar: m.accent });
      s.addImage({ data: imgData(m.icon), x: x + 0.18, y: 3.48, w: 0.44, h: 0.44 });
      text(s, m.no, x + 2.20, 3.48, 0.48, 0.36, { size: 17, bold: true, color: C.line, align: 'right' });
      text(s, m.title, x + 0.18, 4.06, 2.50, 0.34, { size: 12.2, bold: true, color: C.ink });
      text(s, m.desc, x + 0.18, 4.46, 2.50, 1.08, { size: 9.8, color: C.sub, ls: 1.25 });
    });

    card(s, 0.68, 5.98, 12.08, 0.72, { fill: C.light, line: C.line, leftBar: C.blue });
    text(s, `汇报人：Researcher A          指导团队：AI Research Lab          汇报日期：${DATE}`, 0.92, 6.14, 11.6, 0.38, { size: 12.5, bold: true, color: C.ink, align: 'center', valign: 'middle' });
    pageNo += 1;
    text(s, `${pageNo} / ${TOTAL}`, 12.08, 7.13, 0.70, 0.24, { size: 9.2, bold: true, color: C.blue, align: 'right', valign: 'middle' });
  }

  // SLIDE 2: Asymmetric Dataset & Sample Anatomy
  {
    const s = pptx.addSlide();
    header(s, 'AI Research Lab · 01 论文精读 · 任务与数据集构建', '非对称内容驱动版式：多模态基准构建与样本解剖', '根据原图真实宽高比灵活排版（左纵栏放竖图 + 右上放超宽样本图），避免硬套旧版 2×2 模板');

    card(s, 0.55, 1.34, 3.35, 4.30, { fill: C.white, line: C.line, topBar: C.blue });
    pill(s, '原图 Figure 1(a)：构建与质控流水线', 0.70, 1.48, 3.05, 0.26, C.blueBg, C.blue, 9.2);
    fitImg(s, FIG.f1, 0.66, 1.80, 3.13, 3.74, 420 / 560);

    card(s, 4.08, 1.34, 8.70, 2.38, { fill: C.white, line: C.line, topBar: C.blue2 });
    pill(s, '原图 Figure 2：多模态错误样本示例（侧别混淆）', 4.24, 1.47, 4.15, 0.25, C.blueBg, C.blue, 9.2);
    pill(s, '纯文本无法判别 · 必须核验影像', 10.16, 1.47, 2.46, 0.25, C.redBg, C.red, 8.5);
    fitImg(s, FIG.f2, 4.20, 1.78, 8.46, 1.86, 1200 / 270);

    card(s, 4.08, 3.84, 8.70, 1.80, { fill: C.pale, line: C.line });
    text(s, 'Table 1：五类临床错误分布（单错 22,500 篇 + 多错 2,500 篇，含 2~3 处独立错误）', 4.24, 3.92, 8.40, 0.26, { size: 10.2, bold: true, color: C.blue });
    const errs = [
      { name: '侧别混淆 Type A', num: '7,240', pct: '26.1%', desc: '左右/解剖方位颠倒\n(left ↔ right)', bar: C.red, fill: C.redBg, fg: C.red, line: C.redLine },
      { name: '拼写笔误 Type B', num: '6,810', pct: '24.6%', desc: '术语拼写笔误或\n语音转写错词', bar: C.blue, fill: C.white, fg: C.blue, line: C.line },
      { name: '多余插入 Type C', num: '6,350', pct: '22.9%', desc: '无意插入不存在的\n异常所见或词句', bar: C.blue2, fill: C.white, fg: C.blue2, line: C.line },
      { name: '关键遗漏 Type D', num: '5,920', pct: '21.3%', desc: '漏写关键临床征象\n或核心修饰词', bar: C.green, fill: C.white, fg: C.green, line: C.line },
      { name: '其他错误 Type E', num: '1,410', pct: '5.1%', desc: '计量单位错误、\n标点或格式异常', bar: C.muted, fill: C.white, fg: C.muted, line: C.line },
    ];
    errs.forEach((e, i) => {
      const ex = 4.22 + i * 1.69;
      card(s, ex, 4.24, 1.61, 1.30, { fill: e.fill, line: e.line, topBar: e.bar });
      text(s, e.name, ex + 0.06, 4.35, 1.49, 0.22, { size: 8.6, bold: true, color: e.fg, align: 'center' });
      text(s, e.num, ex + 0.06, 4.58, 1.49, 0.30, { size: 15.0, bold: true, color: C.ink, align: 'center' });
      text(s, `占比 ${e.pct}`, ex + 0.06, 4.90, 1.49, 0.20, { size: 8.2, bold: true, color: e.fg, align: 'center' });
      text(s, e.desc, ex + 0.06, 5.12, 1.49, 0.38, { size: 8.0, color: C.sub, align: 'center', ls: 1.12 });
    });

    card(s, 0.55, 5.78, 12.23, 1.14, { fill: C.blueBg, line: C.blueLine, leftBar: C.blue });
    text(s, [
      { text: '① 三阶段人工 + 脚本质控：', options: { bold: true, color: C.blue } },
      { text: 'LLM 注入错误后，依次经 Expert Inspection（剔除不合理插入）→ Script Validation（校验格式与改动数）→ Final Review（人工复核边界样例）。\n', options: { color: C.ink } },
      { text: '② 相对前期基准的突破：', options: { bold: true, color: C.blue } },
      { text: '突破小规模纯文本单错假设，首次实现 ', options: { color: C.ink } },
      { text: '大规模（2.5 万）+ 图文多模态 + 单/多错并发 + 检测与纠错一体化评测', options: { bold: true, color: C.blue2 } },
      { text: '。', options: { color: C.ink } },
    ], 0.80, 5.88, 11.75, 0.94, { size: 9.8, ls: 1.28, valign: 'middle' });
    footer(s, CITE_MAIN);
  }

  // SLIDE 3: Method Architecture + Native Ablation Chart
  {
    const s = pptx.addSlide();
    header(s, 'AI Research Lab · 02 方法详解 · 多步强化学习', '三阶段多步强化学习：序列推理分解与 GRPO 优化', '将端到端纠错拆解为“识别 → 解释 → 修正”三步子轨迹，分步施加细粒度奖励，克服一步 RL 指令崩溃');

    card(s, 0.55, 1.34, 8.15, 3.74, { fill: C.white, line: C.line, topBar: C.blue });
    pill(s, '原图 Figure 3：三阶段多步强化学习架构（Query 1 → 2 → 3 状态传递）', 0.72, 1.46, 5.90, 0.25, C.blueBg, C.blue, 9.2);
    fitImg(s, FIG.f3, 0.68, 1.76, 7.88, 3.22, 1140 / 520);

    card(s, 8.88, 1.34, 3.90, 3.74, { fill: C.white, line: C.line, topBar: C.blue2 });
    pill(s, '消融实证 (Table 4)：1-Step RL vs Multi-Step', 9.04, 1.46, 3.58, 0.25, C.blueBg, C.blue2, 9.0);
    s.addChart(pptx.ChartType.bar, [
      { name: '1-Step RL', labels: ['3B BLEU', '3B GraphF1', '7B BLEU', '7B ClinF1', '7B GraphF1'], values: [0.78, 0.84, 0.86, 0.93, 0.89] },
      { name: 'Multi-Step RL', labels: ['3B BLEU', '3B GraphF1', '7B BLEU', '7B ClinF1', '7B GraphF1'], values: [0.93, 0.92, 0.95, 0.98, 0.95] },
    ], {
      x: 8.98, y: 1.76, w: 3.70, h: 2.36,
      barDir: 'col', barGrouping: 'clustered',
      chartColors: ['94A3B8', '003366'],
      valAxisMinVal: 0.70, valAxisMaxVal: 1.00,
      catAxisLabelFontSize: 7.8, valAxisLabelFontSize: 8.0,
      catAxisLabelColor: C.ink, valAxisLabelColor: C.sub,
      showLegend: true, legendPos: 't', legendFontSize: 8.4,
      showValue: true, dataLabelFontSize: 7.4, dataLabelFormatCode: '0.00', dataLabelColor: C.ink,
      chartArea: { fill: { color: C.white } },
      valGridLine: { color: 'E2E8F0', size: 0.5 },
    });
    card(s, 9.02, 4.20, 3.62, 0.76, { fill: C.blueBg, line: C.blueLine, leftBar: C.blue });
    text(s, '一步 RL 同时优化多任务易顾此失彼，平均落后多步 RL 约 12%；分步解耦让模型稳定学会先定位再局部改写。', 9.18, 4.27, 3.38, 0.62, { size: 8.7, bold: true, color: C.ink, ls: 1.2, valign: 'middle' });

    const steps = [
      { tagText: 'Step 1 · 错误识别 (Q1 → O1)', pillText: 'R1 = R_fmt + R_acc', accent: C.blue, bg: C.blueBg, body: '• 输入：影像扫描 + 含错报告\n• 推理：在 <think> 中逐一排查 5 类错误并输出类别\n• 奖励：正则格式匹配 (0/1) + 分类准确率 (0/1)' },
      { tagText: 'Step 2 · 错误解释 (Q2 → O2)', pillText: 'R2 = R_fmt + R_bleu', accent: C.blue2, bg: C.blueBg, body: '• 状态拼接：Q2 显式继承 Step 1 输出的 [Error Type]\n• 作用：定位出错词句并给出解释，充当纠错“脚手架”\n• 奖励：格式合规 (0/1) + 解释文本 BLEU 匹配度' },
      { tagText: 'Step 3 · 报告修正 (Q3 → O3)', pillText: 'R3 = R_fmt + R_bleu | G=8', accent: C.green, bg: C.greenBg, body: '• 循证修正：基于前两步 [类别 + 解释] 执行局部修改\n• GRPO 优化：每步采样 G=8 条轨迹计算组内相对优势\n• 联合目标：最大化三阶段累积策略收益 J(θ) = Σ J_k(θ)' },
    ];
    steps.forEach((st, idx) => {
      const sx = 0.55 + idx * 4.14;
      card(s, sx, 5.22, 3.95, 1.72, { fill: C.pale, line: C.line, topBar: st.accent });
      text(s, st.tagText, sx + 0.14, 5.35, 2.02, 0.24, { size: 9.8, bold: true, color: st.accent });
      pill(s, st.pillText, sx + 2.12, 5.34, 1.72, 0.24, st.bg, st.accent, 7.9);
      text(s, st.body, sx + 0.14, 5.68, 3.68, 1.18, { size: 8.9, color: C.ink, ls: 1.24 });
    });
    footer(s, CITE_MAIN);
  }

  // SLIDE 4: Full-Page Detailed Experiment Dashboard
  {
    const s = pptx.addSlide();
    header(s, 'AI Research Lab · 03 实验结果与深度分析', '全页实验分析面板：双粒度评测与关键现象解读', '独立成页展开双雷达图 + 7 模型报告级/句级全指标对比表，将局限剖析移至末页避免单页拥挤');

    card(s, 0.55, 1.32, 6.02, 2.40, { fill: C.white, line: C.line, topBar: C.blue });
    text(s, '实验一：单错检测 P/R 雷达图 (Fig. 4)', 0.70, 1.42, 2.95, 0.24, { size: 10.0, bold: true, color: C.blue });
    pill(s, '7B+MSRL：P +36.2% / R +29.4%', 3.72, 1.41, 2.72, 0.23, C.greenBg, C.green, 8.2);
    fitImg(s, FIG.f4, 0.68, 1.68, 5.76, 1.72, 1100 / 380);
    text(s, '零样本闭源最强模型召回仅 ~51%；小尺寸模型无 SFT 冷启动易漏检长尾类。', 0.70, 3.45, 5.74, 0.22, { size: 8.5, bold: true, color: C.sub });

    card(s, 6.75, 1.32, 6.03, 2.40, { fill: C.white, line: C.line, topBar: C.blue2 });
    text(s, '实验二：多错检测 P/R 雷达图 (Fig. 5)', 6.90, 1.42, 2.95, 0.24, { size: 10.0, bold: true, color: C.blue2 });
    pill(s, '7B+MSRL：P +22.8% / R +2.1%', 9.95, 1.41, 2.70, 0.23, C.blueBg, C.blue2, 8.2);
    fitImg(s, FIG.f5, 6.88, 1.68, 5.76, 1.72, 1100 / 380);
    text(s, '多错并发显著拉低开源零样本表现，多步 RL 在精确率维度保持稳定领先。', 6.90, 3.45, 5.76, 0.22, { size: 8.5, bold: true, color: C.sub });

    card(s, 0.55, 3.84, 8.28, 3.12, { fill: C.white, line: C.line, topBar: C.blue });
    text(s, '实验三：报告级 vs. 句级纠错全维度对比（Table 2 单错 & Table 3 多错 · BLEU / ClinF1 / GraphF1）', 0.70, 3.94, 8.00, 0.24, { size: 9.8, bold: true, color: C.blue });

    const hdrOpt = { bold: true, fill: { color: C.blue }, color: C.white };
    const alt = { fill: { color: C.pale } };
    const hi3 = { bold: true, fill: { color: C.blueBg }, color: C.blue };
    const hi7 = { bold: true, fill: { color: C.greenBg }, color: C.green };
    const tblRows = [
      [
        { text: '模型（类型）', options: hdrOpt },
        { text: '单错-报告级\nBLEU / Clin / Graph', options: hdrOpt },
        { text: '单错-句级\nBLEU / Clin / Graph', options: hdrOpt },
        { text: '多错-报告级\nBLEU / Clin', options: hdrOpt },
        { text: '多错-句级\nBLEU / Clin', options: hdrOpt },
      ],
      [{ text: 'Closed-Model A', options: { bold: true, ...alt } }, { text: '0.851 / 0.950 / 0.902', options: alt }, { text: '0.382 / 0.874 / 0.479', options: alt }, { text: '0.410 / 0.785', options: { color: C.red, bold: true, fill: { color: C.redBg } } }, { text: '0.295 / 0.810', options: { color: C.red, bold: true, fill: { color: C.redBg } } }],
      ['Closed-Model B', '0.848 / 0.932 / 0.885', '0.348 / 0.812 / 0.418', '0.698 / 0.852', '0.458 / 0.778'],
      [{ text: 'Domain-VLM (专用)', options: { color: C.red, bold: true, ...alt } }, { text: '0.320 / 0.615 / 0.488', options: { color: C.red, ...alt } }, { text: '0.285 / 0.642 / 0.402', options: { color: C.red, ...alt } }, { text: '—', options: alt }, { text: '—', options: alt }],
      ['Open-VLM-7B (A)', '0.790 / 0.896 / 0.824', '0.502 / 0.860 / 0.588', '0.752 / 0.874', '0.588 / 0.825'],
      [{ text: 'Open-VLM-7B (Base)', options: alt }, { text: '0.828 / 0.903 / 0.860', options: alt }, { text: '0.465 / 0.846 / 0.551', options: alt }, { text: '0.725 / 0.830', options: alt }, { text: '0.558 / 0.804', options: alt }],
      [{ text: 'Base-3B + MSRL', options: hi3 }, { text: '0.934 / 0.949 / 0.928', options: hi3 }, { text: '0.480 / 0.822 / 0.555', options: hi3 }, { text: '0.870 / 0.905', options: hi3 }, { text: '0.644 / 0.845', options: hi3 }],
      [{ text: 'Base-7B + MSRL', options: hi7 }, { text: '0.958 / 0.982 / 0.955', options: hi7 }, { text: '0.402 / 0.926 / 0.448', options: { ...hi7, color: C.blue2 } }, { text: '0.898 / 0.946', options: hi7 }, { text: '0.634 / 0.899', options: hi7 }],
    ];
    s.addTable(tblRows, {
      x: 0.68, y: 4.24, w: 8.02,
      colW: [1.72, 1.92, 1.92, 1.23, 1.23],
      rowH: [0.36, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.31],
      fontFace: F, fontSize: 8.2, align: 'center', valign: 'middle',
      border: { type: 'solid', color: C.line, pt: 0.5 },
      fill: { color: C.white },
    });
    text(s, '注：以上为脱敏演示指标；句级评测揭示未改句子对报告级指标的稀释效应，凸显临床语义指标与词面指标的背离。', 0.68, 6.72, 8.02, 0.18, { size: 7.5, color: C.muted });

    card(s, 8.98, 3.84, 3.80, 3.12, { fill: C.blueBg, line: C.blueLine, topBar: C.blue2 });
    text(s, '四大核心实验发现（深度解读）', 9.14, 3.95, 3.50, 0.24, { size: 10.0, bold: true, color: C.blue });
    const findings = [
      { t: '① 领域专用 VLM 审校垫底', d: '专用模型擅长从零生成报告，但面对审校与局部编辑指令时极易退化为全文重写。', c: C.red },
      { t: '② 句级反差戳破“报告级虚高”', d: '7B+MSRL 单错句级 BLEU 仅 0.402，但 ClinF1 达 0.926（最高），措辞改写但临床语义最准。', c: C.blue2 },
      { t: '③ 闭源强模型多错“整篇崩溃”', d: '单错第一的 Closed-A 在多错下因整篇意译致句级 BLEU 暴跌至 0.295，被开源模型反超。', c: C.red },
      { t: '④ 多步 RL 稳定局部最小修改', d: '3B/7B+MSRL 在单错与多错上均显著超越零样本与一步 RL 基线，稳住局部编辑保真度。', c: C.green },
    ];
    findings.forEach((f, idx) => {
      const fy = 4.26 + idx * 0.65;
      text(s, [{ text: `${f.t}：`, options: { bold: true, color: f.c } }, { text: f.d, options: { color: C.ink } }], 9.14, fy, 3.50, 0.61, { size: 8.3, ls: 1.16 });
    });
    footer(s, CITE_MAIN);
  }

  // SLIDE 5: Limitations (with Core Scientific Question) + 3-Week Synthesis + Next Week Plan
  {
    const s = pptx.addSlide();
    header(s, 'AI Research Lab · 04 局限剖析、三周串联与下周计划', '方法学局限反思、三周调研串联与下周阅读计划', '重点追问“视觉理解 vs. 文本修改模式”本质归因，串联历史组会调研脉络并明确下周精读方向');

    card(s, 0.55, 1.32, 6.20, 4.18, { fill: C.redBg, line: C.redLine, topBar: C.red });
    text(s, '一、方法学局限剖析（批判性思考）', 0.72, 1.43, 4.60, 0.24, { size: 10.3, bold: true, color: C.red });
    pill(s, '5 项核心盲区', 5.48, 1.42, 1.12, 0.23, C.white, C.red, 8.2);

    card(s, 0.70, 1.74, 5.90, 0.92, { fill: C.white, line: C.redLine, leftBar: C.red });
    text(s, [
      { text: '1. 核心追问——真看图理解，还是学“文本修改模式”？\n', options: { bold: true, color: C.red } },
      { text: '论文未做 Text-only / 图像置空消融实验：模型究竟是在理解医学影像后发现图文矛盾并纠错，还是更多学习了“含错报告 → 原始文本”的表层修改捷径？', options: { color: C.ink } },
    ], 0.86, 1.80, 5.64, 0.80, { size: 8.7, ls: 1.20, valign: 'middle' });

    const lims = [
      { t: '2. 合成误差与多错比例失衡', d: 'LLM 合成错误未必贴合真实临床分布；多错样本仅占约 10%，且小模型无 SFT 冷启动易漏检长尾类。' },
      { t: '3. 词面奖励代理偏差', d: 'Step 2/3 仅用 BLEU 作奖励，易诱导字面贴近而非医学严谨，缺乏临床实体或空间定位级奖励。' },
      { t: '4. 基线对比与专家评测缺位', d: 'RL 模型仅与零样本 VLM 对比，缺少同规模 SFT 基线；全篇未开展领域专家人工盲审评估。' },
      { t: '5. 模态与纵向病史受限（作者自述）', d: '仅限单一影像模态，未覆盖跨模态检查及既往病史/历史检查对比引发的纵向逻辑错误。' },
    ];
    lims.forEach((lm, idx) => {
      const ly = 2.76 + idx * 0.66;
      text(s, [{ text: `${lm.t}：`, options: { bold: true, color: C.red } }, { text: lm.d, options: { color: C.ink } }], 0.72, ly, 5.86, 0.62, { size: 8.6, ls: 1.18 });
    });

    card(s, 6.93, 1.32, 5.85, 4.18, { fill: C.pale, line: C.line, topBar: C.blue });
    text(s, '二、三周报告纠错调研串联（Week 1 → Week 2 → Week 3）', 7.10, 1.43, 5.52, 0.24, { size: 10.3, bold: true, color: C.blue });

    const hdrOpt = { bold: true, fill: { color: C.blue }, color: C.white };
    const compRows = [
      [{ text: '周次 / 代表作', options: hdrOpt }, { text: '模态与任务', options: hdrOpt }, { text: '核心方法', options: hdrOpt }, { text: '核心贡献与瓶颈', options: hdrOpt }],
      [{ text: 'Week 1\nWork-1\n(Journal 25)', options: { bold: true, color: C.blue } }, '纯文本\n报告级仅检测\n(4 类错误)', 'LLM QLoRA 微调\n(成对数据)', '临床确认率高；\n不定位不改写、无影像'],
      [{ text: 'Week 2\nWork-2\n(Conf 26)', options: { bold: true, color: C.blue2, fill: { color: C.pale } } }, { text: '纯文本\n单错检测→定位\n→文本纠错', options: { fill: { color: C.pale } } }, { text: '免微调三阶段\n图谱蒸馏 + 检索', options: { fill: { color: C.pale } } }, { text: '可解释、低耗时；\n无影像、单错、静态库', options: { fill: { color: C.pale } } }],
      [{ text: 'Week 3\nMedBench-Demo\n(Venue 25)', options: { bold: true, color: C.green, fill: { color: C.greenBg } } }, { text: '图文多模态\n单+多错端到端\n检测与纠错', options: { fill: { color: C.greenBg } } }, { text: '2.5 万基准\n三步多目标 RL\n(MsRL+GRPO)', options: { fill: { color: C.greenBg } } }, { text: '抗整篇改写、句级升；\n视觉贡献未证、仅 BLEU', options: { fill: { color: C.greenBg } } }],
    ];
    s.addTable(compRows, {
      x: 7.08, y: 1.76, w: 5.55,
      colW: [1.18, 1.24, 1.32, 1.81],
      rowH: [0.34, 0.72, 0.72, 0.72],
      fontFace: F, fontSize: 8.3, align: 'center', valign: 'middle',
      border: { type: 'solid', color: C.line, pt: 0.5 },
      fill: { color: C.white },
    });

    card(s, 7.08, 4.36, 5.55, 1.00, { fill: C.blueBg, line: C.blueLine, leftBar: C.blue });
    text(s, [
      { text: '三周演进脉络与关键问题收敛：\n', options: { bold: true, color: C.blue } },
      { text: '研究已从“纯文本判错”→“纯文本单错审校”→“多模态多错多步 RL”，下一代方法必须验证并强化真实的视觉证据核验，且用临床/空间奖励取代纯 BLEU。', options: { color: C.ink } },
    ], 7.26, 4.43, 5.26, 0.86, { size: 8.7, ls: 1.22, valign: 'middle' });

    card(s, 0.55, 5.64, 12.23, 1.32, { fill: C.pale, line: C.line, leftBar: C.blue });
    text(s, '三、下周文献阅读与调研计划（承接本周局限 · 探索空间短语对齐与多模态质控）', 0.78, 5.72, 8.8, 0.24, { size: 10.2, bold: true, color: C.blue });
    const plans = [
      { no: '01', title: '精读视觉短语对齐代表作 (Paper A)', desc: '重点研读空间短语级 Fact-Checking 与推理时无真值偏好对齐，考察如何强化视觉证据约束。', accent: C.green, bg: C.greenBg },
      { no: '02', title: '精读多模态质控与细粒度评测 (Paper B/C)', desc: '补齐端到端多模态质控瓶颈分析，学习逐行最小修改提取与多级临床严重度评测体系。', accent: C.blue2, bg: C.blueBg },
      { no: '03', title: '视觉归因设计与立题切入点梳理', desc: '围绕“真看图纠错 vs. 文本改写捷径”设计有图/无图消融验证方案，凝练个人立题方向。', accent: C.blue, bg: C.blueBg },
    ];
    plans.forEach((p, i) => {
      const px = 0.78 + i * 3.98;
      card(s, px, 6.02, 3.84, 0.84, { fill: C.white, line: C.line, leftBar: p.accent });
      pill(s, p.no, px + 0.16, 6.10, 0.34, 0.22, p.bg, p.accent, 8.2);
      text(s, p.title, px + 0.56, 6.09, 3.20, 0.24, { size: 8.9, bold: true, color: C.ink });
      text(s, p.desc, px + 0.16, 6.37, 3.58, 0.44, { size: 8.2, color: C.sub, ls: 1.15 });
    });
    footer(s, CITE_3W);
  }

  const outPptx = path.join(REPO_DIR, 'examples/demo-group-meeting.pptx');
  await pptx.writeFile({ fileName: outPptx });
  console.log('Generated anonymized v2.0 demo PPTX:', outPptx);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
