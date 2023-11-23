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

async function minifyLandingPage() {
  const minified = await minify(
    fs.readFileSync(path.join(__dirname, '..', 'src', 'landing-page.html'), 'utf-8'),
  );

  fs.writeFileSync(
    path.join(__dirname, '../src/landing-page.ts'),
    `export default ${JSON.stringify(minified)}`,
  );
}

minifyLandingPage().catch(err => {
  console.error(err);
  process.exit(1);
});
