import React from "react";
import { FlatList, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootTabParamList } from '../navigation/BottomTabs';
import { ImageSourcePropType } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export interface ImageItem {
    id: string;
    title: string;
    thumbnail: ImageSourcePropType;
    fullImage: ImageSourcePropType;
  }

const sampleImages: ImageItem[] = [
    { 
        id: '1', 
        title: 'Mountains', 
        thumbnail: require('../assets/mountains.jpg'), 
        fullImage: require('../assets/mountains.jpg') 
    },
    { 
        id: '2', 
        title: 'Beach', 
        thumbnail: require('../assets/beach.jpg'), 
        fullImage: require('../assets/beach.jpg')
    },
    { 
        id: '3', 
        title: 'Forest', 
        thumbnail: require('../assets/forest.jpg'), 
        fullImage: require('../assets/forest.jpg') 
    },
];

export default function Gallery() {
    const navigation = useNavigation<NativeStackNavigationProp<RootTabParamList, 'Gallery'>>();

    const renderItem = ({ item }: { item: ImageItem }) => (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PictureViewer', { image: item.fullImage, title: item.title })}>
            <Image source={item.thumbnail} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
        <FlatList
            data={sampleImages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
        />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      paddingTop: 16,
    },
    listContainer: {
      paddingHorizontal: 8,
    },
    card: {
      flex: 1,
      margin: 8,
      backgroundColor: '#ffffff',
      borderRadius: 12,
      overflow: 'hidden',
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    image: {
      width: '100%',
      height: 150,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      padding: 8,
      color: '#333',
    },
  });