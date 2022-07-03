import { writeFileSync } from 'fs';

writeFileSync('dist/mjs/package.json', JSON.stringify({type: 'module'}))
writeFileSync('dist/cjs/package.json', JSON.stringify({ type: 'commonjs' }))
