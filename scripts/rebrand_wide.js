const fs = require('fs');
const path = require('path');

const replacements = [
  // Emails
  ['concierge@widecomputers.com', 'concierge@widecomputers.com'],
  ['support@widecomputers.com', 'support@widecomputers.com'],
  ['info@widecomputers.com', 'info@widecomputers.com'],
  
  // Specific case-sensitive matches
  ['Wide Computers', 'Wide Computers'],
  ['Wide Computers', 'Wide Computers'],
  ['WideComputers', 'WideComputers'],
  ['WIDE COMPUTERS', 'WIDE COMPUTERS'],
  ['widecomputers-app', 'widecomputers-app'],
  ['widecomputers.com', 'widecomputers.com'],
  ['WideComputers.com', 'WideComputers.com'],
  ['wide-computers', 'wide-computers'],
  ['widecomputers', 'widecomputers'],
  
  // App names or general descriptions
  ['Wide Computers', 'Wide Computers']
];

const extensions = ['.ts', '.tsx', '.js', '.jsx', '.json', '.yml', '.yaml', '.md', '.css', '.html', '.env', '.local', '.dockerignore'];
const fileNames = ['Dockerfile', 'docker-compose.yml', '.env.local'];

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    // Skip version control and build folders
    if (stat.isDirectory() && file !== 'node_modules' && file !== '.next' && file !== '.git') {
      walkDir(fullPath);
    } else if (stat.isFile()) {
      const ext = path.extname(file);
      const isTargetFile = extensions.includes(ext) || fileNames.includes(file);
      
      // Specifically skip bd-locations.ts to avoid renaming geographic "Ruma"
      if (file === 'bd-locations.ts') {
        return;
      }
      
      // Skip binary/lock files
      if (file === 'package-lock.json') {
        return;
      }
      
      if (isTargetFile) {
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
    }
  });
}

console.log('Starting rebranding to Wide Computers...');
walkDir(process.cwd());
console.log('\nDone! All branding updated.');
