import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth, database } from '../config/firebase';
import { collection, addDoc, orderBy, query, onSnapshot, setDoc, Timestamp, updateDoc, doc, getDoc } from 'firebase/firestore';
const backImage = require("../assets/KWR_logo.png");
import colors from '../colors';
import { Ionicons } from "@expo/vector-icons";


const CaseResponderDetails = ({ route, navigation }) => {

    const data = route.params.paramKey

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")} style={{flex: 0.45}}>
                    <Ionicons name="arrow-back-sharp" size={35} color={colors.lightGray} style={{ marginLeft: 15 }} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Case Details</Text>
            </View>
            <Image source={backImage} style={styles.backImage} />
            <View style={styles.whiteSheet}>
                <View style={styles.innerContainer}>
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.heading}>Case Title</Text>
                        <Text style={styles.text}>{data.title}</Text>
                        <Text style={styles.heading}>Status</Text>
                        <Text style={styles.text}>{data.status}</Text>
                        <Text style={styles.heading}>Species</Text>
                        <Text style={styles.text}>{data.species}</Text>
                        <Text style={styles.heading}>Member of Public - Name</Text>
                        <Text style={styles.text}>   {data.mopName}</Text>
                        <Text style={styles.heading}>   Address</Text>
                        <Text style={styles.text}>   {data.mopAddress}</Text>
                        <Text style={styles.heading}>   Phone Number</Text>
                        <Text style={styles.text}>   {data.mopPhone}</Text>
                        <Text style={styles.heading}>Additional Notes</Text>
                        <Text style={styles.text}>{data.notes}</Text>
                        <Text style={styles.heading}>Current Responders</Text>
                        <Text style={styles.text}>{data.responders}</Text>
                        <Text style={styles.heading}>Media</Text>
                    </ScrollView>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Responding</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default CaseResponderDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "stretch",
        backgroundColor: colors.primary
    },
    whiteSheet: {
        width: '100%',
        height: "78%",
        position: "absolute",
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 60,
    },
    innerContainer: {
        height: '97%',
        width: '100%',
        paddingTop: 25,
        justifyContent: 'flex-start',
    },
    header: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        zIndex: 1
    },
    headerTitle: {
        flex: 1,
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    backImage: {
        height: "30%",
        width: "100%",
        position: "absolute",
        top: 30,
        resizeMode: 'cover',
    },
    scrollView: {
        marginLeft: 50,
        marginRight: 25
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#68a19a',
        paddingBottom: 24,
        paddingTop: 20,
    },
    text: {
        fontSize: 22,
        color: colors.primary,
    },
    heading: {
        fontSize: 18,
        fontWeight: '600',
        color: '#68a19a',
        paddingBottom: 5,
        paddingTop: 20,
    },
    button: {
        backgroundColor: colors.gray,
        height: 58,
        width: '80%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: 24,
        color: '#ffff',
        alignSelf: 'center',
    }
});