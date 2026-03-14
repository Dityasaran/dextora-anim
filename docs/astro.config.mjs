// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { resolve, dirname } from 'node:path';
import { copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/** Vite plugin that copies the workspace data-anim build to public/ */
function copyDataAnim() {
  const docsDir = dirname(fileURLToPath(import.meta.url));
  const src = resolve(docsDir, '..', 'dist', 'data-anim.js');
  const dest = resolve(docsDir, 'public', 'data-anim.js');
  return /** @type {import('vite').Plugin} */ ({
    name: 'copy-data-anim',
    buildStart() {
      copyFileSync(src, dest);
    },
  });
}

export default defineConfig({
  site: 'https://ryo-manba.github.io',
  base: '/data-anim',
  integrations: [
    mdx(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss(), copyDataAnim()],
  },
  markdown: {
    shikiConfig: {
      theme: 'dracula',
    },
  },
});
