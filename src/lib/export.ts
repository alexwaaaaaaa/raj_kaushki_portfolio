import type { ExportConfig, PortfolioData } from '@/types';
import { downloadFile } from './utils';

export function exportAsJSON(data: PortfolioData, themeData: unknown, layoutData: unknown): void {
  const payload = {
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    portfolio: data,
    theme: themeData,
    layout: layoutData,
  };
  downloadFile(
    JSON.stringify(payload, null, 2),
    `raj-kaushki-portfolio-${Date.now()}.json`,
    'application/json'
  );
}

export function importFromJSON(jsonString: string): {
  portfolio?: PortfolioData;
  theme?: unknown;
  layout?: unknown;
} {
  try {
    const parsed = JSON.parse(jsonString) as {
      portfolio?: PortfolioData;
      theme?: unknown;
      layout?: unknown;
    };
    return parsed;
  } catch {
    throw new Error('Invalid JSON file. Please upload a valid portfolio backup.');
  }
}

export function exportAsHTML(portfolioData: PortfolioData): void {
  const html = generateStaticHTML(portfolioData);
  downloadFile(html, `raj-kaushki-portfolio-${Date.now()}.html`, 'text/html');
}

function generateStaticHTML(data: PortfolioData): string {
  const { profile, experience, skills } = data;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${profile.name} — ${profile.title}</title>
  <meta name="description" content="${profile.summary.slice(0, 160)}">
  <style>
    body { font-family: Georgia, serif; background: #0d0b14; color: #f5f3ff; margin: 0; padding: 2rem; }
    .container { max-width: 900px; margin: 0 auto; }
    h1 { color: #c9a84c; font-size: 3rem; }
    h2 { color: #c9a84c; border-bottom: 1px solid rgba(201,168,76,0.3); padding-bottom: 0.5rem; }
    .exp { margin: 1.5rem 0; padding: 1.5rem; background: rgba(255,255,255,0.04); border-radius: 12px; }
    .skill { display: flex; justify-content: space-between; margin: 0.5rem 0; }
    .bar { height: 6px; background: rgba(201,168,76,0.2); border-radius: 3px; overflow: hidden; }
    .fill { height: 100%; background: linear-gradient(90deg, #c9a84c, #7c6fcd); border-radius: 3px; }
    .contact a { color: #c9a84c; }
  </style>
</head>
<body>
  <div class="container">
    <h1>${profile.name}</h1>
    <p><strong>${profile.title}</strong> | ${profile.location}</p>
    <p>${profile.summary}</p>
    <h2>Experience</h2>
    ${experience.map((e) => `
      <div class="exp">
        <h3>${e.role} — ${e.company}</h3>
        <p>${e.duration} · ${e.type} · ${e.location}</p>
        <ul>${e.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
      </div>
    `).join('')}
    <h2>Skills</h2>
    ${skills.map((s) => `
      <div class="skill">
        <span>${s.name}</span>
        <span>${s.level}%</span>
      </div>
      <div class="bar"><div class="fill" style="width:${s.level}%"></div></div>
    `).join('')}
    <h2>Contact</h2>
    <div class="contact">
      <p>Email: <a href="mailto:${profile.email}">${profile.email}</a></p>
      <p>Phone: ${profile.phone.join(' | ')}</p>
      <p>LinkedIn: <a href="https://${profile.linkedin}" target="_blank">${profile.linkedin}</a></p>
    </div>
  </div>
</body>
</html>`;
}

export function exportAsPDF(): void {
  if (typeof window === 'undefined') return;
  window.print();
}

export function generateOGImage(): void {
  if (typeof window === 'undefined') return;
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 630;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.fillStyle = '#0d0b14';
  ctx.fillRect(0, 0, 1200, 630);
  ctx.fillStyle = '#c9a84c';
  ctx.font = 'bold 72px Georgia';
  ctx.fillText('Raj Kaushki', 80, 200);
  ctx.fillStyle = '#b8b4d0';
  ctx.font = '36px Georgia';
  ctx.fillText('Human Resources Manager', 80, 270);
  ctx.fillStyle = '#7a7490';
  ctx.font = '24px sans-serif';
  ctx.fillText('Building teams that build companies.', 80, 330);
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'og-image.png';
    a.click();
    URL.revokeObjectURL(url);
  });
}

export { type ExportConfig };
