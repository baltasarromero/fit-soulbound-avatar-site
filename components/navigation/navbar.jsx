import styles from "../../styles/Navbar.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";


export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<Link href="/" className="site-title">NFolderiT</Link>
			<ConnectButton></ConnectButton>
		</nav>
	);
}
