// @ts-expect-error - CSS Types are missing
import '@theguild/components/style.css';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
