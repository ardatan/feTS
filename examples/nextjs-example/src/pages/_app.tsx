import type { AppProps } from 'next/app';
// @ts-expect-error - we know it exists
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
