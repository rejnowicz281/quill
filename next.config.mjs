/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com"
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com"
            },
            {
                protocol: "https",
                hostname: "ik.imagekit.io"
            }
        ]
    }
};

export default nextConfig;
