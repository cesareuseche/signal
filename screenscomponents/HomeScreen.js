import React from 'react'
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native'
//importing components
import CustomListItem from '../components/CustomListItem'


const HomeScreen = () => {
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
