import React, { useLayoutEffect, useState, useEffect } from 'react'
import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native'
//Importing Icons and Avatar placeholder
import { Avatar } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
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
            navigation.replace('Cmessage Sign In')
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
            title: "Cmessage",
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
                        <Ionicons name='camera-outline' size={24} color='#000000' marginRight="8" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddChat')} activeOpacity={0.5}>
                        <Icon name="chat-plus-outline" size={24} color="#000000" />
                    </TouchableOpacity>
                </View>
            )
        });
    }, [navigation]);

    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {
            id,
            chatName,
        })
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({ id, data: { chatName } }) => (
                    <CustomListItem
                        key={id}
                        id={id}
                        chatName={chatName}
                        enterChat={enterChat}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: "100%",
    }
})
