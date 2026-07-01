/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.SITE_URL || 'https://fets.dev',
  generateIndexSitemap: false,
  exclude: ['*/_meta'],
  output: 'export',
};
