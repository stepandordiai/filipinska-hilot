import EnvelopeIcon from "../icons/EnvelopeIcon";
import PinIcon from "../icons/PinIcon";
import TelIcon from "../icons/TelIcon";
import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import "./styles.scss";

const businessHours = [
	{
		hours: "09:00-20:00",
	},
	{
		hours: "09:00-20:00",
	},
	{
		hours: "09:00-20:00",
	},
	{
		hours: "09:00-20:00",
	},
	{
		hours: "09:00-21:00",
	},
	{
		hours: "09:00-21:00",
	},
	{
		hours: "closed",
	},
];

const MONDAY_DATE = new Date(2024, 0, 1);

const getWeekday = (index: number, locale: string) => {
	const date = new Date(MONDAY_DATE);
	date.setDate(MONDAY_DATE.getDate() + index);
	return new Intl.DateTimeFormat(locale, { weekday: "long" }).format(date);
};

export default async function Contacts() {
	const t = await getTranslations();
	const locale = await getLocale();
	const dayNow = new Date().getDay();
	const correctDayNow = dayNow === 0 ? 6 : dayNow - 1;

	return (
		<section className="contacts" id="kontakty">
			<h2 className="contacts__title">{t("contacts.heading")}</h2>
			<div className="contacts__container">
				<div>
					<p className="contacts__details-title">
						<span>
							<TelIcon size={20} />
						</span>
						<span>{t("contacts.tel")}</span>
					</p>
					<a className="contacts__link" href="tel:+420604114502">
						+420 604 114 502
					</a>
				</div>
				<div>
					<p className="contacts__details-title">
						<span>
							<EnvelopeIcon size={20} />
						</span>
						<span>Email</span>
					</p>
					<a
						className="contacts__link"
						href="mailto:filipinskahilotmasaz@gmail.com"
					>
						filipinskahilotmasaz@gmail.com
					</a>
				</div>
				<div>
					<p className="contacts__details-title">
						<span>
							<PinIcon size={20} />
						</span>
						<span>{t("contacts.address")}</span>
					</p>
					<a
						className="contacts__link"
						href="https://maps.app.goo.gl/YuxNnMVc8JgDCf2p7"
						target="_blank"
					>
						Dr. Vrbenského 22 272 01 Kladno Czechia
					</a>
				</div>
			</div>
			<div className="contacts__map-container">
				<h3 className="contacts__map-container-heading">
					{t("contacts.mapHeading")}
				</h3>
				<iframe
					className="contacts__map"
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2556.7866677165607!2d14.10166267699428!3d50.146422609207356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x666b7e95636ed627%3A0xc72b05950a05a2b3!2zRmlsaXDDrW5za8OhIEhpbG90IFdlbGxuZXNzIE1hc8Ohxb4!5e0!3m2!1sen!2scz!4v1786870859340!5m2!1sen!2scz"
					loading="lazy"
				></iframe>
			</div>
			<div className="contacts__opening-hours">
				<h3 className="contacts__map-container-heading">
					{t("contacts.openingHoursHeading")}
				</h3>
				<ul className="contacts__list">
					{businessHours.map((day, index) => {
						return (
							<li
								key={index}
								className={`contacts__item ${correctDayNow === index ? "contacts__item--active" : ""}`}
							>
								<span>{getWeekday(index, locale)}:</span>
								<span>{day.hours === "closed" ? t("closed") : day.hours}</span>
							</li>
						);
					})}
				</ul>
				<p
					style={{
						marginTop: "20px",
						textAlign: "center",
						fontWeight: "500",
						fontSize: "18px",
					}}
				>
					Closed on public holidays.
				</p>
			</div>
		</section>
	);
}
