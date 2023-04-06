import React, { useState } from "react";
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import colors from '../colors';
const backImage = require("../assets/KWR_logo.png");
import QRCode from 'react-native-qrcode-svg';
import NavBar from "../components/NavBar";

export default function QRCodeScreen() {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Donations</Text>
            </View>
            <Image source={backImage} style={styles.backImage} />
            <View style={styles.whiteSheet}>
                <View style={styles.form}>
                    <Text style={styles.title}>Scan here to Donate!</Text>
                    <QRCode value="https://www.gofundme.com/f/kildarewildliferescuehttps://www.gofundme.com/f/kildarewildliferescue" size={250} color={colors.primary} />
                    <Text style={styles.title}>We thank you for your support</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    header: {
        height: 60,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        zIndex: 1
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#68a19a',
        alignSelf: 'center',
        paddingBottom: 24,
        paddingTop: 20
    },
    input: {
        backgroundColor: "#F6F7FB",
        height: 58,
        marginBottom: 20,
        fontsize: 16,
        borderRadius: 10,
        padding: 12,
    },
    backImage: {
        height: "42%",
        width: "100%",
        position: "absolute",
        top: 40,
        resizeMode: 'cover',
    },
    whiteSheet: {
        width: '100%',
        height: "70%",
        position: "absolute",
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 60,
    },
    form: {
        paddingTop: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 40,
    },
    button: {
        backgroundColor: '#0f4c5c',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    text: {
        fontSize: 24,
        color: '#ffff',
        alignSelf: 'center',
    }
});
