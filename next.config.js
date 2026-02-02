/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.h2oingenierie.com',
      },
      {
        protocol: 'https',
        hostname: 'ogsimsfqwibcmotaeevb.supabase.co',
      },
    ],
  },
  output: 'standalone',
}

module.exports = nextConfig
