import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p>
          <strong>Hearth &amp; Plate</strong> · Homemade catering for pickup
        </p>
        <p>
          <Link href="/about">About</Link>
          {" · "}
          <Link href="/contact">Contact</Link>
          {" · "}
          <a href="tel:+15555550123">(555) 555-0123</a>
        </p>
      </div>
    </footer>
  );
}
