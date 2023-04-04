import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { collection, addDoc } from "firebase/firestore"; 
import { database, auth } from "../config/firebase.js"
 
const CaseDetails = ({ route }) => {

    const caseID = route.params.paramKey

    const [detail, setdetail] = useState(caseID);

    const onHandleSubmit = async () => {
        const docRef = await addDoc(collection(database, "caseDetails"), {
            name: "Dundrum Fox",
            detail: detail,
          });
          console.log("Document written with ID: ", docRef.id);
    }

    return (
        <View style={styles.container}>
            <View style={styles.whiteSheet} />
            <View style={styles.form} >
                <Text style={styles.title}>{caseID}</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Enter Detail'
                    autoCapitalize='none'
                    autocorrect={false}
                    textContentType="password"
                    value={detail}
                    onChangeText={(text) => setdetail(text)}
                />
                <TouchableOpacity style={styles.button} onPress={onHandleSubmit}>
                    <Text style={styles.text}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CaseDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "stretch",
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 30,
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
        height: "40%",
        width: "100%",
        position: "absolute",
        top: 0,
        resizeMode: 'cover',
    },
    whiteSheet: {
        width: '100%',
        height: "75%",
        position: "absolute",
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 60,
    },
    form: {
        marginTop: 30,
        flex: 1,
        justifyContent: 'center',
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