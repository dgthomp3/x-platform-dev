import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { getRecipesByCuisine } from '../../../backend/api/recipes';
import RecipeCard from '../components/RecipeCard';

export default function FilterByCuisineScreen() {
  const [cuisine, setCuisine] = useState('');
  const [recipes, setRecipes] = useState<any[]>([]);

  const handleSearch = async () => {
    try {
      const data = await getRecipesByCuisine(cuisine);
      setRecipes(data);
    } catch (err) {
      console.error('Failed to fetch recipes by cuisine:', err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter cuisine (e.g. Italian, Indian)"
        value={cuisine}
        onChangeText={setCuisine}
        style={styles.input}
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  list: {
    paddingTop: 8,
  },
});