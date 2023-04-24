import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Analytics />
			<ThemeProvider themes={['pastel', 'dark', 'valentine', 'night']}>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}
