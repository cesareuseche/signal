import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native'
//Avatar placeholder & Icons
import { Avatar } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons'
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { StatusBar } from 'expo-status-bar';


const ChatScreen = ({ navigation, route }) => {

    const [input, setInput] = useState("");
    const sendMessage = () => {

    }

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
                    <Avatar rounded source={{
                        uri:
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
                        <FontAwesome name="video-camera" size={24} color="#ffffff" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="#ffffff" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <React.Fragment>
                    <ScrollView>
                        {/*Chat Here */}
                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput
                            value={input}
                            onChangeText={(text) => setInput(text)}
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
                </React.Fragment>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
