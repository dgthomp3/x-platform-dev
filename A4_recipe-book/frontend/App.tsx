import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './src/screens/HomeScreen';
import FilterByCuisineScreen from './src/screens/FilterByCuisineScreen';
import FilterByDifficultyScreen from './src/screens/FilterByDifficultyScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = 'ellipse';

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'By Cuisine') {
              iconName = 'restaurant';
            } else if (route.name === 'By Difficulty') {
              iconName = 'barbell';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="By Cuisine" component={FilterByCuisineScreen} />
          <Tab.Screen name="By Difficulty" component={FilterByDifficultyScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
