import type { Metadata } from "next";
import ContactPageContent from "@/components/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Hearth & Plate by phone, email, social media, or message form.",
};

export default function ContactPage() {
  return (
    <div className="page-shell" style={{ paddingTop: "2rem" }}>
      <ContactPageContent />
    </div>
  );
}
