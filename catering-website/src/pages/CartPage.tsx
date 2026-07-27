import CartView from "../components/CartView";
import { usePageTitle } from "../hooks/usePageTitle";

export default function CartPage() {
  usePageTitle("Your Cart");
  return <CartView />;
}
