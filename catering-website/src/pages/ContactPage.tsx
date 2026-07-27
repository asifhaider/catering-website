import ContactForm from "../components/ContactForm";
import { usePageTitle } from "../hooks/usePageTitle";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/homesteadcateringco" },
  { label: "Facebook", href: "https://facebook.com/homesteadcateringco" },
  { label: "X (Twitter)", href: "https://x.com/homesteadcatering" },
];

export default function ContactPage() {
  usePageTitle("Contact");
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-brand-900">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section aria-labelledby="reach-us-heading" className="space-y-4">
          <h2 id="reach-us-heading" className="text-xl font-bold text-brand-900">
            Reach us directly
          </h2>
          <p className="text-brand-800">
            Phone:{" "}
            <a href="tel:+16125550142" className="text-brand-700 underline hover:text-brand-900">
              (612) 555-0142
            </a>
          </p>
          <p className="text-brand-800">
            Email:{" "}
            <a href="mailto:orders@homesteadcatering.example" className="text-brand-700 underline hover:text-brand-900">
              orders@homesteadcatering.example
            </a>
          </p>

          <div>
            <h3 className="font-semibold text-brand-900 mb-2">Follow us</h3>
            <ul className="list-none p-0 m-0 space-y-1">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-700 underline hover:text-brand-900"
                  >
                    {social.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="contact-form-heading" className="space-y-4">
          <h2 id="contact-form-heading" className="text-xl font-bold text-brand-900">
            Send us a message
          </h2>
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
