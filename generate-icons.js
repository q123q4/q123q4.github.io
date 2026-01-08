/**
 * 生成小程序 tabBar 图标
 * 运行方法: node generate-icons.js
 */

const fs = require('fs');
const path = require('path');

// 图标配置
const icons = [
  { name: 'book', emoji: '📚', color: '#666666' },
  { name: 'book-active', emoji: '📚', color: '#1890ff' },
  { name: 'borrow', emoji: '📖', color: '#666666' },
  { name: 'borrow-active', emoji: '📖', color: '#1890ff' },
  { name: 'user', emoji: '👤', color: '#666666' },
  { name: 'user-active', emoji: '👤', color: '#1890ff' }
];

// 简单的 SVG 生成（转换为 Base64）
function generateIconSVG(emoji, color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="81" height="81" viewBox="0 0 81 81">
    <rect width="81" height="81" fill="${color}" fill-opacity="0.1"/>
    <text x="50%" y="55%" font-size="50" text-anchor="middle" dominant-baseline="middle">${emoji}</text>
  </svg>`;
}

// 创建目录
const imagesDir = path.join(__dirname, 'miniprogram', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

console.log('开始生成图标...');

icons.forEach(icon => {
  const svg = generateIconSVG(icon.emoji, icon.color);
  const svgPath = path.join(imagesDir, `${icon.name}.svg`);
  
  fs.writeFileSync(svgPath, svg);
  console.log(`✅ 已生成: ${icon.name}.svg`);
});

console.log('\n⚠️  注意：微信小程序 tabBar 图标必须使用 PNG 格式');
console.log('⚠️  已生成的 SVG 文件需要转换为 PNG');
console.log('\n📝 解决方案：');
console.log('1. 使用在线工具将 SVG 转换为 PNG (如: https://cloudconvert.com/svg-to-png)');
console.log('2. 或使用 Photoshop/GIMP 等设计工具手动创建 81x81 像素的 PNG 图标');
console.log('3. 确保每个图标大小不超过 40KB');
console.log('\n📂 SVG 文件位置: miniprogram/images/');
console.log('\n需要转换的文件：');
icons.forEach(icon => console.log(`   - ${icon.name}.svg → ${icon.name}.png`));
