/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // Игнорируем ESLint ошибки
  },
  output: "standalone", // Для Vercel
};

module.exports = nextConfig;