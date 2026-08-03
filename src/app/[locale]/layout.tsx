import type { Metadata } from "next";
import { Raleway, Courgette } from "next/font/google";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { BASE_URL } from "@/lib/constants";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import "@/scss/globals.scss";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const raleway = Raleway({
	variable: "--font-raleway",
	subsets: ["latin"],
});

const courgette = Courgette({
	variable: "--font-courgette",
	weight: ["400"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL(BASE_URL),
	// TODO: learn this
	title: {
		template: "%s | Filipínská Hilot",
		default: "Filipínská Hilot",
	},
};

export default async function LocaleLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		return notFound();
	}
	return (
		<html lang={locale} className={`${raleway.variable} ${courgette.variable}`}>
			<body>
				<NextIntlClientProvider locale={locale}>
					<Header />
					{children}
					<Footer />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
