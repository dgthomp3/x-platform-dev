import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { getAllRecipes, searchRecipesByIngredient } from '../api/recipes';
import ViewAllRecipesScreen from './ViewAllRecipesScreen';
import SearchBar from '../components/SearchBar';
import SubmitRecipeComponent from '../components/SubmitRecipeComponent';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState<any[]>([]);

  const fetchAllRecipes = async () => {
    try {
      const data = await getAllRecipes();
      setRecipes(data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  const handleSearch = async () => {
    Keyboard.dismiss();
    if (!query.trim()) {
      fetchAllRecipes();
    } else {
      try {
        const data = await searchRecipesByIngredient(query);
        setRecipes(data);
      } catch (err) {
        console.error('Search error:', err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      <ViewAllRecipesScreen recipes={recipes} />
      <SubmitRecipeComponent onSubmitSuccess={fetchAllRecipes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
