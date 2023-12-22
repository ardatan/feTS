import { ReactElement } from 'react';
// eslint-disable-next-line camelcase
import { IBM_Plex_Sans } from 'next/font/google';
import { clsx } from 'clsx';
import { Anchor } from '@theguild/components';
import { Editor } from './editor';
import AWSLambda from 'public/assets/aws-lambda.svg';
import AzureFunctions from 'public/assets/azure-functions.svg';
import Bun from 'public/assets/bun.svg';
import CloudFlare from 'public/assets/cloudflare.svg';
import Deno from 'public/assets/deno.svg';
import Diagram from 'public/assets/diagram.svg';
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
  section: clsx('container px-8 py-16 lg:px-24 lg:py-32'),
};

export function IndexPage(): ReactElement {
  return (
    <>
      <div
        className={clsx(
          classes.font,
          'to-secondary-100 from-primary/10 dark:to-secondary-600 flex items-center bg-gradient-to-r py-14 lg:min-h-[calc(100vh-64px-68px)] lg:py-24',
        )}
      >
        <div className="container grid gap-20 max-lg:px-8 lg:grid-cols-2">
          <div className="text-secondary-600 flex flex-col justify-center lg:max-w-lg dark:text-white">
            <h1 className="text-[4rem] font-bold max-lg:text-4xl">feTS</h1>
            <h2 className="text-lg lg:text-2xl">Fetch API 💙 TypeScript</h2>
            <h3 className="my-8 text-base/7 lg:text-lg">
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
          <Editor />
        </div>
      </div>

      <section className={clsx(classes.font, 'dark:bg-dark text-secondary-600 bg-white')}>
        <div className={classes.section}>
          <div className="mb-20">
            <h2 className={classes.title}>New Approach to REST APIs</h2>
            <h3 className={classes.subtitle}>
              The feTS Client and Server can be seamlessly used together for a comprehensive,
              type-safe API experience. Alternatively, they can function independently, providing
              you with the flexibility to adapt to your project's specific needs.
            </h3>
          </div>
          <div className="my-24 flex gap-16 max-lg:flex-col">
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
              <div key={name} className="flex flex-col lg:w-1/3 lg:items-center">
                <Icon />
                <h2 className="mb-3 mt-5 text-2xl font-bold max-lg:text-xl lg:text-center dark:text-white">
                  {name}
                </h2>
                <p className="leading-relaxed lg:text-center lg:text-lg dark:text-white">
                  {description}
                </p>
              </div>
            ))}
          </div>
          <Diagram className="mx-auto max-w-[980px] [&_[fill=\#70788A]]:dark:fill-gray-100 [&_[fill=\#F3F4F6]]:dark:fill-gray-500" />
        </div>
      </section>

      <section
        className={clsx(
          classes.font,
          'from-secondary-100 to-primary/10 dark:from-secondary-600 bg-gradient-to-r dark:bg-gradient-to-l',
        )}
      >
        <div className={classes.section}>
          <h2 className={classes.title}>Deploy Anywhere</h2>
          <h3 className={clsx(classes.subtitle, 'lg:text-center')}>
            feTS Server provides a super fast HTTP server that can run anywhere with the power of{' '}
            <Anchor
              href="https://github.com/ardatan/whatwg-node/tree/master/packages/server"
              className="text-primary"
            >
              @whatwg-node/server
            </Anchor>
          </h3>
          <div className="mt-14 grid w-full gap-7 md:grid-cols-2 lg:mt-24 xl:grid-cols-3">
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
                name: 'µWebSockets',
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
                className="dark:hover:bg-secondary-400 dark:bg-secondary-500 group flex items-center gap-3 rounded bg-white px-7 py-5 text-xl/8 font-bold hover:shadow-xl lg:text-2xl/9 dark:hover:text-white"
                key={name}
              >
                <Icon
                  className={clsx('shrink-0', isInverted && 'dark:invert dark:[a:hover>&]:invert')}
                />
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
