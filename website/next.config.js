import { createRequire } from 'node:module';
import path from 'node:path';
import { withGuildDocs } from '@theguild/components/next.config';

const require = createRequire(import.meta.url);
const guildComponentsPath = path.dirname(require.resolve('@theguild/components/package.json'));
const nextraClientPath = path.join(
  guildComponentsPath,
  'node_modules',
  'nextra',
  'dist',
  'client',
);

/** @type {import('next').NextConfig} */
export default withGuildDocs({
  output: 'export',
  pageExtensions: ['tsx', 'mdx'],
  webpack(config) {
    config.resolve.alias['nextra/components'] = path.join(nextraClientPath, 'components', 'index.js');
    config.resolve.alias['nextra/setup-page'] = path.join(nextraClientPath, 'setup-page.js');
    config.resolve.alias['next-mdx-import-source-file'] = path.join(
      process.cwd(),
      'mdx-components.tsx',
    );
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
