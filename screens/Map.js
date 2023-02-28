import React, { useContext, useState, useEffect } from "react";
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { StyleSheet, View, Button } from 'react-native';
import * as Location from 'expo-location';

export default function Map() {

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


    return (
        <View style={styles.container}>
            <MapView style={styles.map} region={mapRegion} provider={PROVIDER_GOOGLE}>
                <Marker coordinate={mapRegion} title="Location" />
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