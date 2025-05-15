import React from "react";
import { FlatList, View, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootTabParamList } from '../navigation/BottomTabs';
import { ImageSourcePropType } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 20;

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
    { 
        id: '4', 
        title: 'Volcano', 
        thumbnail: require('../assets/volcano.jpg'), 
        fullImage: require('../assets/volcano.jpg') 
    },
    { 
        id: '5', 
        title: 'City', 
        thumbnail: require('../assets/newyork.jpg'), 
        fullImage: require('../assets/newyork.jpg') 
    },
];

export default function Gallery() {
    const navigation = useNavigation<NativeStackNavigationProp<RootTabParamList, 'Gallery'>>();

    const renderItem = ({ item }: { item: ImageItem }) => (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PictureViewer', { image: item.fullImage, title: item.title })}>
            <View>
                <Image source={item.thumbnail} style={styles.image} />
                <View style={styles.overlay}>
                    <Text style={styles.title}>{item.title}</Text>
                </View>
            </View>
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
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    listContainer: {
        paddingBottom: 20,
    },
    card: {
        width: cardWidth,
        margin: 8,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    image: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    title: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
    },
  });