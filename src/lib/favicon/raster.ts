/**
 * Favicon generation — the raster half.
 *
 * `sharp` is a native Node module, so nothing here may be imported by a page.
 * These functions are called from the `favicon-assets` integration in
 * `astro.config.mjs`, which runs in `astro:build:done`, always in Node.
 */
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { buildFaviconSvg } from './svg.ts';

/** Rasterise the favicon SVG to a square PNG buffer of the given pixel size. */
export async function renderFaviconPng(
  letter: string,
  bgColor: string,
  size: number,
  fgColor = '#ffffff'
): Promise<Buffer> {
  const svg = buildFaviconSvg(letter, bgColor, fgColor, size);
  return sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
}

/** Build a multi-size favicon.ico (16/32/48) from the outlined SVG. */
export async function renderFaviconIco(
  letter: string,
  bgColor: string,
  fgColor = '#ffffff'
): Promise<Buffer> {
  const pngs = await Promise.all(
    [16, 32, 48].map((s) => renderFaviconPng(letter, bgColor, s, fgColor))
  );
  return pngToIco(pngs);
}
