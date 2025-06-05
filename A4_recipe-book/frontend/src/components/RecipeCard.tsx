import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RecipeCard({ recipe }: { recipe: any }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.meta}>By {recipe.username}</Text>
      <Text style={styles.meta}>Cuisine: {recipe.cuisine} | Difficulty: {recipe.difficulty}</Text>
      <Text style={styles.section}>Ingredients:</Text>
      <Text>{recipe.ingredients}</Text>
      <Text style={styles.section}>Instructions:</Text>
      <Text>{recipe.instructions}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  meta: {
    fontSize: 12,
    color: '#555',
  },
  section: {
    marginTop: 8,
    fontWeight: '600',
  },
});