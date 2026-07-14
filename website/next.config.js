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
  // typescript@7 has no JS compiler API; Next's build-time typecheck still needs it.
  // typescript-eslint uses the postinstall API shim. Skip Next typechecking for now.
  typescript: {
    ignoreBuildErrors: true,
  },
});
