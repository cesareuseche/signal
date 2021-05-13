import React, { useLayoutEffect, useState, useEffect } from 'react'
import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native'
//Importing Icons and Avatar placeholder
import { Avatar } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
// Importing auth
import { auth, db } from '../firebase';


//importing components
import CustomListItem from '../components/CustomListItem'

const HomeScreen = ({ navigation }) => {

    const [chats, setChats] = useState([]);

    // Sign out Function
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login')
        });
    };

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot((snapshot) => {
            setChats(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        return unsubscribe;
    })

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroundColor: "#ffffff" },
            headerTitleStyle: { color: "#000000" },
            headerTintColor: "#000000",
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20,
                }}
                >
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name='camerao' size={24} color='#000000' marginRight="8" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddChat')} activeOpacity={0.5}>
                        <Icon name="chat-plus-outline" size={24} color="#000000" />
                    </TouchableOpacity>
                </View>
            )
        });
    }, [navigation]);

    return (
        <SafeAreaView>
            <ScrollView>
                {chats.map(({ id, data: { chatName } }) => (
                    <CustomListItem key={id} id={id} chatName={chatName} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
