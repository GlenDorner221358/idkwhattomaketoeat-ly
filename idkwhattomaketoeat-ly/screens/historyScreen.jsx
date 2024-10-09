import React, { useState } from 'react'
import { StyleSheet, View, Image, Text, TextInput, Button, Pressable, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'



export default function HistoryScreen( {navigation} ){
    return(
        <SafeAreaView>

            <Text> History screen </Text>
            <View>
            <Pressable onPress={() => navigation.navigate('login')}>
                <Text style={{color: "#D1AC00", fontSize: 15}}> end onboarding </Text>
            </Pressable>
        </View>

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