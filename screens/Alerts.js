import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { Feather, Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { auth, database } from '../config/firebase';
import { collection, addDoc, orderBy, query, onSnapshot, setDoc, Timestamp, updateDoc, doc } from 'firebase/firestore';
import colors from '../colors';

export default function Alerts() {

    const navigation = useNavigation();

    const [data, setData] = useState();

    useEffect(() => {

        const collectionRef = collection(database, 'alerts');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, querySnapshot => {
            console.log('querySnapshot unsusbscribe');
            setData(
                querySnapshot.docs.map(doc => ({
                    text: doc.data().text,
                    createdAt: doc.data().createdAt.toDate().toString(),
                }))
            );
        });
        return unsubscribe;
    }, [navigation], []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Alerts</Text>
            </View>
            <View style={styles.scrollContainer}>
                <FlatList
                    style={{ height: '100%', width: '100%' }}
                    data={data}
                    numColumns={1}
                    scrollsToTop={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.item}>
                            <View style={styles.innerContainer}>
                                <Text style={styles.heading}>{item.text}</Text>
                                <Text style={styles.text}>{item.createdAt}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>

        </SafeAreaView>
    )
}

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
        width: '100%'
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    scrollContainer: {
        height: '100%',
        width: '100%',
        marginBottom: 30
    },
    heading: {
        fontWeight: "bold",
    },
    text: {
        fontWeight: '300',
    },
    item: {
        backgroundColor: '#e5e5e5',
        padding: 15,
        borderRadius: 15,
        margin: 5,
        marginHorizontal: 10,

    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
    locationContainer: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: "row",
        alignItems: 'center',
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 100,
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
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    notesInput: {
        textAlignVertical: 'top',
        textAlign: 'left',
        padding: 10,
        width: '70%',
        height: 80,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    locationInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        marginEnd: 15,
    },
    button: {
        backgroundColor: '#0f4c5c',
        width: '70%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 15,
        marginBottom: 20,
    },
    mediaButton: {
        backgroundColor: 'white',
        flexDirection: "row",
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
    },
    mediaButtonText: {
        color: '#000',
        fontSize: 15,
    },
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-start",
        backgroundColor: '#0f4c5c',
        height: 50,
        paddingHorizontal: 20,
    },
    navButton: {
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    navButtonTextClicked: {
        color: '#fff',
        textDecorationLine: "underline",
        fontSize: 16,
        fontWeight: 'bold',
    },
    navButtonTextUnclicked: {
        color: '#fff',
        textDecorationLine: "none",
        fontSize: 16,
        fontWeight: 'bold',
    },
});