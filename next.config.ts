import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: ['@prisma/client', '@neondatabase/serverless'],
  experimental: {},
}

export default nextConfig
