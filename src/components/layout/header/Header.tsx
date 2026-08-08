"use client";

import { useTranslations } from "next-intl";
import ArrowRightShortIcon from "@/components/icons/ArrowRightShortIcon";
import "./styles.scss";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

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
			document.getElementById("o-filipinska-hilot") as HTMLElement,
			document.getElementById("treatments") as HTMLElement,
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
					<Link className="header__nav-link" href="/#uvod">
						{t("nav.home")}
					</Link>
					<Link className="header__nav-link" href="/#o-filipinska-hilot">
						{t("nav.about")}
					</Link>
					<Link className="header__nav-link" href="/#treatments">
						{t("nav.treatments")}
					</Link>
					<Link className="header__nav-link" href="/#kontakty">
						{t("nav.contacts")}
					</Link>
				</nav>
				<button
					onClick={() => setMenuOpen((prev) => !prev)}
					className="menu__btn"
				>
					{menuOpen ? "Close" : "Menu"}
				</button>
				<Link href="/#treatments" className="header__primary-btn">
					<span>Explore Treatments</span>
					<span>
						<ArrowRightShortIcon size={20} />
					</span>
				</Link>
			</header>
			<div className={`menu ${menuOpen ? "menu--open" : ""}`}>
				<nav className="menu__nav">
					<Link
						onClick={() => setMenuOpen(false)}
						className="menu__nav-link"
						href="/#uvod"
					>
						{t("nav.home")}
					</Link>
					<Link
						onClick={() => setMenuOpen(false)}
						className="menu__nav-link"
						href="/#o-filipinska-hilot"
					>
						{t("nav.about")}
					</Link>
					<Link
						onClick={() => setMenuOpen(false)}
						className="menu__nav-link"
						href="/#treatments"
					>
						{t("nav.treatments")}
					</Link>
					<Link
						onClick={() => setMenuOpen(false)}
						className="menu__nav-link"
						href="/#kontakty"
					>
						{t("nav.contacts")}
					</Link>
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
