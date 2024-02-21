/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    domains: ["res.cloudinary.com"],
  },

  env: {
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_PRESET: process.env.CLOUD_PRESET,
  },
};

export default nextConfig;
