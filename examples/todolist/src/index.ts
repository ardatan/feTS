import { promises as fsPromises } from 'node:fs';
import { join } from 'node:path';
import { app } from './app';
import { router } from './router';

app.listen(3000, () => {
  console.log('SwaggerUI is served at http://localhost:3000/docs');
});

const savedOpenAPIFilePath = join(__dirname, 'saved_openapi.ts');

// Write the OpenAPI spec to a file
fsPromises
  .writeFile(
    savedOpenAPIFilePath,
    `/* eslint-disable */
export default ${JSON.stringify(router.openAPIDocument)} as const;`,
  )
  .then(() => console.log(`OpenAPI schema is written to ${savedOpenAPIFilePath}`))
  .catch(err => {
    console.error(`Could not write OpenAPI schema to file: ${err.message}`);
    process.exit(1);
  });
