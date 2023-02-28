import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { doc, setDoc } from "firebase/firestore";
import { auth, database, storage } from '../config/firebase';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
const backImage = require("../assets/KWR_logo.png");

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    // const [image, setImage] = useState(null);
    // const [uploading, setUploading] = useState(false)

    const navigation = useNavigation();

    const onHandleSignUp = async () => {
        if (email != "" && password != "" && displayName != "") {
            const res = await createUserWithEmailAndPassword(auth, email, password)

            try {
                //Update profile
                await updateProfile(res.user, {
                    displayName,
                    // photoURL: downloadURL,
                });
                //create user on firestore
                await setDoc(doc(database, "users", res.user.uid), {
                    uid: res.user.uid,
                    displayName,
                    email,
                    // photoURL: downloadURL,
                });

                //create empty user chats on firestore
                await setDoc(doc(database, "userChats", res.user.uid), {});
            } catch (err) {
                console.log(err);
            }
        }
    };

    // const pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         // We can  specify whether we need only Images or Videos
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,   // 0 means compress for small size, 1 means compress for maximum quality
    //     });

    //     console.log(result);

    //     if (!result.canceled) {
    //         setImage(result.assets[0].uri);
    //     }
    // };

    // const upload2 = async () => {
    //     const profilePicRef = ref(storage, image);

    //     const file = new Blob(image);
    //     uploadBytes(profilePicRef, file).then((snapshot) => {
    //         console.log('Uploaded photo!');
    //     });
    // }

    // const uploadImage = async () => {
    //     const blob = await new Promise((resolve, reject) => {
    //         const xhr = new XMLHttpRequest();
    //         xhr.onload = function () {
    //             resolve(xhr.response);
    //         };
    //         xhr.onerror = function () {
    //             reject(new TypeError('Network request failed'));
    //         };
    //         xhr.responseType = 'blob';
    //         xhr.open('GET', image, true);
    //         xhr.send(null);
    //     })
    //     const ref = storage.ref().child(`Pictures/Image1`)
    //     const snapshot = ref.put(blob)
    //     snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
    //         () => {
    //             setUploading(true)
    //         },
    //         (error) => {
    //             setUploading(false)
    //             console.log(error)
    //             blob.close()
    //             return
    //         },
    //         () => {
    //             snapshot.snapshot.ref.getDownloadURL().then((url) => {
    //                 setUploading(false)
    //                 console.log("Download URL: ", url)
    //                 setImage(url)
    //                 blob.close()
    //                 return url
    //             })
    //         }
    //     )
    // }

    return (
        <View style={styles.container}>
            <Image source={backImage} style={styles.backImage} />
            <View style={styles.whiteSheet} />
            <View style={styles.form} >
                <Text style={styles.title}>Sign Up</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Enter Display Name'
                    autoCapitalize='none'
                    autofocus={true}
                    value={displayName}
                    onChangeText={(text) => setDisplayName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Enter Email'
                    autoCapitalize='none'
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autofocus={true}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Enter Password'
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
                <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                    <Text style={{ color: 'gray', fontweight: '600', fontSize: 14 }}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: '#0f4c5c' }}> Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

export default SignUp;

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