"use client";

import { useSearchParams } from "next/navigation";
import AddToCart from "@/components/AddToCart";
import FoodItemDetail from "@/components/FoodItemDetail";
import { getDefaultPickupDateValue } from "@/lib/dates";
import type { FoodItem } from "@/lib/types";

interface FoodItemPageContentProps {
  item: FoodItem;
}

export default function FoodItemPageContent({ item }: FoodItemPageContentProps) {
  const searchParams = useSearchParams();
  const cateringDate = searchParams.get("date") || getDefaultPickupDateValue();

  return (
    <div className="page-shell" style={{ paddingTop: "2rem" }}>
      <div className="section-panel">
        <FoodItemDetail item={item} cateringDate={cateringDate} />
      </div>
      <AddToCart item={item} cateringDate={cateringDate} />
    </div>
  );
}
