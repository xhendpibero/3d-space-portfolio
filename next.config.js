/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: false,
    domains: [],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig


