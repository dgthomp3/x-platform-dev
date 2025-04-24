import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type GroceryItemProps = {
  name: string;
};

export default function GroceryItem({ name }: GroceryItemProps) {
  return (
    <View style={styles.item}>
      <Text style={styles.text}>• {name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
  },
  text: {
    fontSize: 16,
  },
});