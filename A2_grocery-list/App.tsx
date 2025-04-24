import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, FlatList } from 'react-native';
import GroceryItem from './GroceryItem';

export default function App() {
  const [ item, setItem ] = useState('');
  const [ items, setItems ] = useState<string[]>([]);

  const handleAddItem = () => {
    const trimmed = item.trim();
    if (!trimmed) {
      Alert.alert('Invalid input', 'Item cannot be empty.');
      return;
    }
    if (items.includes(trimmed)) {
      Alert.alert('Duplicate item', 'This item is already on the list.');
      return;
    }
    setItems([...items, trimmed]);
    setItem('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grocery List Manager</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter grocery item..."
        value={item}
        onChangeText={setItem}
      />

      <Button title="Add Item" onPress={handleAddItem} />

      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <GroceryItem name={item} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items yet. Start adding some!</Text>
        }
        style={styles.list}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  list: {
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    fontStyle: 'italic',
  },
});
