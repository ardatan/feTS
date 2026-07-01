module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: process.versions.node.split('.')[0] }, modules: 'commonjs' }],
    '@babel/preset-typescript',
  ],
};
