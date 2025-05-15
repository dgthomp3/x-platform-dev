import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, Switch, TouchableOpacity, StyleSheet, Alert, View } from 'react-native';
import { UserProfile, saveProfile, loadProfile, clearProfile } from '../storage/profileStorage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        bio: '',
    });

    useEffect(() => {
        const fetchProfile = async () => {
            const profile = await loadProfile();
            if (profile) {
                setName(profile.name);
                setEmail(profile.email);
                setBio(profile.bio);
                setNotificationsEnabled(profile.notificationsEnabled);
            }
        };

        fetchProfile();
    }, []);

    const validateInputs = () => {
        const newErrors = {
            name: name.trim() === '' ? 'Name is required.' : '',
            email: !/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email) ? 'Invalid email address.' : '',
            bio: bio.length > 150 ? 'Bio must be 150 characters or less.' : '',
        };

        setErrors(newErrors);

        return !Object.values(newErrors).some(error => error !== '');
    };

    const handleSave = async () => {
        if (!validateInputs()) {
            Alert.alert('Validation Error', 'Please fix the errors before saving.');
            return;
        }

        const profile: UserProfile = { name, email, bio, notificationsEnabled };
        await saveProfile(profile);
        Alert.alert('Profile Saved', 'Your profile has been successfully saved.');
    };

    const handleClear = async () => {
        await clearProfile();
        setName('');
        setEmail('');
        setBio('');
        setNotificationsEnabled(false);
        setErrors({ name: '', email: '', bio: '' });
        Alert.alert('Profile Cleared', 'Your profile has been reset.');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Profile Settings</Text>

                <Text style={styles.label}>Name</Text>
                <TextInput 
                    style={[styles.input, errors.name ? styles.errorInput : null]} 
                    value={name} 
                    onChangeText={setName} 
                    placeholder="Enter your name" />
                {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

                <Text style={styles.label}>Email</Text>
                <TextInput 
                    style={[styles.input, errors.email ? styles.errorInput : null]} 
                    value={email} 
                    onChangeText={setEmail} 
                    placeholder="Enter your email" 
                    keyboardType="email-address" />
                {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

                <Text style={styles.label}>Bio</Text>
                <TextInput 
                    style={[styles.textArea, errors.bio ? styles.errorInput : null]} 
                    value={bio} 
                    onChangeText={setBio} 
                    placeholder="Tell us about yourself" 
                    multiline={true} 
                    numberOfLines={4} />
                {errors.bio ? <Text style={styles.errorText}>{errors.bio}</Text> : null}

                <View style={styles.switchContainer}>
                    <Text style={styles.label}>Enable Notifications</Text>
                    <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Ionicons name="save-outline" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Save Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
                    <Ionicons name="trash-outline" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Clear Profile</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    input: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    textArea: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        height: 100,
        textAlignVertical: 'top',
    },
    errorInput: {
        borderColor: '#ff4d4d',
    },
    errorText: {
        color: '#ff4d4d',
        marginBottom: 10,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 25,
        marginBottom: 15,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    clearButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#dc3545',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 25,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});