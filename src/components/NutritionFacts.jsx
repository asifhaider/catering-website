import React from "react";

export default function NutritionFacts({ nutrition }) {
  const n = nutrition;
  return (
    <div className="nutrition-facts" role="region" aria-label="Nutrition Facts">
      <div className="nf-title">Nutrition Facts</div>
      <div className="nf-serving">{n.servingSize}</div>
      <div className="nf-calories-row">
        <span className="nf-calories-label">Calories</span>
        <span className="nf-calories-value">{n.calories}</span>
      </div>
      <div className="nf-dv-header">% Daily Value*</div>
      <div className="nf-row">
        <span className="nf-row-name">Total Fat <span>{n.totalFat.amount}g</span></span>
        <span className="nf-dv">{n.totalFat.dv}%</span>
      </div>
      <div className="nf-row nf-row-indent">
        <span>Saturated Fat <span style={{fontWeight:400}}>{n.saturatedFat.amount}g</span></span>
        <span className="nf-dv">{n.saturatedFat.dv}%</span>
      </div>
      <div className="nf-row nf-row-indent">
        <span>Trans Fat <span style={{fontWeight:400}}>0g</span></span>
        <span></span>
      </div>
      <div className="nf-row">
        <span className="nf-row-name">Cholesterol <span>{n.cholesterol.amount}mg</span></span>
        <span className="nf-dv">{n.cholesterol.dv}%</span>
      </div>
      <div className="nf-row">
        <span className="nf-row-name">Sodium <span>{n.sodium.amount}mg</span></span>
        <span className="nf-dv">{n.sodium.dv}%</span>
      </div>
      <div className="nf-row">
        <span className="nf-row-name">Total Carbohydrate <span>{n.totalCarbs.amount}g</span></span>
        <span className="nf-dv">{n.totalCarbs.dv}%</span>
      </div>
      <div className="nf-row nf-row-indent">
        <span>Dietary Fiber <span style={{fontWeight:400}}>{n.fiber.amount}g</span></span>
        <span className="nf-dv">{n.fiber.dv}%</span>
      </div>
      <div className="nf-row nf-row-indent">
        <span>Total Sugars <span style={{fontWeight:400}}>{n.sugars.amount}g</span></span>
        <span></span>
      </div>
      <div className="nf-row" style={{borderBottom: "4px solid currentColor"}}>
        <span className="nf-row-name">Protein <span>{n.protein.amount}g</span></span>
        <span></span>
      </div>
      <div className="nf-footer">
        *Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.
      </div>
    </div>
  );
}
