/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/dilekceler",
        destination: "/sss",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
