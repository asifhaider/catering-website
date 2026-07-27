import type { Metadata } from "next";
import AboutPageContent from "@/components/AboutPageContent";

export const metadata: Metadata = {
  title: "About Hearth & Plate",
  description:
    "Learn about Hearth & Plate homemade catering, our kitchen story, and how pickup orders work.",
};

export default function AboutPage() {
  return (
    <div className="page-shell" style={{ paddingTop: "2rem" }}>
      <AboutPageContent />
    </div>
  );
}
