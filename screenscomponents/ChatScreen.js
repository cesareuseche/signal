import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
//Avatar placeholder & Icons
import { Avatar } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons'
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome from "react-native-vector-icons/FontAwesome"

const ChatScreen = ({ navigation, route }) => {

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
        <View>
            <Text>{route.params.chatName}</Text>
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({})
