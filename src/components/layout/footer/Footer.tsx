import "./styles.scss";

export default function Footer() {
	return (
		<footer className="footer">
			<img src="/logo-2.png" width={300} alt="" />
			<p>&copy; {new Date().getFullYear()} Filipínská Hilot</p>
			<p className="footer__author">
				Website created by{" "}
				<a
					href="https://www.heeeyooo.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					heeeyooo studio
				</a>
			</p>
		</footer>
	);
}
