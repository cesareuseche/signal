import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { StatusBar } from 'expo-status-bar';
//Avatar placeholder & Icons
import { Avatar } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons'
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
// Importing the db from firebase
import { auth, db } from '../firebase';
// Importing firebase for the timestamp
import * as firebase from 'firebase';

const ChatScreen = ({ navigation, route, timestamp }) => {

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Avatar
                        rounded
                        source={{
                            uri: messages[0]?.data.photoURL ||
                                "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
                        }} />
                    <Text
                        style={{
                            color: "#ffffff",
                            marginLeft: 10,
                            fontWeight: '700',
                        }}
                    >{route.params.chatName}</Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={navigation.goBack}>
                    <AntDesign name="left" size={24} color={"#ffffff"} />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 80,
                        marginRight: 20,
                    }}
                >
                    <TouchableOpacity>
                        <Ionicons name="videocam-outline" size={24} color="#ffffff" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="ios-call-outline" size={24} color="#ffffff" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation, messages])

    //Send Message Functiom 
    const sendMessage = () => {
        Keyboard.dismiss();
        if (input && input !== "\n") {
            db.collection('chats').doc(route.params.id).collection('messages').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(), //timestamp functionality from the firebase server
                message: input,
                displayName: auth.currentUser.displayName, //display the name of the user who is sending the message
                email: auth.currentUser.email,
                photoURL: auth.currentUser.photoURL, //display the image of the user 
            })

            setInput('') //clearing out the input 
        }

    }

    useLayoutEffect(() => {
        const unsubscribe = db
            .collection('chats')
            .doc(route.params.id)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) => setMessages(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            ))

        return unsubscribe;

    }, [route])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
                            {messages.map(({ id, data }) => (
                                data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.reciever}>
                                        <Avatar
                                            //Web Element
                                            containerStyle={{
                                                position: "absolute",
                                                bottom: -15,
                                                right: -5,
                                            }}
                                            // Mobile Element
                                            bottom={-15}
                                            position="absolute"
                                            right={-5}
                                            rounded
                                            size={24}
                                            source={{
                                                uri: data.photoURL,
                                            }}
                                        />
                                        <Text style={styles.recieverText}>{data.message}</Text>
                                    </View>
                                ) : (
                                        <View key={id} style={styles.sender}>
                                            <Avatar
                                                //Web Element
                                                containerStyle={{
                                                    position: "absolute",
                                                    bottom: -15,
                                                    right: -5,
                                                }}
                                                // Mobile Element
                                                bottom={-15}
                                                position="absolute"
                                                right={-5}
                                                rounded
                                                size={24}
                                                source={{
                                                    uri: data.photoURL,
                                                }}
                                            />
                                            <Text style={styles.senderText}>{data.message}</Text>
                                            <Text style={styles.senderName}>{data.displayName}</Text>
                                        </View>
                                    )
                            ))}
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput
                                value={input}
                                onChangeText={(text) => setInput(text)}
                                onSubmitEditing={sendMessage}
                                style={styles.textInput}
                                placeholder="Message..."
                            />
                            <TouchableOpacity
                                onPress={sendMessage}
                                activeOpacity={0.5}
                            >
                                <Ionicons name="send" size={24} color="#2B68E6" />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sender: {
        padding: 15,
        backgroundColor: "#2B68E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: 'relative',
    },
    senderName: {
        color: "#ffffff",
        left: 10,
        paddingRight: 10,
        fontSize: 10,
    },
    senderText: {
        color: "#ffffff",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 5,
    },
    reciever: {
        padding: 15,
        backgroundColor: "#ececec",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: 'relative',
    },
    recieverText: {
        color: "#000000",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 5,
    },
    footer: {
        alignItems: "center",
        flexDirection: "row",
        padding: 15,
        width: "100%",
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ececec",
        padding: 10,
        color: "gray",
        borderRadius: 30,
    }
})
