import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';
import { loadEnv } from 'vite';

// eslint-disable-next-line no-undef
const { DATABASE_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), '');

import postgres from 'postgres';
const pg = postgres(DATABASE_URL, { ssl: true });

const redirects = await pg`SELECT slug, destination, status FROM redirects;`;

export default defineConfig({
  site: 'https://diced.sh',
  integrations: [react(), icon(), sitemap()],

  redirects: {
    ...redirects.reduce((acc, { slug, destination, status }) => {
      acc[`/go/${slug}`] = {
        status,
        destination,
      };
      return acc;
    }, {}),
  },

  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: 'JetBrains Mono',
        cssVariable: '--font-jetbrains-mono',
      },
    ],
  },

  output: 'server',

  adapter: vercel({
    imageService: true,
  }),

  vite: {
    plugins: [tailwindcss()],
  },
});
