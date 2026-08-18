"use client";

import { useTranslations } from "next-intl";
import ArrowRightShortIcon from "@/components/icons/ArrowRightShortIcon";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import navLinks from "@/data/navLinks.json";
import "./styles.scss";
import LngSelect from "@/components/LngSelect/LngSelect";

export default function Header() {
	const t = useTranslations();
	const [menuOpen, setMenuOpen] = useState(false);

	function getRect(
		sections: HTMLElement[],
		headerNavLinks: NodeListOf<HTMLAnchorElement>,
		menuNavLinks: NodeListOf<HTMLAnchorElement>,
	) {
		headerNavLinks.forEach((link) => link.classList.remove("active"));
		menuNavLinks.forEach((link) => link.classList.remove("active"));

		sections.forEach((section, index) => {
			if (!section) return;

			const sectionRect = section.getBoundingClientRect();

			if (sectionRect.top <= 80 && sectionRect.bottom >= 85) {
				headerNavLinks[index].classList.add("active");
				menuNavLinks[index].classList.add("active");
			}
		});
	}

	// FIXME:
	useEffect(() => {
		const sections = [
			document.getElementById("uvod") as HTMLElement,
			document.getElementById(
				"o-filipinska-hilot-wellness-masaz",
			) as HTMLElement,
			document.getElementById("sluzby") as HTMLElement,
			document.getElementById("kontakty") as HTMLElement,
		];
		const headerNavLinks = document.querySelectorAll(
			".header__nav-link",
		) as NodeListOf<HTMLAnchorElement>;
		const menuNavLinks = document.querySelectorAll(
			".menu__nav-link",
		) as NodeListOf<HTMLAnchorElement>;

		if (
			!menuNavLinks.length ||
			!headerNavLinks.length ||
			!sections.some(Boolean)
		)
			return;

		const handleGetRectOnScroll = () =>
			getRect(sections, headerNavLinks, menuNavLinks);

		const frameId = requestAnimationFrame(() => {
			handleGetRectOnScroll();
		});

		document.addEventListener("scroll", handleGetRectOnScroll);

		return () => {
			cancelAnimationFrame(frameId);
			document.removeEventListener("scroll", handleGetRectOnScroll);
		};
	}, []);

	return (
		<>
			<header className="header">
				<Link className="header__logo" href="/">
					<Image src={"/logo-2.png"} width={80} height={80} alt=""></Image>
					{/* <span>Filipínská Hilot</span> */}
				</Link>
				<nav className="header__nav">
					{navLinks.map((navLink, i) => {
						return (
							<a key={i} className="header__nav-link" href={navLink.path}>
								{t(navLink.label)}
							</a>
						);
					})}
				</nav>
				<div
					style={{
						display: "flex",
						gap: "0.25rem",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<button
						onClick={() => setMenuOpen((prev) => !prev)}
						className="menu__btn"
					>
						{menuOpen ? t("close") : "Menu"}
					</button>
					<a
						href="https://local.termino.eu/embed/filipinska-hilot-wellness-masaz"
						target="_blank"
						className="header__primary-btn"
					>
						<span>{t("bookAnAppointment")}</span>
						<span>
							<ArrowRightShortIcon size={20} />
						</span>
					</a>
					<LngSelect />
				</div>
			</header>
			<div className={`menu ${menuOpen ? "menu--open" : ""}`}>
				<nav className="menu__nav">
					{navLinks.map((navLink, i) => {
						return (
							<a key={i} className="menu__nav-link" href={navLink.path}>
								{t(navLink.label)}
							</a>
						);
					})}
				</nav>
				<div className="menu-contacts__container">
					<div>
						<a href="tel:+420604114502">+420 604 114 502</a>
					</div>
					<div>
						<a href="mailto:filipinskahilotmasaz@gmail.com">
							filipinskahilotmasaz@gmail.com
						</a>
					</div>
					<div>Dr. Vrbenského 22 272 01 Kladno Czechia</div>
				</div>
			</div>
		</>
	);
}
