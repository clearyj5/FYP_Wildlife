import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Button, TouchableOpacity, Text, Image, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
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
import colors from '../colors';

const activeIcon = require("../assets/ActiveIcon.png");
const inProgressIcon = require("../assets/InProgressIcon.png");

export default function Map({ }) {

    const [locations, setLocations] = useState([]);
    const [mapRegion, setMapRegion] = useState(null);

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status != 'granted') {
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setMapRegion({
                longitude: location.coords.longitude,
                latitude: location.coords.latitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
            });
        })();
    }, []);

    const navigation = useNavigation();

    const onSignOut = () => {
        signOut(auth).catch(error => console.log('Error logging out: ', error));
    };

    useEffect(() => {

        const collectionRef = collection(database, 'cases');
        const q = query(collectionRef, where("status", "!=", "Rescued"));

        const unsubscribe = onSnapshot(q, querySnapshot => {
            console.log('querySnapshot unsusbscribe');
            setLocations(
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
        });
        return unsubscribe;
    }, [navigation], []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <Ionicons name="arrow-back-sharp" size={35} color={colors.primary} />
                </TouchableOpacity>
                <Text style={styles.mapTitle}>Map View</Text>
            </View>
            <MapView
                style={styles.map}
                showsScale={true}
                showsUserLocation={true}
                initialRegion={mapRegion}
                provider={PROVIDER_GOOGLE}
                zoomControlEnabled={true}
                showsMyLocationButton={true}
                showsCompass={true}>
                {locations.map((location, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude
                        }}
                        title={location.title}
                        image={location.status === "Active" ? activeIcon : inProgressIcon}
                        size={5}>
                        <Callout onPress={() => navigation.navigate("Case Details", { paramKey: location })}>
                            <Text style={styles.title}>{location.title}</Text>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <View style={{ position: 'absolute', top: 75, right: 10, backgroundColor: colors.primary, padding: 5, borderRadius: 10, justifyContent: 'center', zIndex: 1 }}>
                <View style={{ flexDirection: "row" }}>
                    <Image source={activeIcon} style={{ height: 25, width: 25 }} />
                    <Text style={{ color: colors.lightGray, marginTop: 5, marginLeft: 5 }}>Active Cases</Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 5 }}>
                    <Image source={inProgressIcon} style={{ height: 25, width: 25 }} />
                    <Text style={{ color: colors.lightGray, marginTop: 5, marginLeft: 5 }}>In Progress Cases</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    header: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        backgroundColor: '#fff',
        borderRadius: 25,
        position: 'absolute',
        top: 15,
        zIndex: 1
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#68a19a',
        alignSelf: 'center',
    },
    mapTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#68a19a',
        flex: 0.86,
        textAlign: 'center',
    },

});