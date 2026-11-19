// Export the deck to PDF with DeckTape.
// Starts a temporary Vite dev server, prints every slide at 1280x720, then shuts down.
// Usage: npm run pdf [-- output.pdf] [-- --query "version=referencia"]
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { createServer } from 'vite';

const args = process.argv.slice(2);
const queryIndex = args.indexOf('--query');
const query = queryIndex >= 0 ? args.splice(queryIndex, 2)[1] : '';
const output = args[0] || 'tmp/boyaconf-2026.pdf';
mkdirSync(dirname(output), { recursive: true });

const server = await createServer({ server: { host: '127.0.0.1', port: 5180 }, logLevel: 'warn' });
await server.listen();
const url = `${server.resolvedUrls.local[0]}${query ? `?${query}` : ''}`;
console.log(`Exportando ${url} -> ${output}`);

const code = await new Promise(resolve => {
  const child = spawn('npx', ['-y', 'decktape@3.17.0', 'reveal', '--size', '1280x720', '--pause', '1500', url, output], { stdio: 'inherit' });
  child.on('exit', resolve);
});

await server.close();
process.exit(code ?? 1);
