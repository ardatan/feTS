/* eslint sort-keys: error */
import { useRouter } from 'next/router';
import { defineConfig, Giscus, useTheme } from '@theguild/components';
import FetsLogo from 'public/assets/fets-logo.svg';

export default defineConfig({
  docsRepositoryBase: 'https://github.com/ardatan/fets/tree/master/website',
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
  siteName: 'FETS',
  logo: (
    <div className="flex items-center gap-x-2">
      <FetsLogo />
      <span className="font-bold text-gray-500 dark:text-gray-100">feTS</span>
    </div>
  ),
});
