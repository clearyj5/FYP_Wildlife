import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet, FlatList, SafeAreaView } from "react-native";
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

const Home = () => {

    const navigation = useNavigation();

    const [data, setData] = useState([]);

    useEffect(() => {

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
                    createdAt: doc.data().createdAt
                }))
            );
            // setData(data.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : (a.createdAt > b.createdAt) ? -1 : 0));
        });
        return unsubscribe;
    }, [navigation], []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Current Cases</Text>
            </View>
            <FlatList
                style={{ height: '100%', width: '100%' }}
                data={data}
                orderBy={data.createdAt}
                numColumns={1}
                scrollsToTop={false}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={
                            (item.responders.includes(auth.currentUser.displayName) ?
                                styles.itemSelected :
                                styles.itemUnselected)}
                        onPress={() =>
                        (item.responders.includes(auth.currentUser.displayName) ?
                            navigation.navigate("Case Responder Details", { paramKey: item }) :
                            navigation.navigate("Case Details", { paramKey: item }))}>
                        <View style={styles.innerContainer}>
                            <Text style={(item.responders.includes(auth.currentUser.displayName) ? styles.selectedHeading : styles.heading)}>{item.title}</Text>
                            <Text style={(item.responders.includes(auth.currentUser.displayName) ? styles.selectedText : styles.text)}><Text style={{ fontSize: 14, fontWeight: '200' }}>Species:</Text> {item.species}</Text>
                            <Text style={(item.responders.includes(auth.currentUser.displayName) ? styles.selectedText : styles.text)}><Text style={{ fontSize: 14, fontWeight: '200' }}>Status:</Text> {item.status}</Text>
                            <Text style={(item.responders.includes(auth.currentUser.displayName) ? styles.selectedText : styles.text)}><Text style={{ fontSize: 14, fontWeight: '200' }}>Resp:</Text> {item.responders}</Text>
                        </View>
                    </TouchableOpacity>
                )
                }
            />
            < TouchableOpacity
                onPress={() => navigation.navigate("Map View", { caseData: data })}
                style={styles.mapButton}
            >
                <Entypo name="map" size={28} color={colors.lightGray} />
            </TouchableOpacity >
        </SafeAreaView >
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
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
    itemUnselected: {
        backgroundColor: '#e5e5e5',
        padding: 15,
        borderRadius: 15,
        margin: 5,
        marginHorizontal: 10,
    },
    itemSelected: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 15,
        margin: 5,
        marginHorizontal: 10,
    },
    innerContainer: {
        alignItems: "left",
        flexDirection: "column",
        paddingLeft: 30
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#68a19a',
        alignSelf: 'center',
        paddingBottom: 24,
        paddingTop: 20
    },
    heading: {
        fontWeight: "bold",
        fontSize: 18
    },
    selectedHeading: {
        fontWeight: "bold",
        fontSize: 18,
        color: 'white'
    },
    text: {
        fontWeight: '300',
        fontSize: 16,
        paddingLeft: 15
    },
    selectedText: {
        fontWeight: '300',
        fontSize: 16,
        paddingLeft: 15,
        color: 'white'
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
        bottom: 25
    }
});