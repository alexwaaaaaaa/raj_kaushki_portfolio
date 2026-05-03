import type { FontPairing } from '@/types';

export const FONT_PAIRINGS: FontPairing[] = [
  {
    id: 'playfair-dm-sans',
    name: 'Playfair + DM Sans',
    display: 'Playfair Display',
    body: 'DM Sans',
    displayUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap',
    bodyUrl: 'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap',
  },
  {
    id: 'cormorant-outfit',
    name: 'Cormorant + Outfit',
    display: 'Cormorant Garamond',
    body: 'Outfit',
    displayUrl: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap',
    bodyUrl: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap',
  },
  {
    id: 'cinzel-nunito',
    name: 'Cinzel + Nunito',
    display: 'Cinzel',
    body: 'Nunito',
    displayUrl: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&display=swap',
    bodyUrl: 'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600&display=swap',
  },
  {
    id: 'libre-baskerville-inter',
    name: 'Libre Baskerville + Inter',
    display: 'Libre Baskerville',
    body: 'Inter',
    displayUrl: 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap',
    bodyUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap',
  },
  {
    id: 'eb-garamond-jakarta',
    name: 'EB Garamond + Plus Jakarta',
    display: 'EB Garamond',
    body: 'Plus Jakarta Sans',
    displayUrl: 'https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&display=swap',
    bodyUrl: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap',
  },
  {
    id: 'space-grotesk-mono',
    name: 'Space Grotesk + Mono',
    display: 'Space Grotesk',
    body: 'Space Mono',
    displayUrl: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap',
    bodyUrl: 'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap',
  },
  {
    id: 'syne-mono',
    name: 'Syne + Syne Mono',
    display: 'Syne',
    body: 'Syne Mono',
    displayUrl: 'https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap',
    bodyUrl: 'https://fonts.googleapis.com/css2?family=Syne+Mono&display=swap',
  },
  {
    id: 'fraunces-epilogue',
    name: 'Fraunces + Epilogue',
    display: 'Fraunces',
    body: 'Epilogue',
    displayUrl: 'https://fonts.googleapis.com/css2?family=Fraunces:wght@400;500;600;700&display=swap',
    bodyUrl: 'https://fonts.googleapis.com/css2?family=Epilogue:wght@300;400;500;600&display=swap',
  },
];

let loadedFonts: Set<string> = new Set();

export function loadGoogleFont(url: string): void {
  if (typeof document === 'undefined') return;
  if (loadedFonts.has(url)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
  loadedFonts.add(url);
}

export function applyFontPairing(pairing: FontPairing): void {
  loadGoogleFont(pairing.displayUrl);
  loadGoogleFont(pairing.bodyUrl);
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--font-display', `'${pairing.display}', Georgia, serif`);
    document.documentElement.style.setProperty('--font-body', `'${pairing.body}', system-ui, sans-serif`);
  }
}

export function loadCustomFont(fontName: string): void {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:wght@300;400;500;600;700&display=swap`;
  loadGoogleFont(url);
}

export function getPairingById(id: string): FontPairing | undefined {
  return FONT_PAIRINGS.find((p) => p.id === id);
}
