import React, { useState } from 'react'
import { StyleSheet, View, Image, Text, TextInput, Button, Pressable, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'



export default function DashboardScreen( {navigation} ){
    return(
        <SafeAreaView>

            <Text> Dashboard screen </Text>

      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#01172f",
    }
})