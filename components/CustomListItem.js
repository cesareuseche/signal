import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

const CustomListItem = () => {
    return (
        <ListItem>
            <Avatar
                rounded
                source={{
                    uri:
                        "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",

                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "600" }}>
                    Signal Chat
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    This is a Subtitle
                </ListItem.Subtitle>
            </ListItem.Content>

        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})