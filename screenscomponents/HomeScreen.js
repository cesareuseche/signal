import React, { useLayoutEffect } from 'react'
import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native'
import { Avatar } from 'react-native-elements'
import { auth } from '../firebase';


//importing components
import CustomListItem from '../components/CustomListItem'

const HomeScreen = ({ navigation }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "#000" },
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            )
        });
    }, []);

    return (
        <SafeAreaView>
            <ScrollView>
                <CustomListItem />
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
