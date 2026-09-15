/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // The page was published at /deals before being renamed. Kept so any
      // link already shared still lands somewhere.
      { source: "/deals", destination: "/trades", permanent: true },
    ];
  },
};

export default nextConfig;
