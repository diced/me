import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import { defineConfig, fontProviders } from 'astro/config';
import postgres from 'postgres';
import { visualizer } from 'rollup-plugin-visualizer';
import { loadEnv } from 'vite';

// eslint-disable-next-line no-undef
const { DATABASE_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), '');

// gets redirects from the database
const pg = postgres(DATABASE_URL, { ssl: true });
const redirects = await pg`SELECT slug, destination, status FROM redirects;`;

export default defineConfig({
  site: 'https://diced.sh',
  integrations: [icon(), sitemap(), preact()],

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
    plugins: [
      tailwindcss(),
      visualizer({
        emitFile: true,
        filename: 'stats.html',
      }),
    ],
  },
});
