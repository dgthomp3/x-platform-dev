# Recipe Book App

**Team Members**:  
- Dallas Thompson III  

---

## App Overview

The Recipe Book App allows users to submit and browse recipes by cuisine, difficulty, or keyword. Designed to help aspiring chefs and home cooks organize and explore meals, this app demonstrates full-stack development using a React Native frontend and PHP backend APIs, with optional MySQL integration.

---

## Front-End (React Native + TypeScript)

### Screens:
- **Submit Recipe** – Form to add new recipes.
- **View All Recipes** – Displays all submitted recipes.
- **Filter by Cuisine** – View recipes by cuisine type.
- **Filter by Difficulty** – View recipes by difficulty level.
- *(Optional)* **Search by Ingredient**

### Tech Stack:
- React Native (via Expo)
- React Navigation
- TypeScript

---

## Backend APIs (PHP)

### POST:
- `submitRecipe.php`: Accepts recipe form data and stores it.

### GET: ✅ *(2+ for assignment requirement)*
- `getAllRecipes.php`
- `getRecipesByCuisine.php?cuisine=Thai`
- `getRecipesByDifficulty.php?level=Easy`
- *(Optional)* `searchRecipes.php?ingredient=chicken`

---

## 💾 Optional: Database Schema (MySQL)

```sql
CREATE TABLE recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100),
  title VARCHAR(255),
  ingredients TEXT,
  instructions TEXT,
  cuisine VARCHAR(50),
  difficulty VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```