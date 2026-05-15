/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    experimental: { serverExternalPackages: ["firebase-admin"] },
    images: {
        remotePatterns: [{ hostname: "lh3.googleusercontent.com" }],
    },
};
export default nextConfig;