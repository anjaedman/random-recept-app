// Enkel ordlista för ingredienser → svenska
export const ingredientTranslations = {
    Beef: "Nötkött",
    Chicken: "Kyckling",
    Onion: "Lök",
    Garlic: "Vitlök",
    Carrot: "Morot",
    Pork: "Fläskkött",
    Lamb: "Lamm",
    Potato: "Potatis",
    Tomato: "Tomat",
    Salt: "Salt",
    Pepper: "Peppar",
    Egg: "Ägg",
    Sugar: "Socker",
    Flour: "Mjöl",
};

// Omvandla engelska mått till svenska enheter
export function convertMeasure(measure) {
    if (!measure) return "";

    const lower = measure.toLowerCase();

    // Cups → dl (1 cup ≈ 2.4 dl)
    if (lower.includes("cup")) {
        const num = parseFloat(lower) || 1;
        return `${(num * 2.4).toFixed(1)} dl`;
    }

    // Tablespoon → msk (1 tbsp ≈ 1.5 msk)
    if (lower.includes("tbsp")) {
        const num = parseFloat(lower) || 1;
        return `${(num * 1.5).toFixed(1)} msk`;
    }

    // Teaspoon → tsk (1 tsp ≈ 5 ml ≈ 1 tsk)
    if (lower.includes("tsp")) {
        const num = parseFloat(lower) || 1;
        return `${num.toFixed(1)} tsk`;
    }

    // Ounces → gram (1 oz ≈ 28 g)
    if (lower.includes("oz")) {
        const num = parseFloat(lower) || 1;
        return `${(num * 28).toFixed(0)} g`;
    }

    return measure; // lämna som original om vi inte vet
}

// Enkel översättning av instruktioner
export function translateInstructions(text) {
    if (!text) return "";
    return text
        .replace(/onion/gi, "lök")
        .replace(/garlic/gi, "vitlök")
        .replace(/stir/gi, "rör om")
        .replace(/mix/gi, "blanda")
        .replace(/cook/gi, "tillaga")
        .replace(/fry/gi, "stek")
        .replace(/boil/gi, "koka");
}