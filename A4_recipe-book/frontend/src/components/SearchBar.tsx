import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function SearchBar({
  query,
  setQuery,
  onSearch,
}: {
  query: string;
  setQuery: (q: string) => void;
  onSearch: () => void;
}) {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="Search by ingredient..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={onSearch}
        returnKeyType="search"
        style={styles.input}
      />
      <Button title="Search" onPress={onSearch} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    padding: 16,
    paddingBottom: 0,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
});