const fs = require('fs');
const path = require('path');

const replacements = [
  ['x Apparels Atelier', 'Rumas World Atelier'],
  ['x Apparels Boutique', 'Rumas World Boutique'],
  ['x Apparels Curators', 'Rumas World Curators'],
  ['x Apparels Intelligence', 'Rumas World Intelligence'],
  ['x Apparels Editorial', 'Rumas World Editorial'],
  ['x Apparels Assistant', 'Rumas World Assistant'],
  ['x Apparels CO.', 'Rumas World CO.'],
  ['x Apparels Team', 'Rumas World Team'],
  ['x Apparels AI', 'Rumas World AI'],
  ['x Apparelsr', 'Rumas World'],  // typo fix in manifest.ts
  ['x Apparels', 'Rumas World'],
  ['xApparels', 'RumasWorld'],
  ['xapparels.com', 'rumasworld.com'],
  ['xapparels', 'rumasworld'],
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
