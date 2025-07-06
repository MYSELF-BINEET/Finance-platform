// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "randomuser.me",
//       },
//     ],
//   },

//   experimental: {
//     serverActions: {
//       bodySizeLimit: "5mb",
//     },
//   },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },

  eslint: {
    ignoreDuringBuilds: true,  // <-- Ignore ESLint errors & warnings during build
  },
};

export default nextConfig;
