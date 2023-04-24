import React, { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import Head from 'next/head';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
	variable: '--font-poppins',
	weight: ['200', '400', '600'],
	subsets: ['latin-ext'],
});

interface PageProps extends ComponentPropsWithoutRef<'main'> {
	title: string;
	className?: string;
}

const Page = ({ title, className, children }: PropsWithChildren<PageProps>) => {
	return (
		<main
			className={`${poppins.variable} font-poppins pt-20 w-full h-full ${
				className ? className : ''
			}`}
		>
			<Head>
				<title>{title}</title>
			</Head>
			{children}
		</main>
	);
};

export default Page;
