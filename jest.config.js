const { resolve, join } = require('path');
const { pathsToModuleNameMapper } = require('ts-jest');
const fs = require('fs');
const CI = !!process.env.CI;

const ROOT_DIR = __dirname;
const TSCONFIG = resolve(ROOT_DIR, 'tsconfig.json');
const tsconfig = require(TSCONFIG);
const ESM_PACKAGES = [];

const bobPath = require.resolve('bob-the-bundler/package.json').replace('package.json', '');
const jestResolverPath = join(bobPath, 'jest-resolver.js');

const jestResolverContent = fs.readFileSync(jestResolverPath, 'utf-8');

fs.writeFileSync(join(bobPath, 'jest-resolver.cjs'), jestResolverContent);

module.exports = {
  testEnvironment: 'node',
  rootDir: ROOT_DIR,
  restoreMocks: true,
  reporters: ['default'],
  modulePathIgnorePatterns: ['dist', 'test-assets', 'test-files', 'fixtures', 'bun', '.bob'],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: `${ROOT_DIR}/`,
  }),
  transformIgnorePatterns: [`node_modules/(?!(${ESM_PACKAGES.join('|')})/)`],
  transform: {
    '^.+\\.mjs?$': 'babel-jest',
    '^.+\\.ts?$': 'babel-jest',
    '^.+\\.js$': 'babel-jest',
  },
  collectCoverage: false,
  cacheDirectory: resolve(ROOT_DIR, `${CI ? '' : 'node_modules/'}.cache/jest`),
  resolver: 'bob-the-bundler/jest-resolver.cjs',
};
