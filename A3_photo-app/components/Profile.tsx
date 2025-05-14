import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, Switch, Button, StyleSheet, Alert, View } from 'react-native';
import { UserProfile, saveProfile, loadProfile, clearProfile } from '../storage/profileStorage';
import { SafeAreaView } from "react-native-safe-area-context";

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
        <SafeAreaView>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.label}>Name</Text>
                <TextInput 
                    style={styles.input} 
                    value={name} 
                    onChangeText={setName} 
                    placeholder="Enter your name" />
                {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

                <Text style={styles.label}>Email</Text>
                <TextInput 
                    style={styles.input} 
                    value={email} 
                    onChangeText={setEmail} 
                    placeholder="Enter your email" 
                    keyboardType="email-address" />
                {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

                <Text style={styles.label}>Bio</Text>
                <TextInput 
                    style={styles.textArea} 
                    value={bio} 
                    onChangeText={setBio} 
                    placeholder="Tell us about yourself" 
                    multiline={true} numberOfLines={4} />
                {errors.bio ? <Text style={styles.errorText}>{errors.bio}</Text> : null}

                <View style={styles.switchContainer}>
                    <Text style={styles.label}>Enable Notifications</Text>
                    <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
                </View>

                <Button title="Save Profile" onPress={handleSave} />
                <Button title="Clear Profile" color="red" onPress={handleClear} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    input: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    textArea: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        height: 100,
        textAlignVertical: 'top',
    },
    errorInput: {
        borderColor: '#ff4d4d',
    },
    errorText: {
        color: '#ff4d4d',
        marginBottom: 8,
    },
      switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
});