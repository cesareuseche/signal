import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
//Importing react naigation and react native stylesheet style components
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//Importing the screens components
import LoginScreen from './screenscomponents/LoginScreen';
import RegisterScreen from './screenscomponents/RegisterScreen'
import HomeScreen from './screenscomponents/HomeScreen';
import AddChat from './screenscomponents/AddChat';


// Creating the Stack Navigator & global screen options styling
const Stack = createStackNavigator();
const globalScreenOptions = {
  headerStyle: { backgroundColor: "#2C6BED" },
  headerTitleStyle: { color: "#FFFFFF" },
  headerTintColor: "#FFFFFFF",
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions} >
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='AddChat' component={AddChat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
