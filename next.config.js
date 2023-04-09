/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ireland.apollo.olxcdn.com",
      },
      {
        protocol: "https",
        hostname: "www.proto.pl",
      },
    ],
  },
};

module.exports = nextConfig;
