import { defineConfig, fontProviders } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import icon from "astro-icon";
import vercel from "@astrojs/vercel";
import { loadEnv } from "vite";

const { DATABASE_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

import postgres from "postgres";
const pg = postgres(DATABASE_URL, { ssl: true });

const redirects = await pg`SELECT slug, destination, status FROM redirects;`;

export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    icon({
      iconDir: "src/icons",
    }),
  ],
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
        name: "JetBrains Mono",
        cssVariable: "--font-jetbrains-mono",
      },
    ],
  },
  output: "server",
  adapter: vercel({
    imageService: true,
  }),
});
