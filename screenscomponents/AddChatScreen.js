import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from "react-native-elements"
import Icon from "react-native-vector-icons/Ionicons"

const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add a new Chat',
            headerBacktitle: "Chats",
        })
    }, [])

    return (
        <View style={styles.container}>
            <Input
                placeholder="Enter a chat name"
                value={input}
                onChangeText={(text) => setInput(text)}
                leftIcon={
                    <Icon name="chatbubbles-outline" type="antdesign" size={24} color="#000" />
                }
            />
        </View>
    )
}

export default AddChatScreen;

const styles = StyleSheet.create({
    container: {

    }
})

