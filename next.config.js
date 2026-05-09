/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    experimental: { serverExternalPackages: ["pg"] },
    images: {
        remotePatterns: [{ hostname: "lh3.googleusercontent.com" }],
    },
};
export default nextConfig;