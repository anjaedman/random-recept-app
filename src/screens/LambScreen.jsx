import { useState } from "react";

function Lamb() {
  const [meal, setMeal] = useState(null);

  const fetchRandomLamb = async () => {
    try {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/filter.php?c=Lamb"
      );
      const data = await res.json();
      const randomMeal =
        data.meals[Math.floor(Math.random() * data.meals.length)];

      const detailRes = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomMeal.idMeal}`
      );
      const detailData = await detailRes.json();
      setMeal(detailData.meals[0]);
    } catch (err) {
      console.error("Error fetching Lamb meal:", err);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>LAMM</h1>
      <button onClick={fetchRandomLamb}>Förslag på en Lamm-rätt</button>

      {meal && (
        <div style={{ marginTop: "2rem" }}>
          <h2>{meal.strMeal}</h2>
          <img src={meal.strMealThumb} width="300" />
          <h3>Ingredienser</h3>
          <ul>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
              const ingredient = meal[`strIngredient${i}`];
              const measure = meal[`strMeasure${i}`];
              return ingredient ? (
                <li key={i}>
                  {ingredient} - {measure}
                </li>
              ) : null;
            })}
          </ul>
          <h3>Instruktioner</h3>
          <p style={{ maxWidth: "600px", margin: "auto" }}>
            {meal.strInstructions}
          </p>
        </div>
      )}
    </div>
  );
}

export default Lamb;
