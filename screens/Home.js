import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet, FlatList, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import colors from '../colors';
import { Entypo } from '@expo/vector-icons';
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

    const expand = (item) => {
        item.expanded = true;
    }

    const unExpand = (item) => {
        item.expanded = false;
    }

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <FontAwesome name="search" size={24} color={colors.gray} style={{ marginLeft: 15 }} />
            ),
            headerRight: () => (
                <Image
                    source={logo}
                    style={{
                        width: 40,
                        height: 40,
                        marginRight: 15,
                    }}
                />
            ),
        });

        const collectionRef = collection(database, 'users');
        const q = query(collectionRef, orderBy('displayName'));

        const unsubscribe = onSnapshot(q, querySnapshot => {
            console.log('querySnapshot unsusbscribe');
            setData(
                querySnapshot.docs.map(doc => ({
                    id: doc.data().uid,
                    displayName: doc.data().displayName,
                    email: doc.data().email,
                    type: doc.data().type,
                    expanded: false,
                }))
            );
        });
        return unsubscribe;
    }, [navigation], []);

    const [data, setData] = useState([]);

    return (
        <View style={styles.container}>
            <FlatList
                style={{ height: '100%', width: '100%' }}
                data={data}
                numColumns={1}
                scrollsToTop={false}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate("CaseDetails", {paramKey: item.id})} style={item.expanded? styles.itemExpanded : styles.item}>
                        <View style={styles.innerContainer}>
                            <Text style={styles.heading}>{item.displayName}</Text>
                            <Text style={styles.text}>{item.email}</Text>
                            <Text style={styles.text}>{item.id}</Text>
                            <Text style={styles.text}>{item.type}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity
                onPress={() => navigation.navigate("Map")}
                style={styles.mapButton}
            >
                <Entypo name="map" size={28} color={colors.lightGray} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("Channels")}
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
    itemExpanded: {
        backgroundColor: colors.primary,
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