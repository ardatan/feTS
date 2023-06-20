import { withGuildDocs } from '@theguild/components/next.config';

export default withGuildDocs({
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
});
