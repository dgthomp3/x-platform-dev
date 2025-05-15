import React from 'react';
import { View, Image, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootTabParamList } from '../navigation/BottomTabs';
import { Ionicons } from '@expo/vector-icons';

type PictureViewerRouteProp = RouteProp<RootTabParamList, 'PictureViewer'>;

export default function PictureViewer() {
    const route = useRoute<PictureViewerRouteProp>();
    const navigation = useNavigation();
    const { image, title } = route.params || { image: '', title: '' };

    return (
        <View style={styles.container}>
            {image ? (
                <>
                    <Image source={image} style={styles.fullImage} />
                    <Text style={styles.title}>{title}</Text>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                        <Text style={styles.backButtonText}>Back to Gallery</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text style={styles.errorText}>No image data available</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    fullImage: {
        width: '100%',
        height: 300,
        marginBottom: 16,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    errorText: {
        fontSize: 18,
        color: '#999',
    },
});