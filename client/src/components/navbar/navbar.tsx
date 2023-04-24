import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

const BiSun = dynamic(
	() =>
		import('react-icons/bi').then((module) => {
			return module.BiSun;
		}),
	{
		loading: () => <p>Loading...</p>,
	}
);
const BiMoon = dynamic(
	() =>
		import('react-icons/bi').then((module) => {
			return module.BiMoon;
		}),
	{
		loading: () => <p>Loading...</p>,
	}
);

const Navbar = () => {
	const [mounted, setMounted] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const { theme, setTheme } = useTheme();
	const themeMenu = useRef<HTMLDivElement>(null);
	const themeHandler = () => {
		// toast.success('Theme changed!');
		switch (theme) {
			case 'pastel':
				setTheme('dark');
				break;
			case 'dark':
				setTheme('valentine');
				break;
			case 'valentine':
				setTheme('night');
				break;
			case 'night':
				setTheme('pastel');
				break;
			default:
				setTheme('pastel');
		}
	};
	const themeIcon = () => {
		switch (theme) {
			case 'pastel':
				return <BiSun size="2rem" />;
			case 'dark':
				return <BiMoon size="2rem" />;
			case 'valentine':
				return <BiSun size="2rem" />;
			case 'night':
				return <BiMoon size="2rem" />;
			default:
				return <BiSun size="2rem" />;
		}
	};

	useEffect(() => setMounted(true), []);
	useEffect(() => {
		if (!isOpen) {
			(document.activeElement as HTMLElement).blur();
		} else if (isOpen && !themeMenu.current?.contains(document.activeElement)) {
			setIsOpen(false);
		}
	}, [isOpen]);
	return (
		<div className="navbar glassy fixed z-[2] top-0 left-0 right-0 mx-auto w-[98%] bg-base-300 px-8 rounded-full mt-2">
			<div className="flex-1 -ml-2">
				<Link className="btn btn-ghost normal-case" href={'/'}>
					<h1 className="text-4xl font-black tracking-tight">API Handler</h1>
				</Link>
			</div>
			<div className="flex-none">
				<div onClick={themeHandler}>
					{mounted && (
						<div
							className="tooltip tooltip-left tooltip-success w-10 flex justify-center cursor-pointer hover:scale-110"
							data-tip={theme}
						>
							{themeIcon()}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
