import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, Text, TextInput, View, Keyboard, Button, Image, TouchableOpacity } from "react-native";
import { Feather, Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import colors from '../colors';

const ChatSearch = () => {

    const [clicked, setClicked] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState("");

    const navigation = useNavigation();

    const onSignOut = () => {
        signOut(auth).catch(error => console.log('Error logging out: ', error));
    };

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity
              style={{
                marginRight: 10
              }}
              onPress={onSignOut}
            >
              <AntDesign name="logout" size={24} color={colors.gray} style={{marginRight: 10}}/>
            </TouchableOpacity>
          )
        });
    }, [navigation]);

    return (
        <View style={{height: "100%", margin: 15}}>
            <View style={styles.searchBar}>
                <View style={clicked ? styles.searchBar__clicked : styles.searchBar__unclicked}>
                    {/* search Icon */}
                    <Feather
                        name="search"
                        size={20}
                        color="black"
                        style={{ marginLeft: 1 }}
                    />
                    {/* Input field */}
                    <TextInput
                        style={styles.input}
                        placeholder="Search"
                        value={searchPhrase}
                        onChangeText={setSearchPhrase}
                        onFocus={() => { setClicked(true) }}
                    />
                    {/* cross Icon, depending on whether the search bar is clicked or not */}
                    {clicked && (
                        <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => { setSearchPhrase("") }} />
                    )}
                </View>
                {/* cancel button, depending on whether the search bar is clicked or not */}
                {clicked && (
                    <View>
                        <Button title="Cancel" onPress={() => { Keyboard.dismiss(); setClicked(false); }}></Button>
                    </View>
                )}
            </View>
            <TouchableOpacity style={styles.searchItem} onPress={() => navigation.navigate("Chat")}>
                    <View style={styles.imageBox}>
                        <Image source= {{ uri:"https://i.pinimg.com/736x/0e/2e/9d/0e2e9dc33751fbf4a708c1ecbdaf2d43.jpg"}} style={styles.image}/>
                    </View>
                    <Text style={styles.name}>Rescuers</Text>
            </TouchableOpacity>
        </View>
    );
};
export default ChatSearch;

const styles = StyleSheet.create({
    searchBar: {
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",
    },
    searchBar__unclicked: {
        padding: 10,
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
    },
    searchBar__clicked: {
        padding: 10,
        flexDirection: "row",
        width: "80%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        width: "90%",
    },
    searchItem: {
        flex: 0.1,
        width: "100%",
        padding: 5,
        flexDirection: "row",
        alignItems: 'center',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 20,
    },
    imageBox: {
        flex:2,
    },
    image: {
        height: 70,
        width: 65,
        resizeMode: "cover",
        borderRadius: 65/2,
        margin: 10
    },
    name: {
        flex: 6,
        paddingLeft: 20,
        fontSize: 20,
        fontWeight: '300',
        alignContent: 'center',
    }
});