// Buduje Adrian-Musiol-portfolio.pdf z README.md i docs/adymus.md.
// Markdown renderuje API GitHuba, więc PDF ma tę samą treść co strona repozytorium.
// Znaczniki w plikach .md (niewidoczne na GitHubie):
//   <!-- pdf:skip-start --> ... <!-- pdf:skip-end -->  fragment pomijany w PDF
//   <!-- pdf:page-break -->                             nowa strona w PDF
// Wymagania: Node 18+ oraz Microsoft Edge albo Google Chrome (ścieżkę można podać w PDF_BROWSER).
// Użycie: node scripts/build-pdf.mjs
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO_URL = 'https://github.com/Adymus112/adrian-musiol';
const SOURCES = ['README.md', 'docs/adymus.md'];
const OUTPUT = path.join(ROOT, 'Adrian-Musiol-portfolio.pdf');
const TITLE = 'Adrian Musioł, portfolio';

const BROWSER_CANDIDATES = [
  process.env.PDF_BROWSER,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];

const MIME_TYPES = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

function findBrowser() {
  const browser = BROWSER_CANDIDATES.find((candidate) => candidate && existsSync(candidate));
  if (!browser) throw new Error('Nie znaleziono Edge ani Chrome. Podaj ścieżkę w zmiennej PDF_BROWSER.');
  return browser;
}

function stripSkipped(markdown) {
  return markdown.replace(/<!-- pdf:skip-start -->[\s\S]*?<!-- pdf:skip-end -->\r?\n?/g, '');
}

function splitPages(markdown) {
  return markdown.split(/^<!-- pdf:page-break -->\r?$/m);
}

async function renderMarkdown(text) {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-pdf-build' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const response = await fetch('https://api.github.com/markdown', {
    method: 'POST',
    headers,
    body: JSON.stringify({ text, mode: 'markdown' }),
  });
  if (!response.ok) {
    throw new Error(`GitHub Markdown API: ${response.status} ${await response.text()}`);
  }
  return response.text();
}

// Obrazy osadza jako data URI, a względne linki zamienia na adresy w repozytorium,
// żeby PDF działał poza katalogiem projektu.
function resolveLinks(html, sourceDir) {
  return html
    .replace(/(<img\b[^>]*?\bsrc=")([^"]+)"/g, (match, prefix, src) => {
      if (/^(https?:|data:)/.test(src)) return match;
      const file = path.join(ROOT, sourceDir, decodeURIComponent(src));
      const mime = MIME_TYPES[path.extname(file).toLowerCase()] ?? 'application/octet-stream';
      return `${prefix}data:${mime};base64,${readFileSync(file).toString('base64')}"`;
    })
    .replace(/(<a\b[^>]*?\bhref=")([^"#][^"]*)"/g, (match, prefix, href) => {
      if (/^(https?:|mailto:|data:)/.test(href)) return match;
      return `${prefix}${REPO_URL}/blob/main/${path.posix.join(sourceDir, href)}"`;
    });
}

const css = readFileSync(path.join(ROOT, 'scripts', 'pdf.css'), 'utf8');
const sections = [];
for (const source of SOURCES) {
  const pages = splitPages(stripSkipped(readFileSync(path.join(ROOT, source), 'utf8')));
  const rendered = [];
  for (const markdown of pages) {
    rendered.push(resolveLinks(await renderMarkdown(markdown), path.posix.dirname(source)));
  }
  sections.push(`<article class="doc">\n${rendered.join('\n<div class="page-break"></div>\n')}\n</article>`);
}

const page = `<!doctype html>
<html lang="pl">
<head>
<meta charset="utf-8">
<title>${TITLE}</title>
<style>
${css}
</style>
</head>
<body>
${sections.join('\n')}
</body>
</html>
`;

const workDir = mkdtempSync(path.join(tmpdir(), 'portfolio-pdf-'));
try {
  const htmlFile = path.join(workDir, 'portfolio.html');
  writeFileSync(htmlFile, page, 'utf8');
  execFileSync(findBrowser(), [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-pdf-header-footer',
    `--user-data-dir=${path.join(workDir, 'profile')}`,
    `--print-to-pdf=${OUTPUT}`,
    pathToFileURL(htmlFile).href,
  ], { stdio: 'inherit' });
} finally {
  rmSync(workDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}

console.log(`Zapisano ${path.relative(ROOT, OUTPUT)}`);
