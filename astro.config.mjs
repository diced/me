import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import { defineConfig, fontProviders } from 'astro/config';
import postgres from 'postgres';
import { visualizer } from 'rollup-plugin-visualizer';
import { loadEnv } from 'vite';

import cloudflare from '@astrojs/cloudflare';

// eslint-disable-next-line no-undef
const { DATABASE_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), '');

// gets redirects from the database
const pg = postgres(DATABASE_URL, { ssl: true });
const redirects = await pg`SELECT slug, destination, status FROM redirects;`;

export default defineConfig({
  site: 'https://diced.sh',
  integrations: [icon({ iconDir: 'src/icons' }), sitemap(), preact()],

  redirects: {
    ...redirects.reduce((acc, { slug, destination, status }) => {
      acc[`/go/${slug}`] = {
        status,
        destination,
      };
      return acc;
    }, {}),
  },

  fonts: [
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
    },
  ],

  vite: {
    plugins: [
      tailwindcss(),

      // eslint-disable-next-line no-undef
      ...(process.env.ANALYZE === 'true'
        ? [
            visualizer({
              filename: 'stats.html',
              open: true,
              gzipSize: true,
              brotliSize: true,
            }),
          ]
        : []),
    ],
  },

  adapter: cloudflare(),
});

