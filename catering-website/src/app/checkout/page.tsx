import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Hearth & Plate catering pickup order.",
};

export default function CheckoutPage() {
  return (
    <div className="page-shell" style={{ paddingTop: "2rem" }}>
      <CheckoutForm />
    </div>
  );
}
