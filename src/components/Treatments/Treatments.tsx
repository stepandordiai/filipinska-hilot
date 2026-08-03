import ArrowRightShortIcon from "../icons/ArrowRightShortIcon";
import treatments from "@/data/treatments.json";
import { getTranslations } from "next-intl/server";
import "./styles.scss";

export default async function Treatments() {
	const t = await getTranslations();

	return (
		<section className="treatments" id="treatments">
			<h2 className="treatments__title">Treatments</h2>
			<p
				style={{
					fontSize: "clamp(2rem, 4vw, 4rem)",
					color: "var(--f1ebdd-clr)",
				}}
			>
				Objevte{" "}
				<span style={{ fontFamily: "var(--font-courgette)" }}>masáže</span> šité
				na míru vašemu tělu i mysli
			</p>
			<div className="treatments-grid">
				{treatments.map((treatment) => {
					return (
						<div key={treatment.name} className="treatment-card">
							<div className="treatment-card__container">
								<div className="treatment-card__img-container">
									<h3 className="treatment-card__heading">
										{t(treatment.name)}
									</h3>
									<img
										className="treatment-card__img"
										src={treatment.img}
										alt=""
									/>
								</div>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "0.5rem",
										width: "100%",
									}}
								>
									{t.raw(treatment.description).map((p: string, i: number) => (
										<p key={i} style={{ fontSize: "18px" }}>
											{p}
										</p>
									))}
									<p style={{ fontSize: "18px" }}>
										{t(treatment.benefitsTitle)}
									</p>
									<ul style={{ fontSize: "18px" }}>
										{t.raw(treatment.benefits).map((b: string, i: number) => {
											return <li key={i}>{b}</li>;
										})}
									</ul>
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											flexWrap: "wrap",
											marginTop: "auto",
											gap: "0.25rem",
										}}
									>
										<div>
											<h4
												style={{
													fontSize: "1.25rem",
													fontWeight: "500",
													marginBottom: "0.25rem",
												}}
											>
												{t("durationAndPrice")}
											</h4>
											<div
												style={{
													display: "flex",
													gap: "0.25rem",
													flexWrap: "wrap",
												}}
											>
												{treatment.duration.map((d, i) => {
													return (
														<div key={i} className="treatment-card__price">
															{d.time}min - {d.price} Kč
														</div>
													);
												})}
											</div>
										</div>
										<a
											className="treatment-card__btn"
											href="https://local.termino.eu/embed/filipinska-hilot-wellness-masaz"
											target="_blank"
										>
											<span>{t("bookAnAppointment")}</span>
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
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
