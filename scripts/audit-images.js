const fs = require('fs');
const path = require('path');

const publicDir = path.join(process.cwd(), 'public');
let totalImages = 0;
let missingImages = 0;
const missingPaths = new Set();
const filesWithMissing = new Set();

function cleanThumbnailSuffix(imgPath) {
  return imgPath.replace(/-\d+x\d+(\.[a-zA-Z0-9]+)$/, (m, ext) => ext);
}

function checkContent(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      checkContent(full);
    } else if (entry.name.endsWith('.mdx')) {
      const txt = fs.readFileSync(full, 'utf-8');

      const matches = [...txt.matchAll(/(?:\/uploads\/|http:\/\/[^"'\s]+\/wp-content\/uploads\/)([^"'\s\)\>]+)/gi)];
      for (const m of matches) {
        totalImages++;
        let imgPath = m[1].replace(/["'\)\>]$/, '').split('"')[0].split("'")[0];
        imgPath = cleanThumbnailSuffix(imgPath);

        const diskPath = path.join(publicDir, 'uploads', imgPath);
        if (!fs.existsSync(diskPath)) {
          missingImages++;
          missingPaths.add(imgPath);
          filesWithMissing.add(path.relative(process.cwd(), full));
        }
      }
    }
  }
}

checkContent('content');
console.log('Total image references in MDX:', totalImages);
console.log('Missing image files after thumbnail fix:', missingImages);
console.log('Files with missing images:', filesWithMissing.size);
if (missingPaths.size > 0) {
  console.log('\nRemaining missing image paths:');
  Array.from(missingPaths).forEach(p => console.log(' - ' + p));
}
