import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Alert, Platform } from 'react-native';
import { doc, setDoc } from "firebase/firestore";
import { auth, database, storage } from '../config/firebase';
import { Feather, Entypo, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
const backImage = require("../assets/KWR_logo.png");
import colors from "../colors";

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [image, setImage] = useState(null);

    const navigation = useNavigation();

    const onHandleSignUp = async () => {
        if (email != "" && password != "" && displayName != "" && image != null) {
            const res = await createUserWithEmailAndPassword(auth, email, password)

            const response = await fetch(image);
            const blob = await response.blob();
            const storageRef = ref(storage, `Profile Pictures / ${displayName}`);

            uploadBytes(storageRef, blob).then((snapshot) => {
                console.log('Upload successful');
                getDownloadURL(storageRef).then(async (downloadURL) => {

                    try {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(database, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            type: "USER",
                            photoURL: downloadURL,
                        });
    
                        //create empty user chats on firestore
                        await setDoc(doc(database, "userChats", res.user.uid), {});
                    } catch (err) {
                        console.log(err);
                    }
                });
            });
        }
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission denied');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            console.log(image);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="height">
            <Image source={backImage} style={styles.backImage} />
            <View style={styles.whiteSheet}>
                <View style={styles.form} >
                    <Text style={styles.title}>Sign Up</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter your Full Name'
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
                    <TouchableOpacity style={styles.mediaButton} onPress={pickImage}>
                        <Feather name='upload' style={{ marginRight: 7 }} size={24} color={colors.primary} />
                        <Text style={{fontSize: 15, color: colors.primary, fontWeight: '600'}}>Upload Profile Picture</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onHandleSignUp}>
                        <Text style={styles.text}>Sign Up</Text>
                    </TouchableOpacity>
                    <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                        <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: '#0f4c5c' }}> Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "stretch",
        backgroundColor: colors.primary
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
        height: 50,
        marginBottom: 20,
        fontsize: 16,
        borderRadius: 10,
        padding: 12,
    },
    backImage: {
        width: "100%",
        height: "45%",
        position: "absolute",
        top: 0,
        resizeMode: 'cover'
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
        flex: 1,
        justifyContent: 'flex-start',
        marginHorizontal: 30,
        paddingTop: 30
    },
    button: {
        backgroundColor: '#0f4c5c',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
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
    text: {
        fontSize: 24,
        color: '#ffff',
        alignSelf: 'center',
    }
});