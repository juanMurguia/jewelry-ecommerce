import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      "example.com",
      "placeholder.pics",
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      "res.cloudinary.com",
    ],
    dangerouslyAllowSVG: true, // Replace with your actual image domain
  },
};

export default nextConfig;
