import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        // 🌟 Aquí usamos el ID real de tu proyecto de Supabase
        hostname: "oorvfemdyggygqpxbwtq.supabase.co", 
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placeholder.supabase.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;