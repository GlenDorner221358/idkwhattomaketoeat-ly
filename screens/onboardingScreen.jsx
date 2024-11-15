import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Image, Text, Dimensions, Pressable } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen({ navigation, completeOnboarding }) {

    const [currentIndex, setCurrentIndex] = useState(0);

    const data = [
        {
          heading: 'Welcome to idkwhattomaketoeat-ly!',
          image: require('../assets/OnboardingWelcome.jpg'),
          text: 'A recipe generation app where you plug in the ingredients you have and get a custom recipe!',
        },
        {
          heading: 'Discover delicious recipes!',
          image: require('../assets/DeliciousRecipe.jpg'),
          text: 'Take a picture of your ingredients, or chat with the ai directly!',
        },
        {
          heading: 'Get Started',
          image: require('../assets/TakePictures.jpg'),
          text: 'Sign up to get started! Recipes and macros are saved to your account.',
        },
    ];


    const handleNext = () => {
        if (currentIndex < data.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.Title}> {data[currentIndex].heading} </Text>
            <View style={styles.Card}>    
                <Image source={data[currentIndex].image} style={styles.Image} />
                <Text style={styles.CardText}> {data[currentIndex].text} </Text>
            </View>
            <View style={styles.buttonContainer}>
                {currentIndex > 0 && 
                    <Pressable onPress={handlePrevious} style={styles.Button} >
                        <Text style={styles.ButtonText}> Previous </Text>
                    </Pressable>}
                {currentIndex < data.length - 1 && 
                    <Pressable onPress={handleNext} style={styles.Button} >
                        <Text style={styles.ButtonText}> Next </Text>
                    </Pressable>}
                {currentIndex === data.length - 1 && 
                    <Pressable onPress={completeOnboarding} style={styles.Button} >
                        <Text style={styles.ButtonText}> Go to Login </Text>
                    </Pressable>}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#363D45',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
      marginTop: 20,
    },
    Button:{
        width: '40%',
        height: height * 0.07,
        backgroundColor: '#e8f17f',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    ButtonText: {
        color: '#333',
        fontSize: width * 0.045,
        fontWeight: 'bold',
    },
    Image: {
      width: width * 0.85,
      height: height * 0.3,
      borderRadius: 15
    },
    Card: {
        backgroundColor: '#fff',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 25,
        padding: 15,
        gap: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        textAlign: "center"
    },
    Title: {
        fontSize: width * 0.075,
        fontWeight: 'bold',
        color: '#e8f17f',
        marginBottom: 20,
        textAlign: "center"
    },
    CardText: {
        color: '#363D45',
        fontSize: width * 0.043,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: "center"
    },
});