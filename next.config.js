/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.scdn.co"],
  },
  redirects: async () => [
    {
      destination: "https://github.com/diced",
      permanent: true,
      source: "/github",
    },
  ],
};

module.exports = nextConfig;
