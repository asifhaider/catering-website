import Link from "next/link";
import type { FoodItem } from "@/lib/types";
import { formatCurrency } from "@/lib/dates";
import { categoryLabels } from "@/lib/menu-data";

interface FoodItemDetailProps {
  item: FoodItem;
  cateringDate: string;
}

const nutritionRows: { key: keyof FoodItem["nutrition"]; label: string }[] = [
  { key: "servingSize", label: "Serving size" },
  { key: "calories", label: "Calories" },
  { key: "totalFat", label: "Total fat" },
  { key: "saturatedFat", label: "Saturated fat" },
  { key: "cholesterol", label: "Cholesterol" },
  { key: "sodium", label: "Sodium" },
  { key: "totalCarbohydrate", label: "Total carbohydrate" },
  { key: "dietaryFiber", label: "Dietary fiber" },
  { key: "sugars", label: "Sugars" },
  { key: "protein", label: "Protein" },
];

export default function FoodItemDetail({
  item,
  cateringDate,
}: FoodItemDetailProps) {
  const backHref = `/#menu-list`;
  const priceLabel = `${formatCurrency(item.pricePerPortion)} per portion`;

  return (
    <article className="food-item-detail" aria-labelledby="food-detail-heading">
      <p style={{ marginBottom: "1rem" }}>
        <Link href={backHref} className="button button-brand">
          Back to menu
        </Link>
      </p>

      <div className="detail-layout">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.imageAlt}
          className="detail-image"
        />

        <div>
          <p className="section-lede" style={{ marginBottom: "0.35rem" }}>
            {categoryLabels[item.category]}
            {cateringDate ? ` · Pickup ${cateringDate}` : ""}
          </p>
          <h1 id="food-detail-heading" className="section-heading">
            {item.name}
          </h1>
          <p className="food-card-price" style={{ fontSize: "1.25rem" }}>
            {priceLabel}
          </p>
          <p className="section-lede">{item.description}</p>

          <section aria-labelledby="ingredients-heading">
            <h2 id="ingredients-heading" className="menu-category-heading">
              Ingredients
            </h2>
            <ul className="ingredient-list">
              {item.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <section
        aria-labelledby="nutrition-heading"
        style={{ marginTop: "2rem" }}
      >
        <h2 id="nutrition-heading" className="menu-category-heading">
          Nutrition facts
        </h2>
        <div className="nutrition-scroll">
          <table className="nutrition-table">
            <caption className="visually-hidden">
              Nutrition facts for {item.name}
            </caption>
            <thead>
              <tr>
                <th scope="col">Nutrient</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {nutritionRows.map((row) => (
                <tr key={row.key}>
                  <th scope="row">{row.label}</th>
                  <td>{String(item.nutrition[row.key])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
