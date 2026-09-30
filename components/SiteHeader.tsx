import Link from "next/link";
import Image from "next/image";
import logo from "@/app/sunnivera-logo.webp";
import MobileMenu from "./MobileMenu";

export default function SiteHeader() {
  return (
    <header className="hd">
      <div className="wrap bar">
        <Link href="/" className="mark">
          <Image src={logo} alt="Sunivera Logistics Limited" priority />
        </Link>
        <nav>
          <Link href="/about">About</Link>
          <Link href="/#work">What we do</Link>
          <Link href="/#method">Method</Link>
          {/* <Link href="/insights">Insights</Link> */}
          <Link href="/opportunities">Opportunities</Link>
        </nav>
        <Link href="/#contact" className="btn ink">
          Discuss a project
        </Link>
        <MobileMenu />
      </div>
    </header>
  );
}
