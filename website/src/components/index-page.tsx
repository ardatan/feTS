import { ReactElement, ReactNode } from 'react';
import clsx from 'clsx';
import { BsFillPlayFill } from 'react-icons/bs';
import { FiGithub } from 'react-icons/fi';
import { SiJson, SiOpenapiinitiative, SiTypescript } from 'react-icons/si';
import { Anchor, Image } from '@theguild/components';
import ecosystemImage from 'public/assets/ecosystem.svg';
import GitHubLogo from 'public/assets/github.svg';

const classes = {
  button: clsx(
    'inline-block bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 text-gray-600 px-6 py-3 rounded-lg font-medium shadow-sm',
  ),
  link: clsx('text-primary-500'),
  btn: clsx(
    'transition-colors py-3 px-6 bg-gray-500 dark:bg-gray-100 text-white dark:text-gray-600 rounded-md font-bold hover:!bg-gray-300 hover:!text-white',
  ),
};

const gradients: [string, string][] = [
  ['#8b5cf6', '#6d28d9'], // violet
  ['#06b6d4', '#0e7490'], // cyan
  ['#f59e0b', '#d97706'], // amber
  ['#ec4899', '#db2777'], // pink
];

function pickGradient(i: number) {
  const gradient = gradients[i % gradients.length];
  if (!gradient) {
    throw new Error('No gradient found');
  }
  return gradient;
}

export function IndexPage(): ReactElement {
  return (
    <>
      {/*<section className="text-gray-600 body-font">*/}
      {/*  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">*/}
      {/*    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">*/}
      {/*      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">*/}
      {/*        Before they sold out*/}
      {/*        <br className="hidden lg:inline-block" />*/}
      {/*        readymade gluten*/}
      {/*      </h1>*/}
      {/*      <p className="mb-8 leading-relaxed">*/}
      {/*        Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed*/}
      {/*        tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken*/}
      {/*        authentic tumeric truffaut hexagon try-hard chambray.*/}
      {/*      </p>*/}
      {/*      <div className="flex justify-center">*/}
      {/*        <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">*/}
      {/*          Button*/}
      {/*        </button>*/}
      {/*        <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">*/}
      {/*          Button*/}
      {/*        </button>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">*/}
      {/*      <img*/}
      {/*        className="object-cover object-center rounded"*/}
      {/*        alt="hero"*/}
      {/*        src="https://dummyimage.com/720x600"*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}

      <div className="min-h-[calc(100vh-64px-68px)] bg-gradient-to-b from-[#1886ff]/20 dark:to-[#1c212c] flex items-center py-24">
        <div className="flex container items-stretch max-lg:flex-col">
          <div className="flex-1 pr-24 max-lg:pb-24 text-gray-600 dark:text-white">
            <h1 className="text-[4rem] font-bold">feTS</h1>
            <h2 className="text-2xl">Fetch API 💙 TypeScript</h2>
            <h3 className="text-2xl my-8">
              Build and consume <b>REST APIs</b> with ease. No more compromises on type safety in
              client-server communication. All thanks to <b>TypeScript</b> and <b>OpenAPI</b>.
            </h3>
            <div className="flex gap-x-5">
              <button className={clsx(classes.btn)}>Client</button>
              <button className={clsx(classes.btn)}>Server</button>
              <button className={clsx(classes.btn, 'inline-flex items-center gap-x-2')}>
                <GitHubLogo />
                GitHub
              </button>
            </div>
          </div>
          <div className="lg:flex-1 h-[350px] rounded-md bg-gray-500 drop-shadow-[40px_40px_50px_rgba(24,134,255,.8)] dark:drop-shadow-[40px_40px_50px_rgba(24,134,255,.3)]"/>
        </div>
      </div>

      <FeatureWrapper>
        <div className="container py-20 sm:py-24 lg:py-32">
          <h1 className="max-w-screen-md mx-auto font-extrabold text-5xl sm:text-5xl lg:text-6xl text-center bg-gradient-to-r from-orange-700 to-blue-400 dark:from-orange-700 dark:to-blue-400 bg-clip-text text-transparent !leading-tight">
            feTS
          </h1>
          <p className="max-w-screen-sm mx-auto mt-1 text-xl text-gray-600 text-center dark:text-gray-400">
            Fetch API ❤️ TypeScript
          </p>
          <p className="max-w-screen-sm mx-auto mt-3 text-2xl text-gray-600 text-center dark:text-gray-400">
            Build and consume <b>REST APIs</b> with ease. No more compromises on type safety in
            client-server communication. All thanks to <b>TypeScript</b> and <b>OpenAPI</b>.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Anchor className={classes.button} href="/client/quick-start">
              Client
            </Anchor>
            <Anchor className={classes.button} href="/server/quick-start">
              Server
            </Anchor>
            <Anchor
              className={clsx(classes.button, 'flex flex-row gap-2 items-center')}
              href="https://github.com/ardatan/fets"
            >
              <FiGithub /> GitHub
            </Anchor>
          </div>
        </div>
      </FeatureWrapper>

      <Feature
        gradient={1}
        image={ecosystemImage}
        title="New Approach to REST APIs"
        description={
          <div className="flex flex-col gap-y-12">
            The feTS Client and Server can be seamlessly used together for a comprehensive,
            type-safe API experience. Alternatively, they can function independently, providing you
            with the flexibility to adapt to your project's specific needs.
            <div className="flex flex-col gap-y-12">
              <FeatureHighlights
                textColor={gradients[1][0]}
                highlights={[
                  {
                    icon: <SiOpenapiinitiative size={36} />,
                    title: 'Harness the Power of OpenAPI',
                    description: (
                      <>
                        feTS leverages the OpenAPI specification for universal tool compatibility.
                        Plus, enjoy the convenience of an out-of-the-box Swagger UI with our server.
                      </>
                    ),
                  },
                  {
                    icon: <SiJson size={36} />,
                    title: 'Route Description with JSON Schema',
                    description: (
                      <>
                        feTS utilizes the JSON Schema specification for route description, enabling
                        integration with any tool within the JSON Schema ecosystem.
                      </>
                    ),
                  },
                  {
                    icon: <SiTypescript size={36} />,
                    title: 'No Code Generation for Type-Safety',
                    description: (
                      <>
                        Experience full type-safety with the feTS Client. It infers types from the
                        OpenAPI spec and JSON Schema, eliminating the need for code generation.
                      </>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        }
      />

      <Feature
        title="Deploy Anywhere"
        description={
          <p>
            The feTS Server, backed by the power of{' '}
            <Anchor href="https://github.com/ardatan/whatwg-node/tree/master/packages/server#whatwg-node-generic-server-adapter">
              <b>@whatwg-node/server</b>
            </Anchor>
            , provides a high-speed HTTP service that can be efficiently deployed anywhere you need.
          </p>
        }
        gradient={2}
      >
        <div
          className="flex justify-center max-w-screen-lg p-12 mx-auto rounded-3xl"
          style={{
            backgroundImage: `linear-gradient(70deg, ${pickGradient(2)[0]}, ${pickGradient(2)[1]})`,
          }}
        >
          <div className="flex flex-wrap">
            {[
              {
                name: 'AWS Lambda',
                href: '/server/integrations/aws-lambda',
              },
              {
                name: 'Azure Functions',
                href: '/server/integrations/azure-functions',
              },
              { name: 'Bun', href: '/server/integrations/bun' },
              {
                name: 'Cloudflare Workers',
                href: '/server/integrations/cloudflare-workers',
              },
              {
                name: 'Deno',
                href: '/server/integrations/deno',
              },
              {
                name: 'Google Cloud Functions',
                href: '/server/integrations/gcp',
              },
              {
                name: 'µWebSockets',
                href: '/server/integrations/uwebsockets',
              },
              {
                name: 'Next.js',
                href: '/server/integrations/nextjs',
              },
              {
                name: 'Node.js',
                href: '/server/integrations/node-http',
              },
            ].map(env => (
              <div className="p-2 sm:w-1/2 md:w-1/3 w-full" key={env.name}>
                <Anchor href={env.href}>
                  <div className="bg-amber-100 dark:bg-amber-800 rounded flex p-4 h-full items-center gap-2">
                    <BsFillPlayFill
                      className="w-6 h-6 flex-shrink-0 mr-4"
                      style={{ fill: pickGradient(2)[0] }}
                    />
                    <span className="title-font font-medium text-black dark:text-white">
                      {env.name}
                    </span>
                  </div>
                </Anchor>
              </div>
            ))}
          </div>
        </div>
      </Feature>
    </>
  );
}

function FeatureWrapper({ children }: { children: ReactNode }): ReactElement {
  return (
    <div
      className={`
        w-full py-24
        odd:bg-gray-50
        odd:dark:bg-gray-900
        even:bg-white
        even:dark:bg-black
      `}
    >
      {children}
    </div>
  );
}

function Feature({
  title,
  description,
  children,
  image,
  gradient,
  flipped,
}: {
  children?: ReactNode;
  title: string;
  description: ReactNode;
  highlights?: {
    title: string;
    description: ReactNode;
    icon?: ReactNode;
  }[];
  image?: string;
  gradient: number;
  flipped?: boolean;
}) {
  const [start, end] = pickGradient(gradient);

  return (
    <FeatureWrapper>
      <div className="container box-border px-6 mx-auto flex flex-col gap-y-24">
        <div
          className={clsx(
            'flex flex-col gap-24 md:gap-12 lg:gap-24 justify-center items-stretch',
            flipped ? 'md:flex-row-reverse' : 'md:flex-row',
          )}
        >
          <div
            className={clsx(
              'flex flex-col gap-4 w-full md:w-3/5 lg:w-2/5 flex-shrink-0',
              !image && 'items-center',
            )}
          >
            <h2
              className={clsx(
                'font-semibold text-5xl bg-clip-text text-transparent dark:text-transparent leading-normal',
                !image && 'text-center',
              )}
              style={{
                backgroundImage: `linear-gradient(-70deg, ${end}, ${start})`,
              }}
            >
              {title}
            </h2>
            <div className="text-lg text-gray-600 dark:text-gray-400 leading-7">{description}</div>
          </div>
          {image && (
            <div
              className="rounded-3xl overflow-hidden p-8 flex-grow flex flex-col justify-center items-stretch relative"
              style={{
                backgroundImage: `linear-gradient(70deg, ${start}, ${end})`,
              }}
            >
              <Image src={image} className="rounded-xl mx-auto" placeholder="empty" alt={title} />
            </div>
          )}
        </div>
        {children}
      </div>
    </FeatureWrapper>
  );
}

function FeatureHighlights({
  highlights,
  textColor,
}: {
  textColor?: string;
  highlights?: {
    title: string;
    description: ReactNode;
    icon?: ReactNode;
    link?: string;
  }[];
}) {
  if (!Array.isArray(highlights)) {
    return null;
  }

  return (
    <>
      {highlights.map(({ title, description, icon, link }) => {
        const Comp = link ? Anchor : 'div';
        return (
          <Comp
            key={title}
            className="flex flex-row md:flex-col lg:flex-row flex-1 gap-4"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...(link && ({ href: link } as any))}
          >
            {icon && (
              <div className="flex-shrink-0" style={textColor ? { color: textColor } : {}}>
                {icon}
              </div>
            )}
            <div className="text-black dark:text-white">
              <h3
                className={clsx('text-xl font-semibold', !icon && 'text-lg')}
                style={textColor ? { color: textColor } : {}}
              >
                {title}
              </h3>
              <p className={clsx('text-gray-600 dark:text-gray-400', !icon && 'text-sm')}>
                {description}
              </p>
            </div>
          </Comp>
        );
      })}
    </>
  );
}
