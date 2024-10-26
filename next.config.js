// @ts-check
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/manifest.json',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
          { key: 'Content-Type', value: 'application/manifest+json' },
        ],
      },
    ];
  
  },}
 
module.exports = nextConfig