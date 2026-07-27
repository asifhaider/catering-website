import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-bold text-white mb-3">Mama&apos;s Kitchen</h2>
            <p className="text-sm leading-relaxed">
              Homemade food catering made with love. Serving fresh, delicious meals for your events and gatherings.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <h2 className="text-lg font-bold text-white mb-3">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-amber-400 transition-colors">Menu</Link></li>
              <li><Link href="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact</Link></li>
            </ul>
          </nav>
          <div>
            <h2 className="text-lg font-bold text-white mb-3">Contact</h2>
            <address className="not-italic text-sm space-y-1">
              <p>123 Flavor Street, Foodtown, CA 90210</p>
              <p>
                <a href="tel:+15551234567" className="hover:text-amber-400 transition-colors">(555) 123-4567</a>
              </p>
              <p>
                <a href="mailto:hello@mamaskitchen.com" className="hover:text-amber-400 transition-colors">hello@mamaskitchen.com</a>
              </p>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Mama&apos;s Kitchen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
