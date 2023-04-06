import React, { useState, createContext, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import colors from './colors';

import Chat from './screens/Chat.js';
import Login from './screens/Login.js';
import SignUp from './screens/SignUp.js';
import Home from './screens/Home.js'
import Map from './screens/Map';
import CaseDetails from './screens/CaseDetails';
import QRCodeScreen from './screens/QRCode';
import Alerts from './screens/Alerts';
import CaseResponderDetails from './screens/CaseResponderDetails';
import NavBar from './components/NavBar';
import Settings from './screens/Settings';

const Stack = createStackNavigator();
export const AuthenticatedUserContext = createContext({});

export const AuthenticatedUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  )
}

function ChatStack() {
  return (
    <NavBar>
      <Stack.Navigator defaultScreenOptions={Home} screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Chat' component={Chat} />
        <Stack.Screen name='Map View' component={Map} />
        <Stack.Screen name='Case Details' component={CaseDetails} />
        <Stack.Screen name='QR Code' component={QRCodeScreen} />
        <Stack.Screen name='Alerts' component={Alerts} />
        <Stack.Screen name='Settings' component={Settings} />
        <Stack.Screen name='Case Responder Details' component={CaseResponderDetails} />
      </Stack.Navigator>
    </NavBar>
  )
}

function AuthStack() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Navigator defaultScreenOptions={Login} screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='SignUp' component={SignUp} />
      </Stack.Navigator>
    </SafeAreaView>

  )
}

function RootNavigator() {
  const { currentUser, setCurrentUser } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,
      async authenticatedUser => {
        authenticatedUser ? setCurrentUser(authenticatedUser) : setCurrentUser(null);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [currentUser]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    )
  }
  return (
    <NavigationContainer>
      {currentUser ? <ChatStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: colors.primary,
  },
});