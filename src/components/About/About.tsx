import { getTranslations } from "next-intl/server";
import "./styles.scss";

export default async function About() {
	const t = await getTranslations();

	return (
		<section className="about" id="o-filipinska-hilot-wellness-masaz">
			<h2 className="about__title">
				{t("about.heading")} Filipínská Hilot Wellness Masáž
			</h2>
			<div className="about__description-container">
				{t.raw("about.description").map((p: string, i: number) => {
					return <p key={i}>{p}</p>;
				})}
			</div>
			<div className="about__milestones-container">
				<div className="about__milestone">
					<span>10+</span>
					<span>{t("about.yearsOfExperience")}</span>
				</div>
				<div className="about__milestone"></div>
				<div className="about__milestone"></div>
			</div>
		</section>
	);
}
