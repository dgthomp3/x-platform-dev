import React from "react";
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootTabParamList } from '../navigation/BottomTabs';

interface ImageItem {
    id: string;
    title: string;
    thumbnail: string;
    fullImage: string;
};

const sampleImages: ImageItem[] = [
    { 
        id: '1', 
        title: 'Mountains', 
        thumbnail: 'https://via.placeholder.com/150', 
        fullImage: 'https://via.placeholder.com/600' 
    },
    { 
        id: '2', 
        title: 'Beach', 
        thumbnail: 'https://via.placeholder.com/150', 
        fullImage: 'https://via.placeholder.com/600' 
    },
    { 
        id: '3', 
        title: 'Forest', 
        thumbnail: 'https://via.placeholder.com/150', 
        fullImage: 'https://via.placeholder.com/600' 
    },
];

export default function Gallery() {
    const navigation = useNavigation<NativeStackNavigationProp<RootTabParamList, 'Gallery'>>();

    const renderItem = ({ item }: { item: ImageItem }) => (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PictureViewer', { image: item.fullImage, title: item.title })}>
            <Image source={{ uri: item.thumbnail }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
        <FlatList
            data={sampleImages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
        />
        </View>
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