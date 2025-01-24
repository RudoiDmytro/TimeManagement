/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/i',
            permanent: true,
          },
        ]
      },
    
};

export default nextConfig;
