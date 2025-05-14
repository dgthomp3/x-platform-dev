import React from 'react';
import { View, Image, Text, StyleSheet, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

interface RouteParams {
    image: string;
    title: string;
};

export default function PictureViewer() {
    const route = useRoute();
    const navigation = useNavigation();
    const { image, title } = route.params as RouteParams;

    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.fullImage} />
            <Text style={styles.title}>{title}</Text>
            <Button title="Back to Gallery" onPress={() => navigation.goBack()} />
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
});