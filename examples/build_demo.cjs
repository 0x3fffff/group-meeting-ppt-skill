/**
 * Generate a 100% desensitized, generic academic demo PPTX and visual assets
 * for the public GitHub repository `group-meeting-ppt-skill`.
 * Zero personal names, zero real university logos, zero real reading progress.
 */

const path = require('path');
const fs = require('fs');

const OLD_NM = 'E:/鐮旂┒鐢?Graduate student group meeting/缁勪細姹囨姤_20261030/.build/node_modules';
const PptxGenJS = require(path.join(OLD_NM, 'pptxgenjs'));
const lucide = require(path.join(OLD_NM, 'lucide'));
const sharp = require(path.join(OLD_NM, 'sharp'));

const REPO_DIR = path.resolve(__dirname, '..');
const ICON_DIR = path.join(REPO_DIR, 'resources/icons');
const FIG_DIR = path.join(REPO_DIR, 'resources/demo_figs');
const PREVIEW_DIR = path.join(REPO_DIR, 'resources/preview');

fs.mkdirSync(ICON_DIR, { recursive: true });
fs.mkdirSync(FIG_DIR, { recursive: true });
fs.mkdirSync(PREVIEW_DIR, { recursive: true });
fs.mkdirSync(path.join(REPO_DIR, 'examples'), { recursive: true });
fs.mkdirSync(path.join(REPO_DIR, 'scripts'), { recursive: true });

const C = {
  blue: '003366',
  blue2: '1D4ED8',
  blueBg: 'EBF3FA',
  blueLine: 'BFDBFE',
  red: 'B91C1C',
  redBg: 'FEF2F2',
  redLine: 'FECACA',
  orange: 'D97706',
  orangeBg: 'FFFBEB',
  orangeLine: 'FDE68A',
  green: '047857',
  greenBg: 'ECFDF5',
  greenLine: 'A7F3D0',
  purple: '6D28D9',
  purpleBg: 'F5F3FF',
  purpleLine: 'DDD6FE',
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
  const svg = iconToSvg(node, `#${fg}`, `#${bg}`);
  await sharp(Buffer.from(svg)).png().toFile(out);
  return out;
}

// Generate a generic, anonymized University / Lab Emblem PNG (995 x 293)
async function makeGenericLogo() {
  const out = path.join(REPO_DIR, 'resources/lab_logo.png');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="995" height="293" viewBox="0 0 995 293">
    <rect width="995" height="293" fill="#FFFFFF" fill-opacity="0"/>
    <circle cx="145" cy="146" r="112" fill="#EBF3FA" stroke="#003366" stroke-width="10"/>
    <circle cx="145" cy="146" r="84" fill="none" stroke="#1D4ED8" stroke-width="4" stroke-dasharray="10,6"/>
    <polygon points="145,76 205,112 145,148 85,112" fill="#003366"/>
    <rect x="115" y="156" width="60" height="34" rx="6" fill="#1D4ED8"/>
    <text x="300" y="138" font-family="Microsoft YaHei, Arial, sans-serif" font-size="68" font-weight="bold" fill="#003366">AI Research Lab</text>
    <text x="304" y="205" font-family="Arial, sans-serif" font-size="34" font-weight="bold" letter-spacing="4" fill="#6B7280">GRADUATE SEMINAR TEMPLATE</text>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(out);
  return out;
}

// Generate generic schematic figures so the public demo illustrates embedded paper figures cleanly
async function makeDemoFigs() {
  // 1. Workflow diagram (fig_workflow.png, 1100 x 292)
  const wfSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="292" viewBox="0 0 1100 292">
    <rect width="1100" height="292" rx="12" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>
    <rect x="28" y="34" width="300" height="224" rx="10" fill="#FFFFFF" stroke="#003366" stroke-width="2.5"/>
    <text x="178" y="70" text-anchor="middle" font-family="Microsoft YaHei, sans-serif" font-size="22" font-weight="bold" fill="#003366">Phase 1: Data Curation</text>
    <rect x="52" y="94" width="252" height="56" rx="8" fill="#EBF3FA"/>
    <text x="178" y="128" text-anchor="middle" font-family="Consolas, monospace" font-size="18" fill="#111827">Synthetic + Real Pairs</text>
    <rect x="52" y="168" width="252" height="56" rx="8" fill="#EBF3FA"/>
    <text x="178" y="202" text-anchor="middle" font-family="Consolas, monospace" font-size="18" fill="#111827">4:1 Pair-grouped Split</text>

    <polygon points="348,136 382,136 382,122 406,146 382,170 382,156 348,156" fill="#1D4ED8"/>

    <rect x="424" y="34" width="300" height="224" rx="10" fill="#FFFFFF" stroke="#047857" stroke-width="2.5"/>
    <text x="574" y="70" text-anchor="middle" font-family="Microsoft YaHei, sans-serif" font-size="22" font-weight="bold" fill="#047857">Phase 2: Model Training</text>
    <rect x="448" y="94" width="252" height="56" rx="8" fill="#ECFDF5"/>
    <text x="574" y="128" text-anchor="middle" font-family="Consolas, monospace" font-size="18" fill="#111827">Fine-tuned LLM (LoRA)</text>
    <rect x="448" y="168" width="252" height="56" rx="8" fill="#ECFDF5"/>
    <text x="574" y="202" text-anchor="middle" font-family="Consolas, monospace" font-size="18" fill="#111827">Zero-shot / Encoder Baselines</text>

    <polygon points="744,136 778,136 778,122 802,146 778,170 778,156 744,156" fill="#047857"/>

    <rect x="820" y="34" width="252" height="224" rx="10" fill="#FFFFFF" stroke="#D97706" stroke-width="2.5"/>
    <text x="946" y="70" text-anchor="middle" font-family="Microsoft YaHei, sans-serif" font-size="22" font-weight="bold" fill="#D97706">Phase 3: Evaluation</text>
    <rect x="842" y="94" width="208" height="56" rx="8" fill="#FFFBEB"/>
    <text x="946" y="128" text-anchor="middle" font-family="Consolas, monospace" font-size="18" fill="#111827">Test Set Macro-F1</text>
    <rect x="842" y="168" width="208" height="56" rx="8" fill="#FFFBEB"/>
    <text x="946" y="202" text-anchor="middle" font-family="Consolas, monospace" font-size="18" fill="#111827">Expert Blind Review</text>
  </svg>`;
  const f4 = path.join(FIG_DIR, 'fig_workflow.png');
  await sharp(Buffer.from(wfSvg)).png().toFile(f4);

  // 2. Four square subplot figures for Page 3 (fig_exp1..4.png, 500 x 500)
  async function makeBoxPlot(filename, title, accent, bars) {
    const barEls = bars.map((b, i) => {
      const x = 68 + i * 95;
      const h = Math.round(b.val * 300);
      const y = 390 - h;
      return `
        <rect x="${x}" y="${y}" width="54" height="${h}" rx="6" fill="${b.color || accent}"/>
        <line x1="${x+27}" y1="${y-18}" x2="${x+27}" y2="${y+14}" stroke="#111827" stroke-width="3"/>
        <line x1="${x+15}" y1="${y-18}" x2="${x+39}" y2="${y-18}" stroke="#111827" stroke-width="3"/>
        <text x="${x+27}" y="${y-26}" text-anchor="middle" font-family="Consolas, monospace" font-size="17" font-weight="bold" fill="#111827">${b.val.toFixed(2)}</text>
        <text x="${x+27}" y="425" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#374151">${b.label}</text>
      `;
    }).join('');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="480" viewBox="0 0 500 480">
      <rect width="500" height="480" rx="10" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
      <text x="250" y="42" text-anchor="middle" font-family="Arial, sans-serif" font-size="21" font-weight="bold" fill="#111827">${title}</text>
      <line x1="50" y1="80" x2="460" y2="80" stroke="#E2E8F0" stroke-width="1.5"/>
      <line x1="50" y1="155" x2="460" y2="155" stroke="#E2E8F0" stroke-width="1.5"/>
      <line x1="50" y1="230" x2="460" y2="230" stroke="#E2E8F0" stroke-width="1.5"/>
      <line x1="50" y1="305" x2="460" y2="305" stroke="#E2E8F0" stroke-width="1.5"/>
      <line x1="50" y1="390" x2="460" y2="390" stroke="#475569" stroke-width="2.5"/>
      ${barEls}
    </svg>`;
    const dst = path.join(FIG_DIR, filename);
    await sharp(Buffer.from(svg)).png().toFile(dst);
    return dst;
  }

  const f5 = await makeBoxPlot('fig_exp1.png', 'Exp 1: Model Architectures (Macro-F1)', '#1D4ED8', [
    { label: 'Encoder', val: 0.66, color: '#94A3B8' },
    { label: 'Zero-shot', val: 0.68, color: '#64748B' },
    { label: 'Vanilla', val: 0.54, color: '#CBD5E1' },
    { label: 'Ours (FT)', val: 0.78, color: '#003366' },
  ]);
  const f6 = await makeBoxPlot('fig_exp2.png', 'Exp 2: Parameter Scale (Small vs Large)', '#047857', [
    { label: 'Small-T1', val: 0.80, color: '#10B981' },
    { label: 'Large-T1', val: 0.77, color: '#047857' },
    { label: 'Small-All', val: 0.75, color: '#10B981' },
    { label: 'Large-All', val: 0.78, color: '#047857' },
  ]);
  const f7 = await makeBoxPlot('fig_exp3.png', 'Exp 3: Prompting Strategy Ablation', '#D97706', [
    { label: '0-shot', val: 0.78, color: '#D97706' },
    { label: '1-shot(R)', val: 0.73, color: '#F59E0B' },
    { label: '1-shot(S)', val: 0.67, color: '#FBBF24' },
    { label: '4-shot', val: 0.66, color: '#FCD34D' },
  ]);
  const f8 = await makeBoxPlot('fig_exp4.png', 'Exp 4: Real-World Expert Verification', '#6D28D9', [
    { label: 'Type A', val: 0.84, color: '#6D28D9' },
    { label: 'Type B', val: 0.60, color: '#7C3AED' },
    { label: 'Strict(2)', val: 0.50, color: '#8B5CF6' },
    { label: 'AtLeast(1)', val: 0.82, color: '#5B21B6' },
  ]);

  return { f4, f5, f6, f7, f8 };
}

async function main() {
  const LOGO = await makeGenericLogo();
  const LOGO_R = 995 / 293;
  const FIG = await makeDemoFigs();

  const I = {
    file: await makeIcon('file', 'FileText', C.blue, C.blueBg),
    trophy: await makeIcon('trophy', 'Trophy', C.orange, C.orangeBg),
    book: await makeIcon('book', 'BookOpen', C.green, C.greenBg),
    xcircle: await makeIcon('xcircle', 'XCircle', C.red, C.redBg),
    lr: await makeIcon('lr', 'ArrowLeftRight', C.blue2, C.blueBg),
    trend: await makeIcon('trend', 'TrendingUp', C.green, C.greenBg),
    audio: await makeIcon('audio', 'AudioLines', C.orange, C.orangeBg),
    usercheck: await makeIcon('usercheck', 'UserCheck', C.orange, C.orangeBg),
    code: await makeIcon('code', 'Code', C.green, C.greenBg),
    edit: await makeIcon('edit', 'FilePenLine', C.blue, C.blueBg),
    eye: await makeIcon('eye', 'Eye', C.green, C.greenBg),
    calendar: await makeIcon('calendar', 'Calendar', C.purple, C.purpleBg),
  };

  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'Graduate Student (AI Research Lab)';
  pptx.company = 'AI Research Lab';
  pptx.title = 'Academic Group Meeting Presentation Template (4-Page High-Density)';

  const F = 'Microsoft YaHei';
  const TOTAL = 4;
  const DATE = '2026-XX-XX';
  let pageNo = 0;

  function text(s, str, x, y, w, h, o = {}) {
    const size = o.size || 12;
    s.addText(str, {
      x, y, w, h,
      fontFace: o.font || F,
      fontSize: size,
      bold: !!o.bold,
      color: o.color || C.ink,
      align: o.align || 'left',
      valign: o.valign || 'top',
      margin: o.margin ?? 0,
      lineSpacingMultiple: o.ls || 1.15,
    });
  }

  function card(s, x, y, w, h, o = {}) {
    s.addShape(pptx.ShapeType.roundRect, {
      x, y, w, h,
      rectRadius: o.r || 0.08,
      fill: { color: o.fill || C.pale },
      line: { color: o.line || C.line, width: o.lw ?? 0.8 },
    });
    if (o.topBar) {
      s.addShape(pptx.ShapeType.rect, {
        x, y, w, h: 0.06,
        fill: { color: o.topBar },
        line: { color: o.topBar, width: 0 },
      });
    }
    if (o.leftBar) {
      s.addShape(pptx.ShapeType.rect, {
        x, y, w: 0.07, h,
        fill: { color: o.leftBar },
        line: { color: o.leftBar, width: 0 },
      });
    }
  }

  function pill(s, label, x, y, w, h, bg, fg, size = 10.2) {
    s.addShape(pptx.ShapeType.roundRect, {
      x, y, w, h, rectRadius: 0.10,
      fill: { color: bg }, line: { color: bg, width: 0 },
    });
    text(s, label, x, y, w, h, { size, bold: true, color: fg, align: 'center', valign: 'middle' });
  }

  function page(title, sub, tag, sourceCite) {
    pageNo += 1;
    const s = pptx.addSlide();
    s.background = { color: C.white };
    s.addImage({ path: LOGO, x: 10.75, y: 0.18, w: 2.05, h: 2.05 / LOGO_R });
    text(s, 'AI Research Lab  路  ' + tag, 0.55, 0.22, 9.5, 0.24, { size: 11, bold: true, color: C.blue });
    text(s, title, 0.55, 0.48, 10.1, 0.44, { size: 22, bold: true, color: C.ink, valign: 'middle' });
    text(s, sub, 0.55, 0.94, 12.2, 0.24, { size: 11.5, color: C.muted, valign: 'middle' });
    s.addShape(pptx.ShapeType.line, { x: 0.55, y: 1.24, w: 12.23, h: 0, line: { color: C.line, width: 1 } });
    text(s, '姹囨姤浜猴細寮犲悓瀛? 路  AI Research Lab  路  ' + DATE, 0.55, 7.14, 3.1, 0.22, { size: 9.5, color: C.muted });
    if (sourceCite) {
      text(s, sourceCite, 3.65, 7.14, 8.35, 0.22, { size: 9.2, color: C.muted, align: 'center' });
    }
    text(s, `${pageNo} / ${TOTAL}`, 12.05, 7.14, 0.73, 0.22, { size: 9.5, color: C.muted, align: 'right' });
    return s;
  }

  const B = (t, color = C.blue) => ({ text: t, options: { bold: true, color } });
  function table(s, rows, x, y, w, colW, o = {}) {
    const size = o.size || 10.5;
    const data = rows.map((r, i) => r.map((v, j) => {
      const cellOpt = typeof v === 'object' && v !== null ? v : { text: String(v) };
      const opts = {
        fontFace: F, fontSize: size, color: C.ink, valign: 'middle',
        align: j === 0 || (o.leftCols || []).includes(j) ? 'left' : 'center',
        margin: o.margin || [2, 4, 2, 4], ...(cellOpt.options || {}),
      };
      if (i === 0) Object.assign(opts, { bold: true, color: C.white, fill: { color: C.blue } });
      else if (o.zebra !== false && i % 2 === 0) opts.fill = opts.fill || { color: C.light };
      return { text: cellOpt.text, options: opts };
    }));
    s.addTable(data, {
      x, y, w, colW,
      border: { type: 'solid', color: C.line, pt: 0.7 },
      rowH: o.rowH || 0.32,
      autoPage: false,
    });
  }

  // Page 1: Cover
  {
    pageNo += 1;
    const s = pptx.addSlide();
    s.background = { color: C.white };
    s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.24, h: 7.5, fill: { color: C.blue }, line: { color: C.blue, width: 0 } });
    s.addImage({ path: LOGO, x: 9.1, y: 0.45, w: 3.6, h: 3.6 / LOGO_R });

    pill(s, 'AI Research Lab 路 鐮旂┒鐢熺粍浼氭眹鎶ユā鏉?, 0.85, 0.65, 3.15, 0.34, C.blueBg, C.blue, 11.5);
    text(s, '棰嗗煙鎸囦护寰皟澶ц瑷€妯″瀷鐨勬柟娉曚笌瀹為獙璇勪及', 0.85, 1.35, 11.6, 0.65, { size: 32, bold: true, color: C.ink });
    text(s, '椤跺垔/椤朵細璁烘枃绮捐 (P2鈥揚3)  &  涓嬪懆鏂囩尞 Challenge / Limitation 闃呰璁″垝 (P4)', 0.85, 2.05, 11.6, 0.42, { size: 18.5, bold: true, color: C.blue2 });
    s.addShape(pptx.ShapeType.line, { x: 0.85, y: 2.68, w: 11.8, h: 0, line: { color: C.line, width: 1.2 } });

    const modules = [
      [I.file, '01  浠诲姟涓庡疄楠岃缃?(P2)', '鍥涚被鏍稿績浠诲姟鍥炬爣 + 鍘熸枃鏋舵瀯鍥綷n+ 鏁版嵁闆嗗垝鍒嗚〃涓庤川閲忕洸瀹℃煴鐘跺浘', C.blue],
      [I.trophy, '02  鍥涚粍瀹為獙鏍稿績缁撹 (P3)', '鍥涘垪骞舵帓瀵规瘮鍘熷浘涓庡叧閿寚鏍嘰n妯″瀷鏋舵瀯銆佸弬鏁拌妯°€佹彁绀轰笌鐪熷疄楠岃瘉', C.orange],
      [I.book, '03  涓嬪懆鏂囩尞闃呰璁″垝 (P4)', '涓ゅぇ瀛愭柟鍚?8 绡囦唬琛ㄦ€ф枃鐚甛n鑱氱劍棰嗗煙鍏辨€?Challenge 涓庤嚜韬?Limitation', C.green],
    ];
    modules.forEach((m, i) => {
      const x = 0.85 + i * 4.02, y = 3.05;
      card(s, x, y, 3.76, 2.55, { fill: C.pale, topBar: m[3] });
      s.addImage({ path: m[0], x: x + 0.24, y: y + 0.26, w: 0.56, h: 0.56 });
      text(s, m[1], x + 0.24, y + 0.98, 3.28, 0.36, { size: 15.5, bold: true, color: C.ink });
      text(s, m[2], x + 0.24, y + 1.42, 3.28, 0.95, { size: 12.5, color: C.muted, ls: 1.28 });
    });

    card(s, 0.85, 5.95, 11.8, 0.72, { fill: C.light, leftBar: C.blue });
    text(s, '姹囨姤浜猴細寮犲悓瀛?        鎸囧鍥㈤槦锛欰I Research Lab        姹囨姤鏃ユ湡锛? + DATE,
      1.1, 6.13, 11.3, 0.36, { size: 14, bold: true, color: C.ink, valign: 'middle' });
    text(s, `1 / ${TOTAL}`, 11.78, 7.14, 1.0, 0.22, { size: 10, color: C.muted, align: 'right' });
  }

  // Page 2: Task, Workflow & Setup
  {
    const s = page(
      '浠诲姟瀹氫箟銆佹暣浣撳伐浣滄祦锛團igure 4锛変笌瀹為獙璁剧疆锛圱able 1锛?,
      'Author et al. Top Journal / Venue, 2025  路  澶氭爣绛剧粏绮掑害鍒嗙被浠诲姟  路  2,270 绡囨垚瀵规牱鏈紙4:1 闃叉硠婕忓垝鍒嗭級',
      '01 璁烘枃绮捐 路 浠诲姟涓庡疄楠岃缃?,
      '鏂囩尞鏉ユ簮锛欰uthor A*, Author B*, et al. Paper Title Placeholder for Academic Seminar. Top Venue, 2025'
    );

    const errs = [
      [I.xcircle, '绫诲埆涓€锛氶€昏緫鐭涚浘', '鍓嶅悗鏋佹€у啿绐?, 'Context: positive 鈫?Summary: negative', C.red, C.redBg],
      [I.lr, '绫诲埆浜岋細绌洪棿鏂逛綅棰犲€?, '鎷撴墤渚у埆娣锋穯', 'Region: right-side 鈫?Summary: left-side', C.blue2, C.blueBg],
      [I.trend, '绫诲埆涓夛細鏃跺簭瓒嬪娍鍐茬獊', '杩涘睍鏂瑰悜鐭涚浘', 'Trend: decreased 鈫?Summary: increased', C.green, C.greenBg],
      [I.audio, '绫诲埆鍥涳細杩戦煶璇嶈浆鍐欏櫔澹?, 'ASR 璇嗗埆璇浆', 'Source: token_A 鉃?Misrecognized: token_B', C.orange, C.orangeBg],
    ];
    errs.forEach((e, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = 0.55 + col * 3.62, y = 1.38 + row * 1.04;
      card(s, x, y, 3.50, 0.94, { leftBar: e[4], fill: C.pale });
      s.addImage({ path: e[0], x: x + 0.14, y: y + 0.14, w: 0.36, h: 0.36 });
      text(s, e[1], x + 0.56, y + 0.12, 1.65, 0.24, { size: 11.5, bold: true, color: C.ink });
      pill(s, e[2], x + 2.25, y + 0.12, 1.12, 0.22, e[5], e[4], 9.2);
      text(s, e[3], x + 0.56, y + 0.46, 2.82, 0.36, { font: 'Consolas', size: 9.8, color: C.sub });
    });

    card(s, 0.55, 3.54, 7.12, 3.42, { topBar: C.blue, fill: C.white });
    pill(s, '鍘熻鏂囨灦鏋勫浘锛氫笁闃舵鏁翠綋宸ヤ綔娴?, 0.72, 3.68, 2.85, 0.26, C.blueBg, C.blue, 10);
    text(s, '鎴愬鏁版嵁鍚堟垚  鉃? LoRA 寰皟涓庡熀绾垮姣? 鉃? 娴嬭瘯闆嗕笌鐪熷疄鍦烘櫙鐩插', 3.68, 3.68, 3.85, 0.26, { size: 10.2, bold: true, color: C.muted, valign: 'middle' });
    s.addImage({ path: FIG.f4, x: 0.69, y: 4.18, w: 6.84, h: 1.82 });
    text(s, '杈撳叆锛氬畬鏁寸粨鏋勫寲鏂囨。娈佃惤  路  杈撳嚭锛欽SON 澶氭爣绛惧垪琛紙鍥涚被鐩爣鏍囩鎴?"No error"锛?,
      0.65, 6.48, 6.92, 0.32, { size: 9.8, bold: true, color: C.blue, align: 'center', valign: 'middle' });

    card(s, 7.82, 1.38, 4.96, 2.68, { topBar: C.blue });
    pill(s, 'Table 1锛氭垚瀵规暟鎹泦 (4:1 闃叉硠婕忓垝鍒?', 7.98, 1.50, 2.8, 0.25, C.blueBg, C.blue, 9.8);
    text(s, '鍏?2,270 绡?(1,135 瀵?', 10.88, 1.50, 1.75, 0.25, { size: 10.5, bold: true, color: C.blue, align: 'right', valign: 'middle' });

    table(s, [
      ['鏁版嵁闆嗙淮搴?, 'Part 1 绾悎鎴?, 'Part 2 鐪熷疄鏀瑰啓', '鎬昏'],
      ['姝ｆ牱鏈?/ 璐熸牱鏈?, '828 / 828', '307 / 307', B('1,135 瀵?)],
      ['绫诲埆涓€ / 绫诲埆浜?, '299 / 233', '99 / 93', '398 / 326'],
      ['绫诲埆涓?/ 绫诲埆鍥?, '62 / 489', '91 / 189', '153 / 678'],
      ['璁粌闆?/ 娴嬭瘯闆?(4:1)', '1,316 / 340', '500 / 114', B('1,816 / 454')],
    ], 7.96, 1.82, 4.68, [1.58, 1.05, 1.05, 1.00], { size: 9.5, rowH: 0.29 });

    text(s, '璁粌閰嶇疆锛歀LM-8B/70B (QLoRA, lr=3e-4, 3 ep) vs. 闂簮澶фā鍨?(zs) vs. Encoder (鍏ㄥ弬)',
      7.96, 3.68, 4.68, 0.28, { size: 9.5, bold: true, color: C.sub, valign: 'middle' });

    card(s, 7.82, 4.18, 4.96, 2.78, { topBar: C.orange });
    s.addImage({ path: I.usercheck, x: 7.96, y: 4.30, w: 0.34, h: 0.34 });
    text(s, '198 渚嬪悎鎴愭牱鏈笓瀹跺弻鐩插鏍稿噯纭巼 (魏 = 0.734)', 8.38, 4.30, 4.25, 0.34, { size: 11.5, bold: true, color: C.ink, valign: 'middle' });

    s.addChart(pptx.ChartType.bar, [{
      name: '娉ㄥ叆鍑嗙‘鐜?,
      labels: ['绫诲埆浜?(63/66)', '绫诲埆鍥?(58/70)', '绫诲埆涓€ (30/48)', '绫诲埆涓?(8/14)'],
      values: [0.95, 0.83, 0.63, 0.57],
    }], {
      x: 7.92, y: 4.66, w: 4.72, h: 1.78,
      barDir: 'bar', chartColors: [C.blue2],
      catAxisLabelFontFace: F, catAxisLabelFontSize: 10, catAxisOrientation: 'maxMin',
      valAxisMinVal: 0, valAxisMaxVal: 1.08, valAxisLabelFormatCode: '0%', valAxisLabelFontSize: 9, valAxisLabelFontFace: F,
      showValue: true, dataLabelFormatCode: '0%', dataLabelFontSize: 10.5, dataLabelFontFace: F, dataLabelColor: C.ink,
      showTitle: false, valGridLine: { color: 'E5EAF0', size: 0.5 }, barGapWidthPct: 50,
    });

    text(s, '缁撹锛氬眬閮ㄨ瘝鏇挎崲鍑嗙‘鐜囬珮 (83%鈥?5%)锛涜法鍙ラ€昏緫绫诲瓨鍦?~37% 鍚堟垚鏍囩鍣０銆?,
      7.96, 6.52, 4.68, 0.34, { size: 9.6, bold: true, color: C.orange, valign: 'middle' });
  }

  // Page 3: 4-Experiment Comparison
  {
    const s = page(
      '鍥涚粍瀹為獙鏍稿績缁撹鎬昏锛堝師璁烘枃 Figure 5 / 6 / 7 / 8锛?,
      '寰皟澶фā鍨嬫渶楂?(0.780)  路  杞婚噺 8B 妯″瀷閫艰繎 (0.749)  路  Zero-shot 鏈€绋? 路  鐪熷疄鍦烘櫙 81.5% 鑾蜂笓瀹剁‘璁?,
      '02 瀹為獙缁撹 路 鍥涚粍瀹為獙涓庡眬闄?,
      '鏂囩尞鏉ユ簮锛欰uthor A*, Author B*, et al. Paper Title Placeholder for Academic Seminar. Top Venue, 2025'
    );

    const cols = [
      {
        tag: '瀹為獙涓€锛氭ā鍨嬪姣?(Fig. 5)',
        kpi: '寰皟妯″瀷鏈€楂橈細F1 = 0.780',
        fig: FIG.f5, figW: 2.45, figH: 2.35,
        accent: C.blue, bg: C.blueBg, line: C.blueLine,
        bullets: '鈥?鏄捐憲瓒呰秺闂簮闆舵牱鏈?(0.683) 涓?Encoder\n鈥?绫诲埆鍥?Recall 浠?0.17 澶у箙鎷夊崌鑷?0.76\n鈥?鍥哄畾鏂逛綅璇嶈〃涓?Encoder 灞€閮ㄥ崰浼?(0.845)',
      },
      {
        tag: '瀹為獙浜岋細鍙傛暟瑙勬ā (Fig. 6)',
        kpi: '8B 杈?0.749 (浠呭樊 3.1%)',
        fig: FIG.f6, figW: 2.45, figH: 2.35,
        accent: C.green, bg: C.greenBg, line: C.greenLine,
        bullets: '鈥?绫诲埆涓€涓?8B 鍙嶈秴 70B (0.803 > 0.769)\n鈥?绫诲埆浜屼袱鑰呮棤缁熻瀛﹀樊寮?(ns)\n鈥?70B 鍦ㄥ皯鏍锋湰璺ㄥ彞鎺ㄧ悊 (+0.104) 鍗犱紭',
      },
      {
        tag: '瀹為獙涓夛細鎻愮ず绛栫暐 (Fig. 7)',
        kpi: 'Zero-shot 0.780 鏈€绋?,
        fig: FIG.f7, figW: 2.45, figH: 2.35,
        accent: C.orange, bg: C.orangeBg, line: C.orangeLine,
        bullets: '鈥?1-shot 璺岃嚦 0.729 / 0.670\n鈥?4-shot 鏆磋穼鑷?0.659 / 0.671\n鈥?寰皟宸插唴鍖栭浂鏍锋湰鏍煎紡锛岄暱绀轰緥寮曞亸缃?,
      },
      {
        tag: '瀹為獙鍥涳細鐪熷疄鍦烘櫙鐩插 (Fig. 8)',
        kpi: '81.5% 鑷冲皯涓€涓撳纭',
        fig: FIG.f8, figW: 2.45, figH: 2.35,
        accent: C.purple, bg: C.purpleBg, line: C.purpleLine,
        bullets: '鈥?娴烽噺鐪熷疄鏍锋湰绛?200 渚嬶細鍙屼汉纭 49.5%\n鈥?瀹㈣杩戦煶璇嶈浆鍐欑‘璁ょ巼鏈€楂?(84% / 96%)\n鈥?璺ㄥ彞鐪佺暐涔犳儻瀵艰嚧涓嶅悓骞磋祫涓撳鍒嗘',
      },
    ];

    cols.forEach((c, i) => {
      const x = 0.55 + i * 3.10, y = 1.38, w = 2.92, h = 4.68;
      card(s, x, y, w, h, { topBar: c.accent, fill: C.white });
      pill(s, c.tag, x + 0.14, y + 0.12, w - 0.28, 0.25, c.bg, c.accent, 9.8);
      text(s, c.kpi, x + 0.10, y + 0.42, w - 0.20, 0.28, { size: 12.0, bold: true, color: c.accent, align: 'center', valign: 'middle' });

      const fx = x + (w - c.figW) / 2;
      s.addImage({ path: c.fig, x: fx, y: y + 0.76, w: c.figW, h: c.figH });

      card(s, x + 0.12, y + 3.26, w - 0.24, 1.30, { fill: c.bg, line: c.line, leftBar: c.accent });
      text(s, c.bullets, x + 0.24, y + 3.34, w - 0.42, 1.16, { size: 9.6, bold: true, color: C.ink, ls: 1.22, valign: 'middle' });
    });

    card(s, 0.55, 6.18, 12.22, 0.80, { fill: C.light, leftBar: C.blue });
    s.addImage({ path: I.code, x: 0.72, y: 6.32, w: 0.48, h: 0.48 });
    text(s, [
      { text: '鏂规硶瀛﹀眬闄愪笌鍩虹嚎澶嶇幇琛旀帴锛?, options: { bold: true, color: C.blue } },
      { text: '鈶?浠呭仛鏂囨。绾у垎绫伙紝' },
      { text: '鏈畾浣嶉敊璇粏绮掑害 Span銆佹湭杈撳嚭鏈€灏忎慨鏀瑰缓璁?, options: { bold: true, color: C.red } },
      { text: '锛涒憽 缂轰箯璺ㄦā鎬佽瑙夐敋瀹氾紱鈶?寮€婧愪唬鐮佸簱鍙洿鎺ヤ綔涓鸿交閲忕骇 4B/8B 妯″瀷瀹為獙鐨勫叕鍏卞姣斿熀绾裤€? },
    ], 1.30, 6.24, 11.30, 0.68, { size: 11.2, valign: 'middle', ls: 1.2 });
  }

  // Page 4: Next Week Literature Reading Plan (Challenge & Limitation)
  {
    const s = page(
      '涓嬪懆宸ヤ綔璁″垝锛氶槄璇讳袱澶у叧鑱旀柟鍚戜唬琛ㄦ€ф枃鐚?,
      '鑱氱劍 8 绡囦唬琛ㄤ綔锛?024鈥?026锛夋彮绀虹殑棰嗗煙鍏辨€ф寫鎴橈紙Challenges锛変笌璁烘枃鑷韩灞€闄愭€э紙Limitations锛?,
      '03 涓嬪懆璁″垝 路 鏂囩尞闃呰 (Limitation & Challenge)',
      '鏂囩尞鏉ユ簮锛欱enchmark-A / Method-B / Framework-C / Dataset-D (2024鈥?026 Top Venues)'
    );

    card(s, 0.55, 1.38, 5.98, 4.92, { topBar: C.blue, fill: C.white });
    s.addImage({ path: I.edit, x: 0.75, y: 1.52, w: 0.42, h: 0.42 });
    text(s, '涓€銆佹柟鍚?A锛氳嚜鍔ㄦ牳楠屼笌缁嗙矑搴︾籂閿欙紙4 绡囷級', 1.26, 1.50, 5.10, 0.26, { size: 13.5, bold: true, color: C.blue });
    text(s, '鍏辨€?Challenge锛氱敓鎴愪笌鏍搁獙鑳藉姏瑙ｈ€︺€佺粏绮掑害婕忔鐜囬珮銆佽繃搴︽敼鍐欑牬鍧忓師鍙?, 1.26, 1.78, 5.10, 0.22, { size: 9.8, bold: true, color: C.red });

    const corrPapers = [
      [
        '1. Benchmark-A (Top Conf 2026)',
        '鏃犲弬鑰冪鍒扮鑷姩璐ㄦ帶鍩哄噯 (10,362 瀵?',
        '鈥?Challenge锛氭渶寮洪€氱敤妯″瀷鍑嗙‘鐜囦粎 ~41%锛屾瀬鏄撴紡妫€闅愭€ч仐婕忥紝瀛樺湪闈欓粯鏀捐\n鈥?Limitation锛氬悎鎴愬櫔澹板瓨鍦ㄥ垎甯冨亸宸紱鈥滃叏鎴栨棤鈥濆垽鍒嗘贩娣嗕簡閿欒瀹氫綅涓庝慨澶?,
        C.blue, C.blueBg,
      ],
      [
        '2. Dataset-B (Top Conf 2025)',
        '澶ц妯″崟/澶氶敊璇暟鎹泦 + 涓夐樁娈靛姝?RL',
        '鈥?Challenge锛氭暣绡囨寚鏍囪櫄楂?(0.853) vs 鍙ョ骇鏆磋穼 (0.386)锛涘閿欎笅鍏ㄦ枃鏀瑰啓宕╃洏\n鈥?Limitation锛氱己涔忚法鏃堕棿搴忓垪涓庡巻鍙蹭笂涓嬫枃瀵规瘮鐨勭旱鍚戝姩鎬侀敊璇被鍨?,
        C.blue, C.blueBg,
      ],
      [
        '3. Framework-C (Preprint 2026)',
        '澶栭儴瑙嗚鍒嗙被琛?+ 浠ｇ爜鐢熸垚浜嬪悗鍘诲够瑙?,
        '鈥?Challenge锛氬幓骞昏瀛樺湪 Precision鈥揜ecall 璺疯贩鏉匡紙璇垹鐪熼槼鎬э紝闀垮熬绫?F1=0锛塡n鈥?Limitation锛氬彈闄愪簬鍓嶇鍒嗙被鍣ㄥ浐瀹氱被鍒〃锛屾棤娉曟牳楠岀▼搴﹀睘鎬т笌鐩稿浣嶇疆',
        C.blue, C.blueBg,
      ],
      [
        '4. Metric-D (Top Conf 2024)',
        '鏈夊弬鑰冮€愯鏈€灏忎慨鏀逛笌 5 绾т弗閲嶅害璇勪及',
        '鈥?Challenge锛氬鍚屼箟鏀瑰啓鏋佸害鏁忔劅锛堟槗灏嗘枃浣撳彞娉曞樊寮傝鍒や负闇€閲嶅啓閿欒锛塡n鈥?Limitation锛氬繀椤讳緷璧栫湡瀹?Ground-truth 鍙傝€冩枃鏈笖鏃犲妯℃€佽緭鍏?,
        C.blue, C.blueBg,
      ],
    ];

    corrPapers.forEach((p, idx) => {
      const y = 2.08 + idx * 1.03;
      card(s, 0.72, y, 5.64, 0.94, { leftBar: p[3], fill: C.pale });
      text(s, p[0], 0.88, y + 0.06, 2.55, 0.22, { size: 10.6, bold: true, color: C.ink });
      pill(s, p[1], 3.38, y + 0.06, 2.86, 0.22, p[4], p[3], 8.8);
      text(s, p[2], 0.88, y + 0.32, 5.38, 0.56, { size: 9.3, color: C.sub, ls: 1.16 });
    });

    card(s, 6.75, 1.38, 6.03, 4.92, { topBar: C.green, fill: C.white });
    s.addImage({ path: I.eye, x: 6.95, y: 1.52, w: 0.42, h: 0.42 });
    text(s, '浜屻€佹柟鍚?B锛氭椂绌哄榻愮敓鎴愪笌鏄惧紡鎺ㄧ悊锛? 绡囷級', 7.46, 1.50, 5.15, 0.26, { size: 13.5, bold: true, color: C.green });
    text(s, '鍏辨€?Challenge锛氱┖闂村畾浣嶄笌鏃跺簭婕斿彉鍓茶銆侀暱灏?Recall 涓嶈冻銆佽缁冭鏂欏厛楠屾薄鏌?, 7.46, 1.78, 5.15, 0.22, { size: 9.8, bold: true, color: C.orange });

    const genPapers = [
      [
        '1. GroundGen-E (Top Conf 2026)',
        '鍏ㄥ眬鏃堕棿 Token + 鍖哄煙 ROI 绾靛悜鐢熸垚',
        '鈥?Challenge锛氫紶缁熸ā鍨嬬┖闂村尯鍩熶笌鏃堕棿杩涘睍鍓茶锛堝彉鍖栬瘝涓庨儴浣嶅紶鍐犳潕鎴达級\n鈥?Limitation锛氬己缁戝畾鍥哄畾鏁伴噺棰勫畾涔夋Ы浣嶏紱鏃犳硶鑷敱妗嗗嚭浠绘剰鐩爣锛涗粎闄愬弻鏃剁浉',
        C.green, C.greenBg,
      ],
      [
        '2. SeqBench-F (Top Conf 2026)',
        '鍗曠瘒涓庡畬鏁村簭鍒楃骇缁撴瀯鍖栬瘎浼板熀鍑?,
        '鈥?Challenge锛氬崟娆＄敓鎴愬皻鍙紝浣嗗湪瀹屾暣鏃堕棿搴忓垪/鑷洖褰掔骇鑱斾笅鍑虹幇鏃跺簭鐭涚浘\n鈥?Limitation锛氶暱搴忓垪鏍锋湰閲忚緝灏忎笖鍚椂闂存柇灞傦紱绾枃鏈搷浣滅己涔忓儚绱犵骇绌洪棿閿氬畾',
        C.green, C.greenBg,
      ],
      [
        '3. CompactRL-G (Preprint 2026)',
        '鐗瑰緛鍘嬬缉閫傞厤鍣?+ 缁撴瀯鍖栨椂闂村祵鍏?+ GRPO',
        '鈥?Challenge锛氱敓鎴愭枃鏈祦鐣呬絾缁嗗井绫诲埆 Recall 钀藉悗涓撳锛涜缁冭鏂欏惈 69% 鏃犳晥寮曠敤\n鈥?Limitation锛氭椂闂村崟璋冭“鍑忓亣璁句笉閫傜敤闀垮懆鏈熼殢璁匡紱缂哄皯缁撴瀯鍖栬〃鏍煎妯℃€佽緭鍏?,
        C.green, C.greenBg,
      ],
      [
        '4. ReasonVLM-H (Preprint 2026)',
        '鐧句竾绾у悎鎴愭帹鐞嗚建杩?+ 浣庢柟宸繃婊?GRPO',
        '鈥?Challenge锛?5% 鐢熸垚鍒濈浠嶉渶涓撳浜哄伐缂栬緫锛涘崟娆¤緭鍏ユ畫鐣欒櫄鍋囧巻鍙插姣斾吉褰盶n鈥?Limitation锛氭帹鐞嗛摼鐢辨枃鏈ā鍨嬮€嗗悜鍚堟垚锛堝疄浣撲簨瀹炴€у亸浣庯級锛涙樉寮忔帹鐞嗗欢杩?脳4',
        C.green, C.greenBg,
      ],
    ];

    genPapers.forEach((p, idx) => {
      const y = 2.08 + idx * 1.03;
      card(s, 6.92, y, 5.68, 0.94, { leftBar: p[3], fill: C.pale });
      text(s, p[0], 7.08, y + 0.06, 2.65, 0.22, { size: 10.6, bold: true, color: C.ink });
      pill(s, p[1], 9.68, y + 0.06, 2.82, 0.22, p[4], p[3], 8.8);
      text(s, p[2], 7.08, y + 0.32, 5.42, 0.56, { size: 9.3, color: C.sub, ls: 1.16 });
    });

    card(s, 0.55, 6.40, 12.23, 0.62, { fill: C.purpleBg, line: C.purpleLine, leftBar: C.purple });
    s.addImage({ path: I.calendar, x: 0.74, y: 6.50, w: 0.42, h: 0.42 });
    text(s, [
      { text: '涓嬪懆闃呰閲嶇偣锛?, options: { bold: true, color: C.purple } },
      { text: '閫愮瘒绮捐涓婅堪 8 绡囨柟鍚?A 涓庢柟鍚?B 浠ｈ〃鎬ф枃鐚紝閲嶇偣鎷嗚В鍏?' },
      { text: '瀹為獙澶辫触妯″紡锛圕hallenge锛変笌浣滆€呰嚜杩板眬闄愶紙Limitation锛?, options: { bold: true, color: C.ink } },
      { text: '锛屼粠涓嚌缁冧笅涓€姝ュ彲鍒囧叆鐨勭爺绌堕棶棰樸€? },
    ], 1.28, 6.48, 11.35, 0.46, { size: 11.2, valign: 'middle' });
  }

  const outFile = path.join(REPO_DIR, 'examples/demo-group-meeting.pptx');
  await pptx.writeFile({ fileName: outFile });
  console.log('written anonymized demo pptx:', outFile);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

