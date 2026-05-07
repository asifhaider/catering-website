// SC 1.3.1 Info and Relationships — semantic table with caption, scope
export default function NutritionTable({ item }) {
  const n = item.nutrition

  return (
    <div className="nutrition-table-wrap">
      <table className="nutrition-table">
        <caption>
          Nutrition Facts for {item.name}{' '}
          <abbr title="per serving">/ serving</abbr>
        </caption>
        <tbody>
          <tr>
            <th scope="row">
              <abbr title="Calories">Cal</abbr>
            </th>
            <td>{n.calories} kcal</td>
          </tr>
          <tr>
            <th scope="row">Protein</th>
            <td>{n.protein} g</td>
          </tr>
          <tr>
            <th scope="row">Carbohydrates</th>
            <td>{n.carbs} g</td>
          </tr>
          <tr>
            <th scope="row">Total Fat</th>
            <td>{n.fat} g</td>
          </tr>
          <tr>
            <th scope="row">Dietary Fiber</th>
            <td>{n.fiber} g</td>
          </tr>
          <tr>
            <th scope="row">Sodium</th>
            <td>{n.sodium} mg</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
