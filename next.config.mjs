/*
Configures Next.js for the app.
*/

/** @type {import('next').NextConfig} */
const nextConfig = { 
  images: { 
    remotePatterns: [
      { hostname: "localhost" },
      { hostname: "www.google.com" }
    ] 
  } 
}

export default nextConfig
