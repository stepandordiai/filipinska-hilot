"use client";

import { useRef, useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import classNames from "classnames";
import "./LngSelect.scss";

const languages = [
	{ code: "cs", name: "CZ" },
	{ code: "en", name: "EN" },
];

// TODO: learn this
const LngSelect = () => {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const lngSelectRef = useRef<HTMLDivElement | null>(null);

	const [isVisible, setIsVisible] = useState(false);

	const currentLng =
		languages.find((lng) => lng.code === locale) || languages[0];

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				lngSelectRef.current &&
				!lngSelectRef.current.contains(e.target as Node)
			) {
				setIsVisible(false);
			}
		};
		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

	const handleLanguageChange = (newLocale: string) => {
		router.replace(pathname, { locale: newLocale });
		setIsVisible(false);
	};

	return (
		<div ref={lngSelectRef} className="lng-select">
			<button
				onClick={() => setIsVisible(!isVisible)}
				className={classNames("lng-select__btn", {
					"lng-select__btn--active": isVisible,
				})}
			>
				{currentLng.name}
			</button>
			<ul
				className={classNames("lng-select__dd", {
					"lng-select__dd--active": isVisible,
				})}
				hidden={!isVisible}
			>
				{languages.map((lng) => (
					<li
						key={lng.code}
						onClick={() => handleLanguageChange(lng.code)}
						className={classNames("lng-select__option", {
							"lng-select__option--active": locale === lng.code,
						})}
					>
						{lng.name}
					</li>
				))}
			</ul>
		</div>
	);
};

export default LngSelect;
