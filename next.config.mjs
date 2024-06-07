/** @type {import('next').NextConfig} */
const nextConfig = {
  // use search params need suspense boundary ignore
  experimental: { missingSuspenseWithCSRBailout: false },
  // chunk load in layout.ts error
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.output.chunkLoadTimeout = 60000; // Increase timeout to 60 seconds
    }
    return config;
  },
};
export default nextConfig;
