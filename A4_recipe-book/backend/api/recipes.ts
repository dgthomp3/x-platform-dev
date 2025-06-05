const API_BASE_URL = 'https://www.cs.drexel.edu/~dgt38/recipe-api/A4_recipe-book/backend';

export async function submitRecipe(data: {
  username: string;
  title: string;
  ingredients: string;
  instructions: string;
  cuisine: string;
  difficulty: string;
}) {
  const response = await fetch(`${API_BASE_URL}/submitRecipe.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(data).toString(),
  });
  return response.json();
}

export async function getAllRecipes() {
  const response = await fetch(`${API_BASE_URL}/getAllRecipes.php`);
  return response.json();
}

export async function getRecipesByCuisine(cuisine: string) {
  const response = await fetch(`${API_BASE_URL}/getRecipesByCuisine.php?cuisine=${encodeURIComponent(cuisine)}`);
  return response.json();
}

export async function getRecipesByDifficulty(level: string) {
  const response = await fetch(`${API_BASE_URL}/getRecipesByDifficulty.php?level=${encodeURIComponent(level)}`);
  return response.json();
}

export async function searchRecipesByIngredient(ingredient: string) {
  const response = await fetch(`${API_BASE_URL}/searchRecipes.php?ingredient=${encodeURIComponent(ingredient)}`);
  return response.json();
}
