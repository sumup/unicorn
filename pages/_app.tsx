import React from 'react';
import Head from 'next/head';
import { withAuthUser } from 'next-firebase-auth';
import { BaseStyles } from '@sumup/circuit-ui';
import { ThemeProvider } from 'emotion-theming';
import { light } from '@sumup/design-tokens';
import type { AppProps } from 'next/app';
import initAuth from 'utils/initAuth';
import Header from 'components/Header';

initAuth();

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider theme={light}>
      <BaseStyles />
      <Head>
        <title>Unicorn</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🦄</text></svg>"
        />
      </Head>
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default withAuthUser<AppProps>()(MyApp);
