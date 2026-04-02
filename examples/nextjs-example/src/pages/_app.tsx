import type { AppProps } from 'next/app';
// @ts-expect-error - CSS types are missing
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
