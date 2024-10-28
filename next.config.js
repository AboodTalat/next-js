// // @ts-check
 
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   async headers() {
//     return [
//       {
//         source: '/manifest.json',
//         headers: [
//           { key: 'Cache-Control', value: 'no-store' },
//           { key: 'Content-Type', value: 'application/manifest+json' },
//         ],
//       },
//     ];
  
//   },}
 
// module.exports = nextConfig


const withPWA = require('next-pwa')({
  dest: 'public'
  // disable: process.env.NODE_ENV === 'development',
  // register: true,
  // scope: '/app',
  // sw: 'service-worker.js',
  //...
})

module.exports = withPWA({
  // next.js config
})