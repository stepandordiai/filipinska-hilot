import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Treatments from "@/components/Treatments/Treatments";
import Contacts from "@/components/Contacts/Contacts";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import styles from "./page.module.scss";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "home.meta" });
	const languages = Object.fromEntries(
		routing.locales.map((l) => [l, `/${l}`]),
	);

	return {
		description: t("description"),
		alternates: {
			canonical: `/${locale}`,
			languages: {
				...languages,
				"x-default": `/${routing.defaultLocale}`,
			},
		},
		// TODO: learn this
		openGraph: {
			description: t("description"),
			url: `/${locale}`,
			type: "website",
			images: "/filipinska-masaz-og.png",
		},
	};
}

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "HealthAndBeautyBusiness",
	name: "Filipínská Hilot Wellness Masáž",
	url: "https://www.filipinskamasaz.cz/cs",
	telephone: "+420604114502",
	priceRange: "450–2300 Kč",
	address: {
		"@type": "PostalAddress",
		streetAddress: "Dr. Vrbenského 22",
		postalCode: "272 01",
		addressLocality: "Kladno",
		addressCountry: "CZ",
	},
	openingHoursSpecification: [
		{
			"@type": "OpeningHoursSpecification",
			dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
			opens: "09:00",
			closes: "20:00",
		},
		{
			"@type": "OpeningHoursSpecification",
			dayOfWeek: ["Friday", "Saturday"],
			opens: "09:00",
			closes: "21:00",
		},
	],
};

export default function Home() {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<main className={styles.page}>
				<Hero />
				<About />
				<Treatments />
				<Contacts />
			</main>
		</>
	);
}
