import { AppProps } from 'next/app';
import { ThemeProvider } from 'emotion-theming';
import { CacheProvider } from '@emotion/core';
import { cache } from 'emotion';
import { BaseStyles } from '@sumup/circuit-ui';
import { light } from '@sumup/design-tokens';
import { FC } from 'react';
import { defaultExchanges } from 'urql';
import { withUrqlClient } from 'next-urql';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <CacheProvider value={cache}>
    <ThemeProvider theme={light}>
      <BaseStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  </CacheProvider>
);

const AppWithUrql = withUrqlClient(() => ({
  url: '/api/gql/query',
  exchanges: defaultExchanges,
}))(App);

export default AppWithUrql;
