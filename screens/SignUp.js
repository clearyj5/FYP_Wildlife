import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { auth, database, storage } from '../config/firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
const backImage = require("../assets/KWR_logo.png");

export default function SignUp({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    // const [profilePic, setProfilePic] = useState(null);
    // const [uploading, setUploading] = useState(false);

    const onHandleSignUp = () => {
        if (email != "" && password != "" && name != ""){
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => console.log("Sign Up Success"))
                .catch((err) => Alert.alert("Login error", err.message));
            addDoc(collection(database, 'users'), {
                name,
                email,
                // photoURL: uploadProfilePic
            });
        }
    };

    // const uploadProfilePic = async () => {
    //     const blob = await new Promise((resolve, reject) => {
    //       const xhr = new XMLHttpRequest();
    //       xhr.onload = function() {
    //         resolve(xhr.response);
    //       };
    //       xhr.onerror = function() {
    //         reject(new TypeError('Network request failed'));
    //       };
    //       xhr.responseType = 'blob';
    //       xhr.open('GET', profilePic, true);
    //       xhr.send(null);
    //     })
    //     const ref = firebase.storage().ref().child(email)
    //     const snapshot = ref.put(blob)
    //     snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
    //       ()=>{
    //         setUploading(true)
    //       },
    //       (error) => {
    //         setUploading(false)
    //         console.log(error)
    //         blob.close()
    //         return 
    //       },
    //       () => {
    //         snapshot.snapshot.ref.getDownloadURL().then((url) => {
    //           setUploading(false)
    //           console.log("Download URL: ", url)
    //           setProfilePic(url)
    //           blob.close()
    //           return url
    //         })
    //       }
    //       )
    //   }

    // const handleChoosePhoto = async () => {
    //     // No permissions request is necessary for launching the image library
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //       allowsEditing: true,
    //       aspect: [4, 3],
    //       quality: 1,
    //     });
    
    //     if (!result.canceled) {
    //       setProfilePic(result.assets[0].uri);
    //     }
    // };

    return (
        <SafeAreaView style={styles.container}>
            <Image source={backImage} style={styles.backImage} />
            <View style={styles.whiteSheet} />
            <View style={styles.form} >
                <Text style={styles.title}>Sign Up</Text>
                <TextInput 
                    style={styles.input}
                    placeholder= 'Enter Display Name'
                    autoCapitalize='none'
                    autofocus={true}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder= 'Enter Email'
                    autoCapitalize='none'
                    keyboardType="email-address" 
                    textContentType="emailAddress"
                    autofocus={true}
                    value={email}
                    onChangeText={(text) => setEmail(text)} 
                />
                <TextInput 
                    style={styles.input}
                    placeholder= 'Enter Password'
                    autoCapitalize='none'
                    autocorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)} 
                />
                <TouchableOpacity style={styles.button} onPress={onHandleSignUp}>
                    <Text style={styles.text}>Sign Up</Text>
                </TouchableOpacity>
                <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                <Text style={{color: 'gray', fontweight: '600', fontSize: 14}}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={{fontSize: 16, fontWeight: '600', color: '#0f4c5c'}}> Login</Text>
                </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

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
        height: "85%",
        position: "absolute",
        bottom: 0,
        backgroundColor:'#fff',
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