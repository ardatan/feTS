import { Output } from '@pulumi/pulumi';
import { OutputValue, Stack } from '@pulumi/pulumi/automation';

export type DeploymentConfiguration<TProgramOutput = any> = {
  name: string;
  prerequisites?: ((stack: Stack) => Promise<void>) | undefined;
  config?: ((stack: Stack) => Promise<void>) | undefined;
  program: () => Promise<{
    [K in keyof TProgramOutput]: Output<TProgramOutput[K]> | TProgramOutput[K];
  }>;
  test: (output: {
    [K in keyof TProgramOutput]: Pick<OutputValue, 'secret'> & {
      value: TProgramOutput[K];
    };
  }) => Promise<void>;
};
