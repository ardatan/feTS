const { build } = require('esbuild');
const { writeFileSync } = require('fs');
const { join } = require('path');

const projectRoot = join(__dirname, '..');

async function main() {
  await build({
    entryPoints: [join(projectRoot, './src/index.ts')],
    outfile: join(projectRoot, 'dist/fets/index.js'),
    format: 'cjs',
    minify: false,
    bundle: true,
    platform: 'node',
    target: 'node14',
  });

  writeFileSync(
    join(projectRoot, './dist/package.json'),
    JSON.stringify({
      name: 'fets-test-function',
      version: '0.0.1',
    }),
  );

  writeFileSync(
    join(projectRoot, './dist/host.json'),
    JSON.stringify({
      version: '2.0',
      logging: {
        applicationInsights: {
          samplingSettings: {
            isEnabled: true,
            excludedTypes: 'Request',
          },
        },
      },
      extensionBundle: {
        id: 'Microsoft.Azure.Functions.ExtensionBundle',
        version: '[2.*, 3.0.0)',
      },
    }),
  );

  writeFileSync(
    join(projectRoot, './dist/fets/function.json'),
    JSON.stringify({
      bindings: [
        {
          authLevel: 'anonymous',
          type: 'httpTrigger',
          direction: 'in',
          name: 'req',
          methods: ['get', 'post'],
          route: '{*segments}',
        },
        {
          type: 'http',
          direction: 'out',
          name: 'res',
        },
      ],
    }),
  );

  console.info(`Azure Function build done!`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
