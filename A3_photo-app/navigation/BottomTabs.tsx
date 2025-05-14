import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Gallery from '../components/Gallery';
import PictureViewer from '../components/PictureViewer';
import Profile from '../components/Profile';
import { Ionicons } from '@expo/vector-icons';

// Define the type for the tab navigator
export type RootTabParamList = {
    Gallery: undefined;
    PictureViewer: { image: string; title: string };
    Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabs() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Gallery"
                screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    const icons: Record<keyof RootTabParamList, keyof typeof Ionicons.glyphMap> = {
                    Gallery: 'image-outline',
                    PictureViewer: 'eye-outline',
                    Profile: 'person-circle-outline',
                    };
                    const iconName = icons[route.name as keyof RootTabParamList];
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#6200EE',
                tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Gallery" component={Gallery} />
                <Tab.Screen name="PictureViewer" component={PictureViewer} />
                <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

