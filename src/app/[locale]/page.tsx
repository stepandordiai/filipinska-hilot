import Hero from "@/components/Hero/Hero";
import styles from "./page.module.scss";
import About from "@/components/About/About";
import Treatments from "@/components/Treatments/Treatments";
import Contacts from "@/components/Contacts/Contacts";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

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

export default function Home() {
	return (
		<main className={styles.page}>
			<Hero />
			<About />
			<Treatments />
			<Contacts />
		</main>
	);
}
