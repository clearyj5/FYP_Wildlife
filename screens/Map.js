import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Button, TouchableOpacity, Text } from 'react-native';
import * as Location from 'expo-location';
import { Feather, Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import colors from '../colors';

export default function Map({ route }) {

    const data = route.params.caseData;

    const navigation = useNavigation();

    const onSignOut = () => {
        signOut(auth).catch(error => console.log('Error logging out: ', error));
    };

    const [mapRegion, setmapRegion] = useState({
        longitude: 0,
        longitude: 0,
        longitudeDelta: 0.05,
    });
    const [errorMsg, seterrorMsg] = useState("");
    const userLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            seterrorMsg("Permission to access location was denied");
        }
        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        setmapRegion({
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
            longitudeDelta: 0.02,
        });
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 10 }} onPress={onSignOut}>
                    <AntDesign name="logout" size={24} color={colors.gray} style={{ marginRight: 10 }} />
                </TouchableOpacity>
            )
        });
    }, [navigation]);


    return (
        <View style={styles.container}>
            <MapView style={styles.map} region={mapRegion} provider={PROVIDER_GOOGLE} zoomControlEnabled={true}>
                <Marker coordinate={mapRegion} title="Location" />
                {data.map((data, index) =>
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: data.latitude,
                            longitude: data.longitude,
                        }}
                    />)}
            </MapView>
            <Button title="Get Location" onPress={userLocation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '90%',
    },
});