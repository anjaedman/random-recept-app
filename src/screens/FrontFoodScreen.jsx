import { useState } from "react";
import {
  ingredientTranslations,
  convertMeasure,
  translateInstructions,
} from "../utils/translations";

function FrontFood() {
  const [meal, setMeal] = useState(null);

  const fetchRandomMeal = async () => {
    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const data = await res.json();
    setMeal(data.meals[0]);
  };

  return (
    <>
      <section className="hero">
        <h1>Vet du inte vad du skall äta?</h1>
        <button className="btn-primary" onClick={fetchRandomMeal}>
          Här är ett förslag! Klicka mig!
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
export default FrontFood;
