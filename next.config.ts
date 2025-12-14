import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enables the new React Compiler for better performance
  reactCompiler: true,

  // Security Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY', // Prevents site from being embedded in iframes
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // Prevents MIME type sniffing
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()', // Blocks access to sensitive features
          },
        ],
      },
    ];
  },
};

export default nextConfig;