// @ts-check
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    imageService: 'cloudflare',
  }),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
