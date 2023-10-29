import { withGuildDocs } from '@theguild/components/next.config';

/** @type {import('next').NextConfig} */
export default withGuildDocs({
  output: 'export',
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});
