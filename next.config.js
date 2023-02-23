/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "firebasestorage.googleapis.com"
    ]
  },
  env: {
    NEXT_PUBLIC_RAZORPAY_API_KEY: process.env["NEXT_PUBLIC_RAZORPAY_API_KEY"],
    RAZORPAY_SECRET: process.env["RAZORPAY_SECRET"],
    SHIPROCKET_EMAIL: process.env["SHIPROCKET_EMAIL"],
    SHIPROCKET_PASSWORD: process.env["SHIPROCKET_PASSWORD"]
  }
}

module.exports = nextConfig
