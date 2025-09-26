import { useState } from "react";

function FrontFood() {
  const [meal, setMeal] = useState(null);

  const fetchRandomMeal = async () => {
    try {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const data = await res.json();
      setMeal(data.meals[0]);
    } catch (err) {
      console.error("Error fetching meal:", err);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Vet du inte vad du skall äta?</h1>
      <button onClick={fetchRandomMeal}>Här är ett förslag! Klicka mig!</button>

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

export default FrontFood;
