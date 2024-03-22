/* eslint sort-keys: error */
import { useRouter } from 'next/router';
import { defineConfig, Giscus, PRODUCTS, useTheme } from '@theguild/components';

export default defineConfig({
  description: PRODUCTS.FETS.title,
  docsRepositoryBase: 'https://github.com/ardatan/fets/tree/master/website',
  logo: PRODUCTS.FETS.logo,
  main({ children }) {
    const { resolvedTheme } = useTheme();
    const { route } = useRouter();

    const comments = route !== '/' && (
      <Giscus
        // ensure giscus is reloaded when client side route is changed
        key={route}
        repo="ardatan/fets"
        repoId="R_kgDOJEZxnw"
        category="General"
        categoryId="DIC_kwDOJEZxn84CUwYy"
        mapping="pathname"
        theme={resolvedTheme}
      />
    );
    return (
      <>
        {children}
        {comments}
      </>
    );
  },
  websiteName: 'FETS',
});
