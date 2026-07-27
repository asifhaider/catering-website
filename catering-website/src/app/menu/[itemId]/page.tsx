import { Suspense } from "react";
import { notFound } from "next/navigation";
import FoodItemPageContent from "@/components/FoodItemPageContent";
import { getFoodItemById, menusByWeekday } from "@/lib/menu-data";

interface PageProps {
  params: Promise<{ itemId: string }>;
}

export function generateStaticParams() {
  const ids = new Set<string>();
  for (const items of Object.values(menusByWeekday)) {
    for (const item of items) ids.add(item.id);
  }
  return Array.from(ids, (itemId) => ({ itemId }));
}

export async function generateMetadata({ params }: PageProps) {
  const { itemId } = await params;
  const item = getFoodItemById(itemId);
  if (!item) {
    return { title: "Dish not found" };
  }
  return {
    title: item.name,
    description: item.description,
  };
}

export default async function FoodItemPage({ params }: PageProps) {
  const { itemId } = await params;
  const item = getFoodItemById(itemId);

  if (!item) {
    notFound();
  }

  return (
    <Suspense fallback={null}>
      <FoodItemPageContent item={item} />
    </Suspense>
  );
}
