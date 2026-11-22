import { Head, Html, Main, NextScript } from 'next/document';

// Without a custom document, Next renders <html> with no lang attribute,
// which search engines and screen readers rely on.
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
