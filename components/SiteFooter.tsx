import Link from "next/link";
import Image from "next/image";
import logo from "@/app/sunnivera-logo.png";

export default function SiteFooter() {
  return (
    <footer>
      <div className="wrap foot">
        <div className="mark">
          <Image
            src={logo}
            alt="Sunivera Logistics Limited"
            width={212}
            height={88}
            quality={100}
          />
        </div>
        <p>Procurement. Compliance. Projects. Workforce. Technology.</p>
        <a href="mailto:hello@suniveralogisticsltd.com">
          hello@suniveralogisticsltd.com
        </a>
        <nav className="fl" aria-label="Footer">
          <Link href="/about">About</Link>
          <Link href="/insights">Insights</Link>
          <Link href="/opportunities">Opportunities</Link>
          <Link href="/talent">Talent network</Link>
          <Link href="/sunivera-os">Sunivera OS</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="https://app.suniveralogisticsltd.com/public/login">
            Staff Login
          </Link>
        </nav>
        <small>© 2026 Sunivera Logistics Limited</small>
      </div>
    </footer>
  );
}
