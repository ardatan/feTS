import { useEffect, useRef } from 'react';
import NextImage from 'next/image';
import { useTheme } from '@theguild/components';
import { code } from './constants';
import fetsTextLogo from 'public/assets/fets-text-logo.png';

type Monaco = typeof import('monaco-editor');
type SandboxFactory = typeof import('@typescript/sandbox');

export default function Editor() {
  const { resolvedTheme } = useTheme();
  const monacoElementRef = useRef<HTMLDivElement>(null);
  const fetsHeroLogoRef = useRef<HTMLImageElement>(null);
  const monacoRef = useRef<Monaco>();

  const theme = resolvedTheme === 'dark' ? 'vs-dark' : 'light';

  useEffect(() => {
    // First set up the VSCode loader in a script tag
    const getLoaderScript = document.createElement('script');
    document.head.append(getLoaderScript);
    getLoaderScript.src = 'https://www.typescriptlang.org/js/vs.loader.js';
    getLoaderScript.async = true;
    getLoaderScript.onload = () => {
      // Now the loader is ready, tell require where it can get the version of monaco, and the sandbox
      // This version uses the latest version of the sandbox, which is used on the TypeScript website

      // For the monaco version you can use unpkg or the TypeScript web infra CDN
      // You can see the available releases for TypeScript here:
      // https://typescript.azureedge.net/indexes/releases.json
      const require = globalThis.require as any;

      require.config({
        paths: {
          vs: 'https://typescript.azureedge.net/cdn/5.1.3/monaco/min/vs',
          sandbox: 'https://www.typescriptlang.org/js/sandbox',
        },
        // This is something you need for monaco to work
        ignoreDuplicateModules: ['vs/editor/editor.main'],
      });

      // Grab a copy of monaco, TypeScript and the sandbox
      require(['vs/editor/editor.main', 'sandbox/index', 'vs/language/typescript/tsWorker'], (
        monaco: Monaco,
        sandboxFactory: SandboxFactory,
        _tsWorker: unknown,
      ) => {
        const ts = (window as any).ts as typeof import('typescript');
        const monacoEl = monacoElementRef.current!;
        const fetsLogoEl = fetsHeroLogoRef.current!;
        if (!monaco || !ts || !sandboxFactory) {
          console.error('Could not get all the dependencies of sandbox set up!');
          console.error('monaco', monaco, 'ts', ts, 'sandboxFactory', sandboxFactory);
          fetsLogoEl.classList.remove('opacity-0');
          return;
        }

        // Create a sandbox and embed it into the div #monaco-editor-embed
        const sandboxConfig: Parameters<SandboxFactory['createTypeScriptSandbox']>[0] = {
          text: code,
          compilerOptions: {},
          domID: monacoEl.id,
          monacoSettings: {
            automaticLayout: true,
            // @ts-expect-error -- there is no type error here...
            theme,
          },
        };
        monacoRef.current = monaco;
        monacoEl.classList.remove('opacity-0');
        const sandbox = sandboxFactory.createTypeScriptSandbox(sandboxConfig, monaco, ts);
        const [editor] = monaco.editor.getEditors();
        editor.trigger('fold', 'editor.foldLevel2', {});

        setTimeout(() => {
          // https://github.com/microsoft/monaco-editor/issues/2052#issuecomment-689786705
          editor.setPosition(new monaco.Position(8, 7));
          editor.getAction('editor.action.showHover')!.run();
        }, 500);
      });
    };
  }, []);

  useEffect(() => {
    monacoRef.current?.editor.setTheme(theme);
  }, [theme]);

  return (
    <div className="relative max-h-[450px] rounded-md drop-shadow-[40px_40px_50px_rgba(24,134,255,.8)] dark:drop-shadow-[40px_40px_50px_rgba(24,134,255,.3)] lg:flex-1">
      <NextImage
        src={fetsTextLogo}
        alt="feTS logo"
        className="absolute max-h-full w-auto opacity-0"
        ref={fetsHeroLogoRef}
      />
      <div className="min-h-[calc(100vh/2)]" id="monaco-editor-embed" ref={monacoElementRef} />
    </div>
  );
}
