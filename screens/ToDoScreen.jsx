import {View, Text, StyleSheet} from 'react-native'
import React from 'react'
import Footer from '../components/Footter'


export default function ToDo () {
    return (
        <>
        <View style={styles.container}>
            <Text> ToDo</Text>
        </View>
        <Footer />
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});