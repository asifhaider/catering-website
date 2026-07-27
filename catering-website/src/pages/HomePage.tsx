import { useMemo, useState } from "react";
import MenuDatePicker from "../components/MenuDatePicker";
import MenuList from "../components/MenuList";
import ItemDetail from "../components/ItemDetail";
import { fromDateInputValue, isPickupDateInRange } from "../data/orderRules";
import { getMenuForDate } from "../data/menuData";
import { usePageTitle } from "../hooks/usePageTitle";
import type { FoodItem } from "../types";

export default function HomePage() {
  usePageTitle("Order Catering");
  const [pickupDate, setPickupDate] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);

  const selectedDate = pickupDate ? fromDateInputValue(pickupDate) : null;
  const isValidDate = selectedDate ? isPickupDateInRange(selectedDate) : false;
  const dayMenu = useMemo(() => (selectedDate && isValidDate ? getMenuForDate(selectedDate) : null), [selectedDate, isValidDate]);

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setQuantities((current) => ({ ...current, [itemId]: quantity }));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Order Catering</h1>
      <MenuDatePicker value={pickupDate} onChange={setPickupDate} />
      {dayMenu && (
        <MenuList
          items={dayMenu.items}
          quantities={quantities}
          pickupDate={isValidDate ? pickupDate : null}
          onQuantityChange={handleQuantityChange}
          onViewDetails={setSelectedItem}
        />
      )}
      <ItemDetail
        item={selectedItem}
        quantity={selectedItem ? (quantities[selectedItem.id] ?? 1) : 1}
        pickupDate={isValidDate ? pickupDate : null}
        onQuantityChange={(quantity) => selectedItem && handleQuantityChange(selectedItem.id, quantity)}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
