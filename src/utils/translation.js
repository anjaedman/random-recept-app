// ===============================
// INGREDIENS-ÖVERSÄTTNINGAR
// ===============================
export const ingredientTranslations = {
    Beef: "Nötkött",
    Chicken: "Kyckling",
    Pork: "Fläskkött",
    Lamb: "Lamm",
    Veal: "Kalv",
    Turkey: " Kalkon",
    Duck: "Anka",
    Fish: "Fisk",
    Salmon: "Lax",
    Tuna: "Tonfisk",
    Shrimp: "Räkor",
    Prawn: "Räka",
    Crab: "Krabba",
    Mussels: "Musslor",

    Onion: "Lök",
    Shallot: "Schalottenlök",
    SpringOnion: "Salladslök",
    Leek: "Purjolök",
    Garlic: "Vitlök",

    Carrot: "Morot",
    Potato: "Potatis",
    Tomato: "Tomat",
    Cucumber: "Gurka",
    Zucchini: "Zucchini",
    Eggplant: "Aubergine",
    BellPepper: "Paprika",
    Pepper: "Peppar",
    Chili: "Chili",
    Spinach: "Spenat",
    Kale: "Grönkål",
    Lettuce: "Sallad",
    Cabbage: "Kål",
    Cauliflower: "Blomkål",
    Broccoli: "Broccoli",
    Peas: "Ärter",
    Corn: "Majs",
    Mushroom: "Svamp",
    Mushrooms: "Svamp",

    Rice: "Ris",
    Pasta: "Pasta",
    Noodles: "Nudlar",
    Bread: "Bröd",
    Tortilla: "Tortilla",

    Egg: "Ägg",
    Eggs: "Ägg",
    Milk: "Mjölk",
    Cream: "Grädde",
    SourCream: "Gräddfil",
    Yogurt: "Yoghurt",
    Cheese: "Ost",
    Parmesan: "Parmesan",
    Mozzarella: "Mozzarella",
    Butter: "Smör",

    Flour: "Mjöl",
    Sugar: "Socker",
    BrownSugar: "Farinsocker",
    PowderedSugar: "Florsocker",
    Salt: "Salt",
    BakingPowder: "Bakpulver",
    BakingSoda: "Bikarbonat",
    Yeast: "Jäst",
    Cocoa: "Kakao",
    Chocolate: "Choklad",
    Vanilla: "Vanilj",
    Honey: "Honung",
    Syrup: "Sirap",

    Oil: "Olja",
    OliveOil: "Olivolja",
    VegetableOil: "Matolja",
    SunflowerOil: "Solrosolja",
    SesameOil: "Sesamolja",
    SoySauce: "Sojasås",
    Vinegar: "Vinäger",
    BalsamicVinegar: "Balsamvinäger",
    WorcestershireSauce: "Worcestershiresås",
    Mustard: "Senap",
    Mayonnaise: "Majonnäs",
    Ketchup: "Ketchup",

    Parsley: "Persilja",
    Cilantro: "Koriander",
    Coriander: "Koriander",
    Basil: "Basilika",
    Thyme: "Timjan",
    Rosemary: "Rosmarin",
    Oregano: "Oregano",
    Dill: "Dill",
    Mint: "Mynta",
    Cumin: "Spiskummin",
    Paprika: "Paprikapulver",
    Turmeric: "Gurkmeja",
    Ginger: "Ingefära",
    Cinnamon: "Kanel",
    Nutmeg: "Muskot",
};

// Hjälpare: försök översätta generellt om exakt nyckel saknas (enkelt)
function translateIngredientWord(word) {
    if (!word) return "";
    const key = word.replace(/\s+/g, ""); // Onion → Onion, "Bell Pepper" → BellPepper
    return ingredientTranslations[key] || word;
}

// ===============================
// MÅTT-OMVANDLING TILL: dl, msk, tsk, g
// ===============================

// Ersätt vanliga unicode-bråktal → textbråk
function normalizeFractions(str) {
    return String(str)
        .replace(/½/g, "1/2")
        .replace(/¼/g, "1/4")
        .replace(/¾/g, "3/4")
        .replace(/⅓/g, "1/3")
        .replace(/⅔/g, "2/3");
}

// Försök läsa ut ett tal (t.ex. "1 1/2", "2.5", "3/4")
function extractAmount(measure) {
    const s = normalizeFractions(measure).trim();

    // range? (1-2 tsp) → lämna orört
    if (/\d+\s*-\s*\d+/.test(s)) return null;

    // matcha "1 1/2" / "1/2" / "2.5"
    const m = s.match(/(\d+\s+\d+\/\d+|\d+\/\d+|\d+(\.\d+)?)/);
    if (!m) return null;

    const token = m[1];

    if (/\d+\s+\d+\/\d+/.test(token)) {
        // "1 1/2" → 1 + 1/2
        const [whole, frac] = token.split(/\s+/);
        const [a, b] = frac.split("/").map(Number);
        return Number(whole) + a / b;
    }
    if (/\d+\/\d+/.test(token)) {
        const [a, b] = token.split("/").map(Number);
        return a / b;
    }
    return Number(token);
}

// Slå ut enheten från strängen
function unitToken(measure) {
    const s = normalizeFractions(measure).toLowerCase();
    // plocka ut textdel efter siffra
    const m = s.match(/(?:\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:\.\d+)?)(.*)/);
    const tail = (m ? m[1] : s).trim();

    // normalisera
    return tail
        .replace(/\./g, "")
        .replace(/^\s*of\s+/, "") // "of"
        .replace(/\s+/g, " ");
}

// Konvertera till önskade svenska enheter
export function convertMeasure(measure) {
    if (!measure) return "";

    const raw = measure.trim();
    const s = normalizeFractions(raw).toLowerCase();

    // Fraser utan mängd
    if (s.includes("to taste")) return "efter smak";
    if (s.includes("pinch")) return "en nypa";
    if (s.includes("dash")) return "en skvätt";

    const amount = extractAmount(s);
    const unit = unitToken(s);

    // Om vi inte kan tolka mängd → lämna som original (lätt städad)
    if (amount == null && !/ml|l|cup|cups|tbsp|tablespoon|tsp|teaspoon|oz|ounce|lb|pint|quart|g|kg/.test(unit))
        return raw;

    const round = (val, n = 1) =>
        (Math.round(val * Math.pow(10, n)) / Math.pow(10, n)).toFixed(n).replace(/\.0$/, "");

    // Enhetskonverteringar
    // Volym → dl, msk, tsk
    const toDl = (valInDl) => `${round(valInDl)} dl`;
    const toMsk = (valInMsk) => `${round(valInMsk)} msk`;
    const toTsk = (valInTsk) => `${round(valInTsk)} tsk`;

    // Vikt → g
    const toG = (valInG) => `${Math.round(valInG)} g`;

    // Kända enheter
    if (/ml/.test(unit)) {
        // 100 ml = 1 dl
        if (amount == null) return raw;
        return toDl(amount / 100);
    }
    if (/\bl\b|litre|liter/.test(unit)) {
        if (amount == null) return raw;
        return toDl(amount * 10); // 1 L = 10 dl
    }
    if (/cup|cups/.test(unit)) {
        if (amount == null) return raw;
        return toDl(amount * 2.4); // 1 cup ≈ 2.4 dl
    }
    if (/tbsp|tablespoon/.test(unit)) {
        if (amount == null) return raw;
        return toMsk(amount * 1.5); // 1 tbsp ≈ 1.5 msk
    }
    if (/tsp|teaspoon/.test(unit)) {
        if (amount == null) return raw;
        return toTsk(amount * 1); // 1 tsp ≈ 1 tsk
    }
    if (/pint|pints/.test(unit)) {
        if (amount == null) return raw;
        return toDl(amount * 4.7);
    }
    if (/quart|quarts/.test(unit)) {
        if (amount == null) return raw;
        return toDl(amount * 9.5);
    }

    // Vikt
    if (/\bkg\b|kilogram/.test(unit)) {
        if (amount == null) return raw;
        return toG(amount * 1000);
    }
    if (/\bg\b|gram/.test(unit)) {
        if (amount == null) return raw;
        return toG(amount);
    }
    if (/lb|pound/.test(unit)) {
        if (amount == null) return raw;
        return toG(amount * 454); // 1 lb ≈ 454 g
    }
    if (/oz|ounce/.test(unit)) {
        if (amount == null) return raw;
        return toG(amount * 28); // 1 oz ≈ 28 g
    }

    // Ingen känd enhet men det fanns mängd → lämna originalet
    return raw;
}

// ===============================
// INSTRUKTIONS-ÖVERSÄTTNING (ord + fraser)
// ===============================

const phraseMap = [
    // Vanliga fraser
    [/preheat the oven to/gi, "förvärm ugnen till"],
    [/bring to a boil/gi, "koka upp"],
    [/reduce heat to low/gi, "sänk värmen till låg"],
    [/reduce heat and simmer/gi, "sänk värmen och sjud"],
    [/simmer until/gi, "sjud tills"],
    [/let it rest/gi, "låt vila"],
    [/set aside/gi, "ställ åt sidan"],
    [/season to taste/gi, "smaka av"],
    [/serve immediately/gi, "servera genast"],
    [/serve warm/gi, "servera varm"],
    [/serve cold/gi, "servera kall"],
    [/heat oil in a (?:large )?pan/gi, "hetta upp olja i en (stor) panna"],
    [/heat a pan over medium heat/gi, "hetta upp en panna på medelvärme"],
    [/grease (?:a )?baking (?:tray|sheet|pan)/gi, "smöra en bakplåt/form"],
    [/line (?:a )?baking (?:tray|sheet|pan) with parchment paper/gi, "klä en plåt/form med bakplåtspapper"],
    [/bake for (\d+)\s*minutes?/gi, "grädda i $1 minuter"],
    [/cook for (\d+)\s*minutes?/gi, "tillaga i $1 minuter"],
    [/marinate for (\d+)\s*minutes?/gi, "marinera i $1 minuter"],

    // Verb + korta uttryck
    [/stir-fry/gi, "woka"],
    [/stir/gi, "rör om"],
    [/mix/gi, "blanda"],
    [/combine/gi, "blanda samman"],
    [/whisk/gi, "vispa"],
    [/beat/gi, "vispa"],
    [/fold/gi, "vänd ner"],
    [/knead/gi, "knåda"],
    [/blend/gi, "mixa"],
    [/puree|purée/gi, "puréa"],

    [/cook/gi, "tillaga"],
    [/fry/gi, "stek"],
    [/deep[- ]?fry/gi, "fritera"],
    [/bake/gi, "grädda"],
    [/roast/gi, "rosta/ugnslaga"],
    [/grill/gi, "grilla"],
    [/broil/gi, "gratinera"],
    [/steam/gi, "ångkoka"],
    [/boil/gi, "koka"],
    [/simmer/gi, "sjuda"],
    [/sear/gi, "bryn"],
    [/saute|sauté/gi, "fräs"],

    [/add/gi, "tillsätt"],
    [/pour/gi, "häll i"],
    [/drizzle/gi, "ringla över"],
    [/sprinkle/gi, "strö över"],
    [/season/gi, "krydda"],
    [/taste/gi, "smaka av"],
    [/garnish/gi, "garnera"],
    [/serve/gi, "servera"],

    // Råvaruord i instruktioner (kompletterar ingredienslistan)
    [/onion/gi, "lök"],
    [/garlic/gi, "vitlök"],
    [/ginger/gi, "ingefära"],
    [/carrot/gi, "morot"],
    [/potato/gi, "potatis"],
    [/tomato/gi, "tomat"],
    [/pepper/gi, "peppar"],
    [/chili/gi, "chili"],
    [/butter/gi, "smör"],
    [/milk/gi, "mjölk"],
    [/cream/gi, "grädde"],
    [/yogurt/gi, "yoghurt"],
    [/cheese/gi, "ost"],
    [/flour/gi, "mjöl"],
    [/sugar/gi, "socker"],
    [/salt/gi, "salt"],
    [/oil/gi, "olja"],
    [/water/gi, "vatten"],
    [/vinegar/gi, "vinäger"],
    [/soy sauce/gi, "sojasås"],
    [/worcestershire sauce/gi, "worcestershiresås"],
    [/lemon/gi, "citron"],
    [/lime/gi, "lime"],
    [/herbs/gi, "örter"],

    // Tillagningsdetaljer
    [/until (?:tender|soft)/gi, "tills mjuk"],
    [/until golden( brown)?/gi, "tills gyllene"],
    [/until cooked through/gi, "tills genomstekt"],
    [/until reduced/gi, "tills det reducerats"],
    [/until thickened/gi, "tills det tjocknat"],
    [/over medium(-| )heat/gi, "på medelvärme"],
    [/over low(-| )heat/gi, "på låg värme"],
    [/over high(-| )heat/gi, "på hög värme"],
];

// Kör fras/ordsättning i följd
export function translateInstructions(text) {
    if (!text) return "";
    let out = text;
    for (const [re, sv] of phraseMap) {
        out = out.replace(re, sv);
    }
    // Liten efterstädning: dubbla mellanslag, mellanslag före skiljetecken
    out = out.replace(/\s{2,}/g, " ").replace(/\s+([,.!?;:])/g, "$1");
    return out;
}
