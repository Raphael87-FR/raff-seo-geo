// Synthetic audit fixture, not a repository utility. Do not execute it.
import { readFile, writeFile } from 'node:fs/promises';
const today = new Date().toISOString().slice(0, 10);
for (const path of ['public/index.html', 'public/faq.html']) {
  const html = await readFile(path, 'utf8');
  await writeFile(path, html.replace(/<time data-content-date datetime="[^"]+">[^<]+<\/time>/g,
    `<time data-content-date datetime="${today}">${today}</time>`));
}
