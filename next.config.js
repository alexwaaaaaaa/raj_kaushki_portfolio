/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  transpilePackages: [
    'three',
    '@react-three/fiber',
    '@react-three/drei',
    '@react-three/rapier',
    '@react-three/postprocessing',
    'maath',
  ],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader'],
    });
    config.module.rules.push({
      test: /\.m?js$/,
      resolve: { fullySpecified: false },
    });
    return config;
  },
  experimental: {
    esmExternals: 'loose',
  },
};

module.exports = nextConfig;
