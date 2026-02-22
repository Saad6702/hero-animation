/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Only use the base path when deploying to GitHub Pages (production)
  basePath: isProd ? '/hero-animation' : '',
  assetPrefix: isProd ? '/hero-animation/' : '',
};

export default nextConfig;