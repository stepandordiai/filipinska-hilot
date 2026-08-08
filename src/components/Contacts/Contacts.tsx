import "./styles.scss";

export default function Contacts() {
	return (
		<section className="contacts" id="kontakty">
			<h2 className="contacts__title">Contacts</h2>
			<div className="contacts__container">
				<div>
					<a className="contacts__link" href="tel:+420604114502">
						+420 604 114 502
					</a>
				</div>
				<div>
					<a
						className="contacts__link"
						href="mailto:filipinskahilotmasaz@gmail.com"
					>
						filipinskahilotmasaz@gmail.com
					</a>
				</div>
				<div>Dr. Vrbenského 22 272 01 Kladno Czechia</div>
			</div>
		</section>
	);
}
