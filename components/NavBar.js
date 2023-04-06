import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../colors';

const NavBar = ({ children }, route) => {

    const navigation = useNavigation();

    const [activeButton, setActiveButton] = useState("Home");

    const handlePress = (buttonName) => {
        setActiveButton(buttonName);
        navigation.navigate(buttonName);
    };

    return (
        <SafeAreaView style={styles.container}>
            {children}
            <View style={styles.navBar}>
                <TouchableOpacity
                    style={[styles.button, activeButton === 'Home' && styles.activeButton]}
                    onPress={() => handlePress('Home')}
                >
                    <Icon name="home-outline" size={25} color={activeButton === 'Home' ? 'white' : '#95a5a6'} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, activeButton === 'Alerts' && styles.activeButton]}
                    onPress={() => handlePress('Alerts')}
                >
                    <Icon name="notifications-outline" size={25} color={activeButton === 'Alerts' ? 'white' : '#95a5a6'} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, activeButton === 'Chat' && styles.activeButton]}
                    onPress={() => handlePress('Chat')}
                >
                    <Icon name="chatbubble-outline" size={25} color={activeButton === 'Chat' ? 'white' : '#95a5a6'} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, activeButton === 'QR Code' && styles.activeButton]}
                    onPress={() => handlePress('QR Code')}
                >
                    <Icon name="qr-code-outline" size={25} color={activeButton === 'QR Code' ? 'white' : '#95a5a6'} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, activeButton === 'Settings' && styles.activeButton]}
                    onPress={() => handlePress('Settings')}
                >
                    <Icon name="settings-outline" size={25} color={activeButton === 'Settings' ? 'white' : '#95a5a6'} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.primary
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.primary,
        paddingBottom: 10
    },
    button: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 5
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        marginTop: 5,
    },
    activeButton: {
        flex: 1.01,
        borderTopWidth: 2,
        borderTopColor: 'white',
    },
    activeButtonText: {
        color: 'white',
    },
});

export default NavBar;
