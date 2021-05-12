import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from "react-native-elements"
import Icon from "react-native-vector-icons/Ionicons"
// Importing the db from firebase
import { db } from '../firebase';

const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState("");

    //Create chat async function
    const createChat = async () => {
        await db
            .collection('chats')
            .add({
                chatName: input,
            })
            .then(() => {
                navigation.goBack()
            })
            .catch((error) => alert(error));
    }

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
                onSubmitEditing={createChat}
                leftIcon={
                    <Icon name="chatbubbles-outline" type="antdesign" size={24} color="#000" />
                }
            />
            <Button onPress={createChat} title={'New Chat'} />

        </View>
    )
}

export default AddChatScreen;

const styles = StyleSheet.create({
    container: {

    }
})

