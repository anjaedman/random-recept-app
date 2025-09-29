import { useState } from "react";
import {
  ingredientTranslations,
  convertMeasure,
  translateInstructions,
} from "../utils/translations";

async function fetchRandomFromCategory(category, setMeal) {
  const list = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
      category
    )}`
  ).then((r) => r.json());
  const random = list.meals[Math.floor(Math.random() * list.meals.length)];
  const full = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${random.idMeal}`
  ).then((r) => r.json());
  setMeal(full.meals[0]);
}

function Chicken() {
  const [meal, setMeal] = useState(null);

  return (
    <>
      <section className="hero">
        <h1>KYCKLING</h1>
        <button
          className="btn-primary"
          onClick={() => fetchRandomFromCategory("Chicken", setMeal)}
        >
          Förslag på en Kyckling-rätt
        </button>
      </section>

      {meal && (
        <article className="meal-container">
          <h2>{meal.strMeal}</h2>
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          <div className="ingredients">
            <h3>Ingredienser</h3>
            <ul>
              {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
                const ing = meal[`strIngredient${i}`];
                const msr = meal[`strMeasure${i}`];
                if (!ing) return null;
                return (
                  <li key={i}>
                    <span className="ing-name">
                      {ingredientTranslations[ing] || ing}
                    </span>
                    <span className="ing-measure">{convertMeasure(msr)}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="instructions">
            <h3>Instruktioner</h3>
            <p>{translateInstructions(meal.strInstructions)}</p>
          </div>
        </article>
      )}
    </>
  );
}

export default Chicken;
