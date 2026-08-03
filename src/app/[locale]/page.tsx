import Hero from "@/components/Hero/Hero";
import styles from "./page.module.scss";
import AboutUs from "@/components/AboutUs/AboutUs";
import Treatments from "@/components/Treatments/Treatments";
import Contacts from "@/components/Contacts/Contacts";

export default function Home() {
	return (
		<main className={styles.page}>
			<Hero />
			<AboutUs />
			<Treatments />
			<Contacts />
		</main>
	);
}
