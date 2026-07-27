import type { Metadata } from "next";
import CartView from "@/components/CartView";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review and update your Hearth & Plate catering order.",
};

export default function CartPage() {
  return (
    <div className="page-shell" style={{ paddingTop: "2rem" }}>
      <CartView />
    </div>
  );
}
