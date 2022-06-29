/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/blog',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
