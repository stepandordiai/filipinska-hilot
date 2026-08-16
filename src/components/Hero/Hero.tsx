"use client";

import { useTranslations } from "next-intl";
import ArrowRightShortIcon from "../icons/ArrowRightShortIcon";
import treatments from "@/data/treatments.json";

import "./styles.scss";
import { useEffect, useState } from "react";

export default function Hero() {
	const t = useTranslations();

	const [index, setIndex] = useState(0);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		setVisible(true);
		const interval = setInterval(() => {
			setVisible(false); // start fade-out

			setTimeout(() => {
				setIndex((prev) => (prev + 1) % treatments.length);
				setVisible(true); // fade back in with new text
			}, 1000); // should match your CSS transition duration
		}, 8000);

		return () => clearInterval(interval);
	}, []);

	return (
		<section className="hero" id="uvod">
			<div className="hero-container">
				<h1 className="hero__heading">
					{t.rich("hero.heading", {
						accent: (chunks) => (
							<span style={{ fontFamily: "var(--font-courgette)" }}>
								{chunks}
							</span>
						),
					})}
				</h1>
				<p className="hero__subheading">{t("hero.subheading")}</p>
				<div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap" }}>
					<a
						href="https://local.termino.eu/embed/filipinska-hilot-wellness-masaz"
						target="_blank"
						className="hero__secondary-btn"
					>
						{t("bookAnAppointment")}
					</a>
					<a href="#sluzby" className="hero__primary-btn">
						<span>{t("hero.exploreTreatments")}</span>
						<span>
							<ArrowRightShortIcon size={20} />
						</span>
					</a>
				</div>
			</div>
			<div
				className={`hero__treatment-slider ${visible ? "hero__treatment-slider--visible" : ""}`}
			>
				<img src={treatments[index].img} alt={t(treatments[index].name)} />
				<div className="hero__treatment-slider-details">
					<p>{t(treatments[index].name)}</p>
					<p
						style={{
							fontSize: "1.25rem",
							fontWeight: "500",
							marginBottom: "0.25rem",
						}}
					>
						{t("durationAndPrice")}
					</p>
					<div
						style={{
							display: "flex",
							gap: "0.25rem",
							flexWrap: "wrap",
						}}
					>
						{treatments[index].duration.map((d, i) => {
							return (
								<div key={i} className="treatment-card__price">
									{d.time}min - {d.price} Kč
								</div>
							);
						})}
					</div>
					<a
						className="treatment-card__btn"
						href={"#" + treatments[index].path}
					>
						<span>Read more</span>
						<span
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<ArrowRightShortIcon size={20} />
						</span>
					</a>
				</div>
			</div>
			<img className="hero__bg" src="/hero.png" alt="" />
		</section>
	);
}
