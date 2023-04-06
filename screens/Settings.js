import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import colors from '../colors';

const Settings = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSignOut = () => {
        Alert.alert('Sign Out?', 'Are you sure you want to sign out of the app?', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: "Yes I'm Sure", onPress: () => signOut(auth).catch(error => console.log('Error logging out: ', error))},
          ]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Settings</Text>
            </View>
            <View style={styles.body}>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.optionText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.optionText}>Privacy and Security</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.optionText}>Notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.optionText}>Help and Support</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={handleSignOut}>
                    <Text style={[styles.optionText, styles.signOutText]}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 60,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    body: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    option: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc',
    },
    optionText: {
        fontSize: 16,
    },
    signOutText: {
        color: 'red',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#68a19a',
        alignSelf: 'center',
        paddingBottom: 24,
        paddingTop: 20
    },
});

export default Settings;
