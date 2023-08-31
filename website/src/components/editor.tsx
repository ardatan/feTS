import { useEffect, useRef } from 'react';
import { code } from './constants';
import { nightOwlTheme } from './theme';

type Monaco = typeof import('monaco-editor');
type SandboxFactory = typeof import('@typescript/sandbox');

interface SandboxModel {
  sandboxFactory: SandboxFactory;
  monaco: Monaco;
  ts: typeof import('typescript');
}

let instance: Promise<SandboxModel> | undefined;

const sandboxSingleton = (): Promise<SandboxModel> => {
  if (instance) {
    return instance;
  }
  return (instance = loadSandbox());
};

function loadSandbox(): Promise<SandboxModel> {
  return new Promise((resolve, reject): void => {
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
          vs: 'https://typescript.azureedge.net/cdn/5.2.2/monaco/min/vs',
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
        resolve({ monaco, sandboxFactory, ts: (window as any).ts });
      }, () => {
        reject(new Error('Could not get all the dependencies of sandbox set up!'));
      });
    };
  });
}

export function Editor() {
  const monacoElementRef = useRef<HTMLDivElement>(null);
  const monacoLoadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadingElement = monacoLoadingRef.current!;

    if (window.innerWidth < 1024) {
      loadingElement.parentElement!.remove();
      return;
    }

    sandboxSingleton()
      .then(({ monaco, sandboxFactory, ts }) => {
        const monacoEl = monacoElementRef.current!;
        // Create a sandbox and embed it into the div #monaco-editor-embed
        const sandboxConfig: Parameters<SandboxFactory['createTypeScriptSandbox']>[0] = {
          text: code,
          compilerOptions: {},
          domID: monacoEl.id,
          monacoSettings: {
            automaticLayout: true,
            // @ts-expect-error -- theme exists
            theme: 'night-owl',
            hover: { above: false },
          },
          // @ts-expect-error -- logger exists
          logger: {
            // disable logging from the sandbox
            log: () => {},
          },
        };
        monaco.editor.defineTheme('night-owl', nightOwlTheme as any);
        const sandbox = sandboxFactory.createTypeScriptSandbox(sandboxConfig, monaco, ts);
        const [editor] = monaco.editor.getEditors();
        editor.trigger('fold', 'editor.foldLevel2', {});

        setTimeout(() => {
          // https://github.com/microsoft/monaco-editor/issues/2052#issuecomment-689786705
          editor.setPosition(new monaco.Position(7, 7));
          editor.getAction('editor.action.showHover')!.run();
          loadingElement.remove();
          monacoEl.classList.remove('opacity-0');
        }, 3000);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="relative min-h-[50vh] dark:drop-shadow-[24px_20px_30px_rgba(24,134,255,.2)] max-lg:hidden">
      <div
        ref={monacoLoadingRef}
        className="absolute inset-0 flex flex-col items-center justify-center gap-8 bg-[#011627] text-gray-100"
      >
        <span className="text-2xl">Preview editor is loading...</span>
        <Spinner />
      </div>
      <div
        className="h-full opacity-0 transition-opacity [transition-duration:2s]"
        id="monaco-editor-embed"
        ref={monacoElementRef}
      />
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="h-16 w-16 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
