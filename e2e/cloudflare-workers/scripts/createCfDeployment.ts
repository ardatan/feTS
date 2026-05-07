import { join } from 'path';
import {
  assertDeployedEndpoint,
  DeploymentConfiguration,
  env,
  execPromise,
  fsPromises,
} from '@e2e/shared-scripts';
import * as cf from '@pulumi/cloudflare';
import { version } from '@pulumi/cloudflare/package.json';
import * as pulumi from '@pulumi/pulumi';
import { Stack } from '@pulumi/pulumi/automation';

export function createCfDeployment(
  projectName: string,
  isModule = false,
): DeploymentConfiguration<{
  workerUrl: string;
}> {
  return {
    name: projectName,
    prerequisites: async (stack: Stack) => {
      console.info('\t\tℹ️ Installing Pulumi CF plugin...');
      // Intall Pulumi CF Plugin
      await stack.workspace.installPlugin('cloudflare', version, 'resource');

      // Build and bundle the worker
      console.info('\t\tℹ️ Bundling the CF Worker....');
      await execPromise('npm run build', {
        cwd: join(__dirname, '..', '..', projectName),
      });
    },
    config: async (stack: Stack) => {
      // Configure the Pulumi environment with the CloudFlare credentials
      // This will allow Pulummi program to just run without caring about secrets/configs.
      // See: https://www.pulumi.com/registry/packages/cloudflare/installation-configuration/
      await stack.setConfig('cloudflare:apiToken', {
        value: env('CLOUDFLARE_API_TOKEN'),
      });
    },
    program: async () => {
      const stackName = pulumi.getStack();
      const workerUrl = `e2e.graphql.yoga/${stackName}`;

      // Deploy CF script as WorkersScript (accountId is a per-resource arg in v6)
      const workerScript = new cf.WorkersScript('worker', {
        accountId: env('CLOUDFLARE_ACCOUNT_ID'),
        content: await fsPromises.readFile(
          join(__dirname, '..', '..', projectName, 'dist', 'index.js'),
          'utf-8',
        ),
        bodyPart: isModule ? undefined : 'index.js',
        bindings: [
          {
            name: 'WORKER_PATH',
            type: 'plain_text',
            text: `/${stackName}`,
          },
        ],
        mainModule: isModule ? 'index.js' : undefined,
        scriptName: stackName,
      });

      // Create a nice route for easy testing
      new cf.WorkersRoute('worker-route', {
        script: workerScript.scriptName,
        pattern: workerUrl + '*',
        zoneId: env('CLOUDFLARE_ZONE_ID'),
      });

      return {
        workerUrl: `https://${workerUrl}`,
      };
    },
    test: async ({ workerUrl }) => {
      console.log(`ℹ️ CloudFlare Worker deployed to URL: ${workerUrl.value}`);
      await assertDeployedEndpoint(workerUrl.value);
    },
  };
}
