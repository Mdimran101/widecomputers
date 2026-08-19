const fs = require('fs');
const path = require('path');

const replacements = [
  ['x Apparels Atelier', 'Wide Computers Atelier'],
  ['x Apparels Boutique', 'Wide Computers Boutique'],
  ['x Apparels Curators', 'Wide Computers Curators'],
  ['x Apparels Intelligence', 'Wide Computers Intelligence'],
  ['x Apparels Editorial', 'Wide Computers Editorial'],
  ['x Apparels Assistant', 'Wide Computers Assistant'],
  ['x Apparels CO.', 'Wide Computers CO.'],
  ['x Apparels Team', 'Wide Computers Team'],
  ['x Apparels AI', 'Wide Computers AI'],
  ['x Apparelsr', 'Wide Computers'],  // typo fix in manifest.ts
  ['x Apparels', 'Wide Computers'],
  ['xApparels', 'WideComputers'],
  ['xapparels.com', 'widecomputers.com'],
  ['xapparels', 'widecomputers'],
];

const extensions = ['.ts', '.tsx', '.js', '.jsx'];

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && file !== 'node_modules' && file !== '.next') {
      walkDir(fullPath);
    } else if (stat.isFile() && extensions.includes(path.extname(file))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;
      for (const [from, to] of replacements) {
        content = content.split(from).join(to);
      }
      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated:', fullPath.replace(process.cwd() + path.sep, ''));
      }
    }
  });
}

walkDir(path.join(process.cwd(), 'src'));
console.log('\nDone! All branding updated.');
