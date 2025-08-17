/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/manga-scrapper-frontend' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/manga-scrapper-frontend' : ''
};

export default nextConfig;
