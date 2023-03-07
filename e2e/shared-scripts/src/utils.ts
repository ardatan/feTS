import { exec } from 'child_process';
import { promises as fsPromises } from 'fs';
import { promisify } from 'util';

export { fsPromises };
export const execPromise = promisify(exec);

export async function getCommitId() {
  const { stdout } = await execPromise('git rev-parse HEAD');
  return (process.env.COMMIT_ID || stdout).toString().trim();
}

export async function waitForEndpoint(
  endpoint: string,
  retries: number,
  timeout = 10000,
): Promise<boolean> {
  let lastResponseText: string | undefined;
  for (let attempt = 1; attempt <= retries; attempt++) {
    console.info(`\tℹ️ Trying to connect to ${endpoint} (attempt ${attempt}/${retries})...`);
    try {
      const r = await fetch(endpoint, {
        method: 'GET',
        headers: {
          accept: 'text/html',
        },
      });

      lastResponseText = await r.text();

      if (!r.ok) {
        throw new Error(`⚠️ Endpoint not ready yet, status code is ${r.status} ${r.statusText}`);
      }

      if (lastResponseText.includes('Vercel')) {
        throw new Error(`⚠️ Endpoint not ready yet, response text includes "Vercel"`);
      }

      if (lastResponseText.includes('Azure')) {
        throw new Error(`⚠️ Endpoint not ready yet, response text includes "Azure"`);
      }

      console.log(`\t✅ Endpoint is ready!`);
      return true;
    } catch (e: any) {
      console.warn(
        `ℹ️ Failed to connect to endpoint: ${endpoint}, waiting ${timeout}ms...`,
        e.message,
      );

      await new Promise(resolve => setTimeout(resolve, timeout));
    }
  }

  throw new Error(
    `⚠️ Failed to connect to endpoint: ${endpoint} (attempts: ${retries}) and last response was: ${lastResponseText}`,
  );
}

export function env(name: string): string {
  const envVar = process.env[name];
  if (!envVar) {
    throw new Error(`⚠️ Environment variable ${name} not set`);
  }

  return envVar;
}

export async function assertIndex(endpoint: string) {
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      accept: 'text/html',
    },
  });

  const html = await response.text();

  console.log(`ℹ️ Received for ${endpoint}: ${html}`);

  const contentType = response.headers.get('Content-Type');
  if (contentType == null || !contentType.startsWith('text/html')) {
    throw new Error(`⚠️ Expected 'text/html', but received ${contentType} for ${response.url}`);
  }

  if (!html.includes('Platform Agnostic Server')) {
    throw new Error(`⚠️ Failed to locate HTML; ${html}`);
  }

  console.log(`\t✅ Index page is available`);
}

export async function assertGreetings(endpoint: string) {
  const response = await fetch(endpoint + '/greetings/pulumi', {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  });

  const text = await response.text();

  console.log(`ℹ️ Received for ${endpoint + '/greetings/pulumi'}: ${text}`);

  const contentType = response.headers.get('Content-Type');
  if (contentType == null || !contentType.startsWith('application/json')) {
    throw new Error(
      `⚠️ Expected 'application/json', but received ${contentType} for ${response.url}`,
    );
  }

  let json: any;
  try {
    json = JSON.parse(text);
  } catch (e) {
    throw new Error(`⚠️ Failed to parse JSON; ${text}`);
  }

  if (json.message !== 'Hello pulumi!') {
    throw new Error(`⚠️ Unexpected message for greetings; ${text}`);
  }

  console.log(`\t✅ '/greetings/:name' is available`);
}

export async function assertBye(endpoint: string) {
  const response = await fetch(endpoint + '/bye', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'pulumi',
    }),
  });

  const text = await response.text();

  console.log(`ℹ️ Received for ${endpoint + '/bye'}: ${text}`);

  const contentType = response.headers.get('Content-Type');
  if (contentType == null || !contentType.startsWith('application/json')) {
    throw new Error(
      `⚠️ Expected 'application/json', but received ${contentType} for ${response.url}`,
    );
  }

  let json: any;
  try {
    json = JSON.parse(text);
  } catch (e) {
    throw new Error(`⚠️ Failed to parse JSON; ${text}`);
  }

  if (json.message !== 'Bye pulumi!') {
    throw new Error(`⚠️ Unexpected message for bye; ${text}`);
  }

  console.log(`\t✅ '/bye' endpoint is available`);
}

export async function assertDeployedEndpoint(url: string) {
  await waitForEndpoint(url, 5, 10000);
  const results = await Promise.allSettled([
    assertIndex(url),
    assertGreetings(url),
    assertBye(url),
  ]);
  let failed = false;
  results.forEach(result => {
    if (result.status === 'rejected') {
      failed = true;
      console.error(result.reason);
    }
  });
  if (failed) {
    throw new Error('⚠️ Some tests failed');
  }
}
