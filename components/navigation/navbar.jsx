import styles from "../../styles/Navbar.module.css";
import Link from "next/link";
import { FolderIcon } from "../../public/img/FolderLogo.webp";


export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<Link href="/" className="site-title">NFolderiT</Link>
			<ul>
				<li>
					<Link href="/">Team</Link>
				</li>
				<li>
					<Link href="/mvp">MVP</Link>
				</li>	
				<li>
					<Link href="/birthdays">Birthdays</Link>
				</li>
			</ul>
		</nav>
	);
}
