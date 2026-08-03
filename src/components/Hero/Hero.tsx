import { getTranslations } from "next-intl/server";
import Link from "next/link";
import ArrowRightShortIcon from "../icons/ArrowRightShortIcon";
import "./styles.scss";

export default async function Hero() {
	const t = await getTranslations();

	return (
		<section className="hero" id="uvod">
			<div className="hero-container">
				<h1 className="hero__title">
					{t.rich("hero.heading", {
						accent: (chunks) => (
							<span style={{ fontFamily: "var(--font-courgette)" }}>
								{chunks}
							</span>
						),
					})}
				</h1>
				<p style={{ maxWidth: "800px" }}>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
					ea maiores architecto aperiam eum ipsum, earum exercitationem
					accusamus at sint ipsa harum, debitis quis pariatur tempora ullam.
					Inventore, porro animi?
				</p>
				<div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap" }}>
					<a
						href="https://local.termino.eu/embed/filipinska-hilot-wellness-masaz"
						target="_blank"
						className="hero__secondary-btn"
					>
						{t("bookAnAppointment")}
					</a>
					<Link href={"/#treatments"} className="hero__primary-btn">
						<span>Explore Treatments</span>
						<span>
							<ArrowRightShortIcon size={20} />
						</span>
					</Link>
				</div>
			</div>
			<img className="hero__bg" src="/hero.png" alt="" />
		</section>
	);
}
