import '@theguild/components/style.css';
import { useEffect } from 'react';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (window.location.href.startsWith('https://the-guild.dev/openapi/fets')) {
      window.location.href = window.location.href.replace(
        'https://the-guild.dev/openapi/fets',
        'https://fets.dev',
      );
    }
  }, []);

  return <Component {...pageProps} />;
}
