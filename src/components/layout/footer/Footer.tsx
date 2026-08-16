import Image from "next/image";
import navLinks from "@/data/navLinks.json";
import { getTranslations } from "next-intl/server";
import "./styles.scss";

export default async function Footer() {
	const t = await getTranslations();
	return (
		<footer className="footer">
			<a href="#uvod">
				<Image
					src="/logo-2.png"
					width={300}
					height={300}
					alt="Filipínská Hilot Wellness Masáž logo"
				/>
			</a>
			<div className="footer__main-container">
				<p>{t("footer.navigation")}</p>
				<nav className="footer__nav">
					{navLinks.map((navLink, i) => {
						return (
							<a key={i} className="footer__nav-link" href={navLink.path}>
								{t(navLink.label)}
							</a>
						);
					})}
				</nav>
			</div>
			<div className="footer__bottom">
				<p>&copy; {new Date().getFullYear()} Filipínská Hilot</p>
				<p className="footer__author">
					Website created by{" "}
					<a
						href="https://www.heeeyooo.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						heeeyooo studio
					</a>
				</p>
			</div>
		</footer>
	);
}
