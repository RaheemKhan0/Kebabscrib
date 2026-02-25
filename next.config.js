// module.exports = {
//   experimental: {
//     //appDir: true,
//   },
//   images : {
//       remotePatterns: [new URL('https://res.cloudinary.com/dpqto9jrm/**')],
//   }
// };

/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    // appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dpqto9jrm/**",
      },
    ],
  },
};

module.exports = nextConfig;

