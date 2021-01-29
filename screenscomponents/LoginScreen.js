import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Botton, Input, Image } from "react-native-elements"
import { StatusBar } from 'expo-status-bar'
const LoginScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    return (
        <View>
            <StatusBar style="light" />
            <Image source={{
                uri:
                    "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
            }}
                style={{ width: 200, height: 200 }} />
            <View style={StyleSheet.InputContainer}>
                <Input placeholder="Email" autoFocus type="Email" value={email} onChangeText={(text) => setEmail(text)} />
                <Input placeholder="Password" secureTextEntry type="password" value={password} />
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    InputContainer: {

    },
})
