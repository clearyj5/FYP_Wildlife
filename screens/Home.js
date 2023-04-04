import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet, FlatList, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from '../colors';
import { Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { AuthenticatedUserContext } from "../App";
import {
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
    updateDoc,
    serverTimestamp,
    getDoc,
    orderBy,
    onSnapshot
} from "firebase/firestore";

const logo = require("../assets/Logo4Homepage.jpeg");

const Home = () => {

    const navigation = useNavigation();

    const [data, setData] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Image
                    source={logo}
                    style={{
                        width: 40,
                        height: 40,
                        marginLeft: 15,
                    }}
                />
            ),
            headerRight: () => (
                <View style={styles.headerRight}>
                    <TouchableOpacity onPress={() => navigation.navigate("QR Code")}>
                        <FontAwesome5 name="donate" size={35} color={colors.gray} style={{ marginRight: 25 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Alerts")}>
                        <Ionicons name="notifications" size={35} color={colors.gray} style={{ marginRight: 15 }} />
                    </TouchableOpacity>
                </View>
            ),
        });

        const collectionRef = collection(database, 'cases');
        const q = query(collectionRef, where("status", "!=", "Rescued"));

        const unsubscribe = onSnapshot(q, querySnapshot => {
            console.log('querySnapshot unsusbscribe');
            setData(
                querySnapshot.docs.map(doc => ({
                    id: doc.data().id,
                    latitude: doc.data().latitude,
                    longitude: doc.data().longitude,
                    mopName: doc.data().mopName,
                    mopAddress: doc.data().mopAddress,
                    mopPhone: doc.data().mopPhone,
                    notes: doc.data().notes,
                    responders: doc.data().responders,
                    species: doc.data().species,
                    status: doc.data().status,
                    title: doc.data().title,
                }))
            );
        });
        return unsubscribe;
    }, [navigation], []);

    return (
        <View style={styles.container}>
            <FlatList
                style={{ height: '100%', width: '100%' }}
                data={data}
                numColumns={1}
                scrollsToTop={false}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate("Case Details", { paramKey: item.id })} style={styles.item}>
                        <View style={styles.innerContainer}>
                            <Text style={styles.heading}>{item.title}</Text>
                            <Text style={styles.text}>{item.species}</Text>
                            <Text style={styles.text}>{item.status}</Text>
                            <Text style={styles.text}>{item.responders}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity
                onPress={() => navigation.navigate("Map View", { caseData: data })}
                style={styles.mapButton}
            >
                <Entypo name="map" size={28} color={colors.lightGray} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("Chat")}
                style={styles.chatButton}
            >
                <Entypo name="chat" size={28} color={colors.lightGray} />
            </TouchableOpacity>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: "#fff",
    },
    item: {
        backgroundColor: '#e5e5e5',
        padding: 15,
        borderRadius: 15,
        margin: 5,
        marginHorizontal: 10,

    },
    innerContainer: {
        alignItems: "center",
        flexDirection: "column",
    },
    heading: {
        fontWeight: "bold",
    },
    text: {
        fontWeight: '300',
    },
    headerRight: {
        flexDirection: "row"
    },
    chatButton: {
        backgroundColor: colors.primary,
        height: 64,
        width: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: .9,
        shadowRadius: 8,
        right: 90,
        bottom: 50,
        position: 'absolute',
    },
    mapButton: {
        position: 'absolute',
        backgroundColor: colors.primary,
        height: 64,
        width: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: .9,
        shadowRadius: 8,
        right: 25,
        bottom: 110
    }
});