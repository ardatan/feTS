import { ReactElement } from 'react';
import { clsx } from 'clsx';
// eslint-disable-next-line camelcase
import { IBM_Plex_Sans } from '@next/font/google';
import { Anchor, Image } from '@theguild/components';
import AWSLambda from 'public/assets/aws-lambda.svg';
import AzureFunctions from 'public/assets/azure-functions.svg';
import Bun from 'public/assets/bun.svg';
import CloudFlare from 'public/assets/cloudflare.svg';
import Deno from 'public/assets/deno.svg';
import Diagram from 'public/assets/diagram.svg';
import fetsTextLogo from 'public/assets/fets-text-logo.png';
import GitHubLogo from 'public/assets/github.svg';
import GoogleCloudFunctions from 'public/assets/google-cloud-functions.svg';
import JsonSchema from 'public/assets/json-schema.svg';
import NextJs from 'public/assets/nextjs.svg';
import NodeJs from 'public/assets/nodejs.svg';
import OpenAPI from 'public/assets/openapi.svg';
import TypeScript from 'public/assets/typescript.svg';
import WebSockets from 'public/assets/websockets.svg';

const IBMPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const classes = {
  font: IBMPlexSans.className,
  btn: clsx(
    'transition-colors max-lg:px-4 py-3 px-6 bg-secondary-500 dark:bg-secondary-100 text-white dark:text-secondary-600 rounded-md font-bold hover:!bg-secondary-300 hover:!text-white',
  ),
  title: clsx('lg:text-[48px] max-lg:text-3xl font-bold mb-4 dark:text-white lg:text-center'),
  subtitle: clsx(
    'lg:text-lg xl:w-2/4 lg:w-3/4 mx-auto text-secondary-500 dark:text-white lg:[text-wrap:balance] lg:text-center',
  ),
};

export function IndexPage(): ReactElement {
  return (
    <>
      <div
        className={clsx(
          classes.font,
          'to-secondary-100 flex items-center bg-gradient-to-b from-[#1886ff]/20 py-14 dark:to-[#1c212c] lg:min-h-[calc(100vh-64px-68px)] lg:py-24',
        )}
      >
        <div className="container flex items-stretch max-lg:flex-col">
          <div className="text-secondary-600 flex-1 dark:text-white max-lg:pb-20 lg:pr-24">
            <h1 className="text-[4rem] font-bold max-lg:text-4xl">feTS</h1>
            <h2 className="text-2xl max-lg:text-lg">Fetch API 💙 TypeScript</h2>
            <h3 className="my-8 text-2xl max-lg:text-lg">
              Build and consume <b>REST APIs</b> with ease. No more compromises on type safety in
              client-server communication. All thanks to <b>TypeScript</b> and <b>OpenAPI</b>.
            </h3>
            <div className="flex gap-x-5">
              <Anchor href="/client/quick-start" className={clsx(classes.btn)}>
                Client
              </Anchor>
              <Anchor href="/server/quick-start" className={clsx(classes.btn)}>
                Server
              </Anchor>
              <Anchor
                href="https://github.com/ardatan/fets"
                className={clsx(classes.btn, 'inline-flex items-center gap-x-2')}
              >
                <GitHubLogo />
                GitHub
              </Anchor>
            </div>
          </div>
          <div className="bg-secondary-500 h-[350px] rounded-md p-5 drop-shadow-[40px_40px_50px_rgba(24,134,255,.8)] dark:drop-shadow-[40px_40px_50px_rgba(24,134,255,.3)] lg:flex-1">
            <Image src={fetsTextLogo} alt="feTS logo" className="mx-auto h-full w-auto" />
          </div>
        </div>
      </div>

      <section className={clsx(classes.font, 'dark:bg-dark text-secondary-600 bg-white')}>
        <div className="container mx-auto py-24">
          <div className="mb-20">
            <h2 className={classes.title}>New Approach to REST APIs</h2>
            <h3 className={classes.subtitle}>
              The feTS Client and Server can be seamlessly used together for a comprehensive,
              type-safe API experience. Alternatively, they can function independently, providing
              you with the flexibility to adapt to your project's specific needs.
            </h3>
          </div>
          <div className="my-24 flex gap-4 max-lg:flex-wrap">
            {[
              {
                name: 'Harness the Power of OpenAPI',
                description:
                  'feTS leverages the OpenAPI specification for universal tool compatibility. Plus, enjoy the convenience of an out-of-the-box Swagger UI with our server.',
                icon: OpenAPI,
              },
              {
                name: 'JSON Schema Route Description',
                description:
                  'feTS utilizes the JSON Schema specification for route description, enabling integration with any tool within the JSON Schema ecosystem.',
                icon: JsonSchema,
              },
              {
                name: 'No Code Generation needed',
                description:
                  'Experience full type-safety with the feTS Client. It infers types from the OpenAPI spec and JSON Schema, eliminating the need for code generation.',
                icon: TypeScript,
              },
            ].map(({ name, description, icon: Icon }) => (
              <div key={name} className="flex flex-col md:w-1/3 lg:items-center">
                <Icon />
                <h2 className="mb-3 mt-5 text-2xl font-bold dark:text-white max-lg:text-xl">
                  {name}
                </h2>
                <p className="leading-relaxed dark:text-white lg:text-center lg:text-lg">
                  {description}
                </p>
              </div>
            ))}
          </div>
          <Diagram className="mx-auto max-w-[980px]" />
        </div>
      </section>

      <section className={clsx(classes.font, 'bg-secondary-100 dark:bg-secondary-600')}>
        <div className="container flex flex-col py-14 lg:items-center lg:py-40">
          <h2 className={classes.title}>Deploy Anywhere</h2>
          <h2 className={clsx(classes.subtitle, 'max-w-[500px] lg:text-center')}>
            feTS Server provides a super fast HTTP server that can run anywhere with the power of{' '}
            <Anchor
              href="https://github.com/ardatan/whatwg-node/tree/master/packages/server"
              className="text-primary"
            >
              @whatwg-node/server
            </Anchor>
          </h2>
          <div className="mt-14 grid w-full gap-7 lg:mt-24 lg:grid-cols-3">
            {[
              { name: 'AWS Lambda', icon: AWSLambda, link: '/server/integrations/aws-lambda' },
              {
                name: 'Azure Functions',
                icon: AzureFunctions,
                link: '/server/integrations/azure-functions',
              },
              { name: 'Bun', icon: Bun, link: '/server/integrations/bun' },
              {
                name: 'Cloudflare Workers',
                icon: CloudFlare,
                link: '/server/integrations/cloudflare-workers',
              },
              { name: 'Deno', icon: Deno, link: '/server/integrations/deno' },
              {
                name: 'Google Cloud Functions',
                icon: GoogleCloudFunctions,
                link: '/server/integrations/gcp',
              },
              {
                name: 'WebSockets',
                icon: WebSockets,
                link: '/server/integrations/uwebsockets',
                isInverted: true,
              },
              {
                name: 'Next.js',
                icon: NextJs,
                link: '/server/integrations/nextjs',
                isInverted: true,
              },
              { name: 'Node.js', icon: NodeJs, link: '/server/integrations/node-http' },
            ].map(({ name, icon: Icon, link, isInverted }) => (
              <Anchor
                href={link}
                className="hover:!bg-secondary-400 dark:bg-secondary-500 group flex items-center gap-3 rounded bg-white px-7 py-5 font-bold hover:text-white"
                key={name}
              >
                <Icon className={clsx(isInverted && 'dark:invert [a:hover>&]:invert')} />
                {name}
                <span className="font-sans font-light transition-transform duration-75 group-hover:translate-x-[2px]">
                  →
                </span>
              </Anchor>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
