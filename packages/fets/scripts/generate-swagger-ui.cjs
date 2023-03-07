const fs = require('fs');
const path = require('path');
const { minify: minifyT } = require('html-minifier-terser');

async function minify(str) {
  return (
    await minifyT(str, {
      minifyJS: true,
      useShortDoctype: false,
      removeAttributeQuotes: true,
      collapseWhitespace: true,
      minifyCSS: true,
    })
  ).toString();
}

async function minifySwaggerUI() {
  const minified = await minify(
    fs.readFileSync(path.join(__dirname, '..', 'src', 'swagger-ui.html'), 'utf-8'),
  );

  fs.writeFileSync(
    path.join(__dirname, '../src/swagger-ui-html.ts'),
    `export default ${JSON.stringify(minified)}`,
  );
}

minifySwaggerUI().catch(err => {
  console.error(err);
  process.exit(1);
});
