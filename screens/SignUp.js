import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { auth, database } from '../config/firebase';
import { launchImageLibrary } from 'react-native-image-picker';
const backImage = require("../assets/KWR_logo.png");

export default function SignUp({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState("");

    const onHandleSignUp = () => {
        if (email != "" && password != "" && name != ""){
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => console.log("Sign Up Success"))
                .catch((err) => Alert.alert("Login error", err.message));
            addDoc(collection(database, 'users'), {
                name,
                email,
                password,
                profilePic
            });
        }
    };

    const handleChoosePhoto = () => {
        launchImageLibrary({ noData: true }, (response) => {
          if (response) {
            setProfilePic(response);
          }
        });
    };

    return (
        <View style={styles.container}>
            <Image source={backImage} style={styles.backImage} />
            <View style={styles.whiteSheet} />
            <SafeAreaView style={styles.form} >
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
                <Button title="Choose Profile Photo" onPress={handleChoosePhoto} />
                <TouchableOpacity style={styles.button} onPress={onHandleSignUp}>
                    <Text style={styles.text}>Sign Up</Text>
                </TouchableOpacity>
                <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                <Text style={{color: 'gray', fontweight: '600', fontSize: 14}}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={{fontSize: 16, fontWeight: '600', color: '#0f4c5c'}}> Login</Text>
                </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        width: "100%", 
        height: 340, 
        position: "absolute", 
        top: 0, 
        resizeMode: 'cover', 
    }, 
    whiteSheet: {       
        width: '100%', 
        height: "75%",
        position: "absolute",
        bottom: 0,
        backgroundColor:'#fff',
        borderTopLeftRadius: 60,
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30,
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