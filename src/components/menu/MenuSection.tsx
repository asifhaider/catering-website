import type { FoodItem, FoodCategory } from '../../types';
import FoodCard from './FoodCard';

const sectionConfig: Record<FoodCategory, { label: string; description: string; headingColor: string }> = {
  protein: {
    label: 'Protein Dishes',
    description: '5 dishes',
    headingColor: 'text-terracotta-600',
  },
  vegetarian: {
    label: 'Vegetarian Dishes',
    description: '3 dishes',
    headingColor: 'text-sage-600',
  },
  side: {
    label: 'Sides',
    description: '2 dishes',
    headingColor: 'text-stone-600',
  },
};

interface MenuSectionProps {
  category: FoodCategory;
  items: FoodItem[];
  onOpenDetail: (item: FoodItem) => void;
  sectionId: string;
}

export default function MenuSection({ category, items, onOpenDetail, sectionId }: MenuSectionProps) {
  const config = sectionConfig[category];
  const headingId = `${sectionId}-heading`;

  return (
    <section aria-labelledby={headingId} className="mb-10">
      <div className="flex items-baseline gap-3 mb-4">
        <h2
          id={headingId}
          className={`text-xl font-bold font-display ${config.headingColor}`}
        >
          {config.label}
        </h2>
        <span className="text-sm text-stone-500">{config.description}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <FoodCard key={item.id} item={item} onOpenDetail={onOpenDetail} />
        ))}
      </div>
    </section>
  );
}
