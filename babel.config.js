module.exports = {
  presets: [
    // Explicitly set modules to 'commonjs' for Babel 8 compatibility.
    // Babel 8 changed modules: 'auto' to default to ESM, which causes Jest's
    // --detectLeaks to fail because ES modules stay in the native module cache
    // between test suites, preventing garbage collection.
    ['@babel/preset-env', { targets: { node: process.versions.node.split('.')[0] }, modules: 'commonjs' }],
    '@babel/preset-typescript',
  ],
};
