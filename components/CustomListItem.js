import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { db } from '../firebase';

const CustomListItem = ({ id, chatName, enterChat }) => {
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = db
            .collection('chats')
            .doc(id)
            .collection("messages")
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) => {
                setChatMessages(snapshot.docs.map((doc) => doc.data()))
            })

        return unsubscribe;
    })

    return (
        <ListItem
            key={id}
            onPress={() => enterChat(id, chatName)}
            key={id}
            bottomDividder>
            <Avatar
                rounded
                source={{
                    uri: chatMessages?.[0]?.photoURL ||
                        "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",

                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "600" }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.messages}
                </ListItem.Subtitle>
            </ListItem.Content>

        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
