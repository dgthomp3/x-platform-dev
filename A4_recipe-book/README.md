# Recipe Book App

**Team Members**:  
- Dallas Thompson III  

---

## 📱 App Overview

The Recipe Book App allows users to submit and browse recipes by cuisine, difficulty, or keyword. Designed to help aspiring chefs and home cooks organize and explore meals, this app demonstrates full-stack development using a **React Native frontend** and **PHP backend APIs**

---

## ⚛️ Front-End (React Native + TypeScript)

### Main Features:
- **Submit Recipe** – Floating Action Button (FAB) opens a modal form to submit new recipes.
- **View All Recipes** – Displays a scrollable list of submitted recipes using reusable cards.
- **Search by Ingredient** – Users can search recipes by keyword using a dynamic search bar.
- **Filter by Cuisine** – Displays recipes filtered by cuisine type (e.g., Italian, Thai).
- **Filter by Difficulty** – Displays recipes filtered by difficulty level (e.g., Easy, Hard).

### Components & Structure:
- `HomeScreen.tsx` – Handles recipe display, search input, and refresh after submission.
- `SubmitRecipeComponent.tsx` – FAB and modal form for submitting recipes.
- `SearchBar.tsx` – Reusable search input component.
- `ViewAllRecipesScreen.tsx` – Recipe list display using FlatList and custom cards.
- `RecipeCard.tsx` – Reusable UI component for individual recipe entries.

### Tech Stack:
- React Native (Expo)
- TypeScript
- React Navigation
- SafeAreaView + Modal + FlatList

---

## 🖥️ Backend APIs (PHP)

### POST:
- `submitRecipe.php` – Accepts recipe form data and saves it as a JSON file in a `recipes/` directory.

### GET:
- `getAllRecipes.php` – Returns all stored recipes.
- `getRecipesByCuisine.php?cuisine=Thai` – Filters recipes by cuisine.
- `getRecipesByDifficulty.php?level=Easy` – Filters recipes by difficulty.
- `searchRecipes.php?ingredient=chicken` – Returns recipes containing a specific ingredient.

> All responses use `application/json` format for compatibility with the mobile frontend.