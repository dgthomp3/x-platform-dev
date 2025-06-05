import React from 'react';
import { FlatList, View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import RecipeCard from '../components/RecipeCard';

export default function ViewAllRecipesScreen({ recipes }: { recipes: any[] }) {
  if (!recipes || recipes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No recipes to show.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={recipes}
      keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
      renderItem={({ item }) => <RecipeCard recipe={item} />}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
