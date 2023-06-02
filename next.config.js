/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    reactStrictMode: true,
    async redirects() {
        return [
          {
            source: '/',
            destination: '/register',
            permanent: false,
          },
        ];
      },
  };
   
  module.exports = nextConfig;