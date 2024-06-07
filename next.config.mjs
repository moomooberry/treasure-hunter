/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "picsum.photos",
      },
      {
        hostname: "etoywkdjfulyvaxezizg.supabase.co",
      },
    ],
  },
};

export default nextConfig;
