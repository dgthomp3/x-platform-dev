import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { submitRecipe } from '../api/recipes';

export default function SubmitRecipeComponent({ onSubmitSuccess }: { onSubmitSuccess: () => void }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({
    username: '',
    title: '',
    ingredients: '',
    instructions: '',
    cuisine: '',
    difficulty: '',
  });

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const hasEmptyField = Object.values(form).some(v => !v.trim());
    if (hasEmptyField) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    try {
      const response = await submitRecipe(form);
      if (response?.success) {
        Alert.alert('Success', 'Recipe submitted!');
        setForm({
          username: '',
          title: '',
          ingredients: '',
          instructions: '',
          cuisine: '',
          difficulty: '',
        });
        setModalVisible(false);
        onSubmitSuccess();
      } else {
        throw new Error();
      }
    } catch (err) {
      Alert.alert('Error', 'Submission failed. Please try again.');
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.form}>
            <Text style={styles.heading}>Enter Recipe</Text>
            {Object.entries(form).map(([field, value]) => (
              <TextInput
                key={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={value}
                onChangeText={(text) => handleChange(field, text)}
                style={[
                  styles.input,
                  field === 'instructions' && styles.instructionsInput,
                ]}
                multiline={field === 'ingredients' || field === 'instructions'}
                numberOfLines={field === 'instructions' ? 6 : 1}
              />
            ))}
            <View style={styles.buttonRow}>
              <Button title="Cancel" color="gray" onPress={() => setModalVisible(false)} />
              <Button title="Submit" onPress={handleSubmit} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  form: {
    paddingBottom: 32,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  instructionsInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 16,
  },
});