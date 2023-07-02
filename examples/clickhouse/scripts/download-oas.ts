import { promises as fsPromises } from 'node:fs';
import { join } from 'node:path';
import { load as yamlLoad } from 'js-yaml';

async function main() {
  const res = await fetch('https://api.clickhouse.cloud/v1');
  const yamlData = await res.text();
  if (yamlData) {
    const jsonData = yamlLoad(yamlData);
    const jsonString = JSON.stringify(jsonData, null, 2);
    const exportedJsonString = `/* eslint-disable */ export default ${jsonString} as const;`;
    await fsPromises.writeFile(join(__dirname, '..', 'clickhouse-oas.ts'), exportedJsonString);
  } else {
    throw new Error('No data in yaml file');
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
