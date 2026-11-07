/**
 * PDF 论文原图裁剪与尺寸校验脚本
 *
 * 用法：
 *   node scripts/crop_and_verify_figs.cjs <pagesDir> <outFigsDir>
 *
 * 防错原则：
 * 1. 设置 SPECS 前务必先查看渲染出的 p1.png, p2.png... 确认每张 Figure 所在的真实页码；
 * 2. 裁剪完成后务必逐张查看生成的 figX.png，核对子图标题与坐标轴，严防配图混淆。
 */

const path = require('path');
const fs = require('fs');
const sharp = require(process.env.SHARP_PATH || 'sharp');

const pagesDir = process.argv[2] || './pages';
const outDir = process.argv[3] || './figs';
fs.mkdirSync(outDir, { recursive: true });

const SPECS = [
  { name: 'fig4.png', page: 'p5.png',  left: 0.06, top: 0.06, width: 0.88, height: 0.235 },
  { name: 'fig5.png', page: 'p6.png',  left: 0.07, top: 0.06, width: 0.86, height: 0.646 },
  { name: 'fig6.png', page: 'p8.png',  left: 0.07, top: 0.06, width: 0.86, height: 0.646 },
  { name: 'fig7.png', page: 'p9.png',  left: 0.07, top: 0.06, width: 0.86, height: 0.646 },
  { name: 'fig8.png', page: 'p10.png', left: 0.07, top: 0.06, width: 0.43, height: 0.600 },
];

async function run() {
  for (const s of SPECS) {
    const src = path.join(pagesDir, s.page);
    if (!fs.existsSync(src)) {
      console.warn(`[skip] 未找到页面图像: ${src}`);
      continue;
    }
    const meta = await sharp(src).metadata();
    const rect = {
      left: Math.round(meta.width * s.left),
      top: Math.round(meta.height * s.top),
      width: Math.round(meta.width * s.width),
      height: Math.round(meta.height * s.height),
    };
    const dst = path.join(outDir, s.name);
    await sharp(src).extract(rect).toFile(dst);
    const outMeta = await sharp(dst).metadata();
    console.log(`[ok] ${s.name} <- ${s.page} (${outMeta.width}x${outMeta.height}, ratio=${(outMeta.width / outMeta.height).toFixed(3)})`);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
