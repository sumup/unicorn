import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'emotion-theming';
import { light } from '@sumup/design-tokens';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import initAuth from '../utils/initAuth';

initAuth();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={light}>
			<Head>
				<title>Unicorn</title>
				<link
					rel='icon'
					href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🦄</text></svg>'
				/>
			</Head>
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

export default MyApp;
