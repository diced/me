module.exports = {
  reactStrictMode: true,
  optimizeFonts: false,
  images: {
    domains: ['i.scdn.co'],
  },
  redirects: async () => {
    return [
      {
        source: '/github',
        destination: 'https://github.com/diced',
        permanent: true,
      },
    ];
  },
}