/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  compiler: {
    emotion: true,
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/surveys',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
