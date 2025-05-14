import React from 'react';
import { View, Image, Text, StyleSheet, Button } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootTabParamList } from '../navigation/BottomTabs';

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
                    <Button title="Back to Gallery" onPress={() => navigation.goBack()} />
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
        borderRadius: 12,
    },
        title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
        errorText: {
        fontSize: 18,
        color: '#999',
    },
});